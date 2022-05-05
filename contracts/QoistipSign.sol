//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CustomerToken.sol";
import "./AggregatorV3Interface.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract QoistipSign is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    //Use mapping to handle many address to handle many donate in time
    address private adminSigner;
    uint256 private _minValue;

    mapping(address => address) private _tokenCustomer;
    mapping(address => mapping(address => uint256)) addressToTokenToBalance;
    mapping(address => uint256) BalanceETH;

    // 99=>1%,  0,1%=>999  0,03% => 997
    uint256 private _fee;
    // 0.1$
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

    function initialize(address _adminSigner) external initializer {
        __Ownable_init();
        _fee = 9700;
        _minValue = 1e17;
        adminSigner = _adminSigner;
    }

    // function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function fee() external view returns (uint256) {
        return _fee;
    }

    function setFee(uint256 _newFee) external virtual onlyOwner {
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

    function verifySignature(
        uint256 _donatedTokenAmount,
        uint256 _mintTokenAmount,
        uint256 _withFee,
        uint256 _feeToAdmin,
        uint256 _timestampOffChain,
        address _tokenAddress,
        address _tokenCustomerAddress,
        bytes memory signature
    ) private view {
        bytes32 hashData = keccak256(
            abi.encodePacked(
                _donatedTokenAmount,
                _mintTokenAmount,
                _withFee,
                _feeToAdmin,
                _timestampOffChain,
                _tokenAddress,
                _tokenCustomerAddress
            )
        );

        bytes32 hashDataPrefix = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hashData)
        );


        require(signature.length == 65, "Wrong signature");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }

        address signer = ecrecover(hashDataPrefix, v, r, s);
        require(signer == adminSigner, "Wrong signature");

        // return (signer == adminSigner);
    }

    //donateERC20_K3u(): 0x0000701f
    function donateERC20(
        uint256 _donatedTokenAmount,
        uint256 _mintTokenAmount,
        uint256 _withFee,
        uint256 _feeToAdmin,
        uint256 _timestampOffChain,
        address _addressToDonate,
        address _tokenAddress,
        address _tokenCustomerAddress,
        bytes memory signature
    ) external virtual {
        // donate worth check on backend
        // console.log('_timestampOffChain ', _timestampOffChain);
        // console.log('block.timestamp ', block.timestamp);
        // console.log('block.number ', block.number);

        // require(
        //     _timestampOffChain + 1 minutes > block.timestamp,
        //     "Wrong signature"
        // );
        // console.log('test');

        //Verify signature
        verifySignature(
            _donatedTokenAmount,
            _mintTokenAmount,
            _withFee,
            _feeToAdmin,
            _timestampOffChain,
            _tokenAddress,
            _tokenCustomerAddress,
            signature
        );

        IERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _donatedTokenAmount
        );

        addressToTokenToBalance[_addressToDonate][_tokenAddress] += _withFee;
        addressToTokenToBalance[address(this)][_tokenAddress] += _feeToAdmin;
        CustomerToken(_tokenCustomerAddress).mint(msg.sender, _mintTokenAmount);
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
        BalanceETH[_addressToDonate] += _withFee;
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
