//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CustomerToken.sol";
import "./AggregatorV3Interface.sol";
import "./QoistipPriceAggregator.sol";
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Qoistip is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    mapping(address => bytes32) oracleData;
    mapping(address => address) private _tokenCustomer;
    mapping(address => mapping(address => uint256)) addressToTokenToBalance;
    mapping(address => uint256) BalanceETH;

    // 99=>1%,  0,1%=>999  0,03% => 997
    uint256 private _fee;
    // 0.1$
    uint256 private _minValue;
    AggregatorV3Interface constant usdcEthOracle =
        AggregatorV3Interface(0x986b5E1e1755e3C2440e960477f25201B0a8bbD4);

    AggregatorV3Interface constant ethUsdOracle =
        AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);

    event Donate(
        address indexed donator,
        address indexed addressToDonate,
        address tokenAddress,
        uint256 tokenAmount
    );
    event Withdraw(
        address indexed customer,
        address tokenAddress,
        uint256 tokenAmount
    );
    event NewCustomer(address indexed customerAddress, address customerToken);

    function initialize() external initializer {
        __Ownable_init();
        _fee = 9700;
        _minValue = 1e17;
    }

    // function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function fee() external view returns (uint256) {
        return _fee;
    }

    function setFee(uint256 _newFee) external virtual onlyOwner {
        //add some limit, for exampple new _fee must < +10%, or _fee <20% ?
        require(_newFee < 10000);
        _fee = _newFee;
    }

    function setMinValue(uint256 _newMinValue) external onlyOwner {
        _minValue = _newMinValue;
    }

    function tokenCustomer(address _customerAddress)
        external
        view
        returns (address)
    {
        return _tokenCustomer[_customerAddress];
    }

    function balanceOfERC20(address _customerAddress, address _tokenAddress)
        external
        view
        returns (uint256 balance)
    {
        return addressToTokenToBalance[_customerAddress][_tokenAddress];
    }

    function balanceOfETH(address _customerAddress)
        external
        view
        returns (uint256 balance)
    {
        return BalanceETH[_customerAddress];
    }

    function registerCustomer(
        string memory _tokenSymbol,
        string memory _tokenName
    ) external virtual {
        require(
            _tokenCustomer[msg.sender] == address(0),
            "This address has been already registered"
        );

        address _newToken = address(
            new CustomerToken(_tokenSymbol, _tokenName)
        );
        _tokenCustomer[msg.sender] = _newToken;
        emit NewCustomer(msg.sender, _newToken);
    }

    function setPriceOracle(address _tokenAddress, bytes32 _priceOracleData)
        external
        virtual
        onlyOwner
    {
        oracleData[_tokenAddress] = _priceOracleData;
    }

    function priceOracle(address _tokenAddress)
        external
        view
        virtual
        returns (bytes32 data)
    {
        data = oracleData[_tokenAddress];
    }

    function _getPrice(address _tokenAddress)
        internal
        view
        virtual
        returns (uint256)
    {
        bytes32 oracle = oracleData[_tokenAddress];
        // require(oracle != 0, "Not suported token");

        (, int256 price, , , ) = AggregatorV3Interface(address(bytes20(oracle)))
            .latestRoundData();
        // in USD
        if (oracle & (bytes32(uint256(1)) << 95) != 0 ? true : false) {
            return uint256(price * 10**10);
        } else {
            (, int256 priceEth, , , ) = usdcEthOracle.latestRoundData();
            return uint256((price * 10**18) / priceEth);
        }
    }

    //donateERC20_K3u(): 0x0000701f
    function donateERC20(
        address _addressToDonate,
        address _tokenAddress,
        uint256 _tokenAmount
    ) external virtual {
        address tokenCustomerAddress = _tokenCustomer[_addressToDonate];
        require(
            tokenCustomerAddress != address(0),
            "Address to donate was not registered"
        );
        uint256 _tokenToMint = (_getPrice(_tokenAddress) * _tokenAmount) / 1e18;
        require(_tokenToMint >= _minValue, "Donate worth < min value $");

        IERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokenAmount
        );

        // bool success = IERC20(_tokenAddress).transferFrom(
        //     msg.sender,
        //     address(this),
        //     _tokenAmount
        // );
        // require(success, "Transfer ERC20 not success");

        // No Reentrancy - fist get token, next set balance
        uint256 _withFee = (_tokenAmount * _fee) / 10000;
        addressToTokenToBalance[_addressToDonate][_tokenAddress] = _withFee;
        addressToTokenToBalance[address(this)][_tokenAddress] =
            _tokenAmount -
            _withFee;
        CustomerToken(tokenCustomerAddress).mint(msg.sender, _tokenToMint);

        // Emiting events is neccesary ?
        emit Donate(msg.sender, _addressToDonate, _tokenAddress, _tokenAmount);
    }

    //donateETH_Bej(): 0x00002206
    function donateETH(address _addressToDonate)
        external
        payable
        virtual
    // returns (bool success)
    {
        (, int256 price, , , ) = ethUsdOracle.latestRoundData();
        //mul by 10**10 becouse price is return in 8 digit
        // Delete multiple ? Wheather this multiplation is necessary ?
        uint256 _tokenToMint = (uint(price) * 10**10 * msg.value) / 1e18;
        require(_tokenToMint >= _minValue, "Donate worth < min value $");

        uint256 _withFee = (msg.value * _fee) / 10000;
        BalanceETH[_addressToDonate] = _withFee;
        BalanceETH[address(this)] = msg.value - _withFee;

        CustomerToken(_tokenCustomer[_addressToDonate]).mint(
            msg.sender,
            _tokenToMint
        );
        emit Donate(msg.sender, _addressToDonate, address(0), msg.value);
        // return true;
    }

    function withdrawERC20(address _tokenAddress) public virtual {
        uint256 _tokenBalance = addressToTokenToBalance[msg.sender][
            _tokenAddress
        ];
        require(_tokenBalance != 0, "You have 0 tokens on balance");
        delete addressToTokenToBalance[msg.sender][_tokenAddress];
        bool success = IERC20(_tokenAddress).transfer(
            msg.sender,
            _tokenBalance
        );
        require(success, "Withdraw ERC20 not success");

        emit Withdraw(msg.sender, _tokenAddress, _tokenBalance);
    }

    function withdrawManyERC20(address[] calldata _tokenAddress) external {
        uint256 _iteration = _tokenAddress.length;
        for (uint256 _i = 0; _i != _iteration; ) {
            withdrawERC20(_tokenAddress[_i]);
            unchecked {
                _i++;
            }
        }
    }

    function withdrawETH() external payable virtual {
        uint256 _ethBalance = BalanceETH[msg.sender];
        require(_ethBalance != 0, "You have 0 ETH");
        delete BalanceETH[msg.sender];
        // BalanceETH[msg.sender] = 0;
        (bool sent, ) = address(msg.sender).call{value: _ethBalance}("");
        require(sent, "Failed to send Ether");
        emit Withdraw(msg.sender, address(0), _ethBalance);
    }

    function version() external pure virtual returns (uint8) {
        return 1;
    }
}
