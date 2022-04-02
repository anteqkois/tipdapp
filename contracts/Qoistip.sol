//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CustomerToken.sol";
import "./AggregatorV3Interface.sol";
import "./QoistipPriceAggregator.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Qoistip is Ownable {
    /// 99=>1%,  0,1%=>999  0,03% => 997

    uint256 fee;
    QoistipPriceAggregator qoistipPriceAggregator;
    struct PriceOracle {
        address oracleAddress;
        // flags priceInUSD/chaiLinkHaveOracle/ (Not use to packing strucn <32 Bits, in future check gas when these are read ?)
        // uint8 flags;
        bool priceInUSD;
        bool isChailink;
    }

    mapping(address => PriceOracle) addressToPriceOracle;
    // ! add ability to token to change owner (from old DonateC to new, when migrate ?)
    mapping(address => address) private _tokenCustomer;
    mapping(address => mapping(address => uint256)) addressToTokenToBalance;
    mapping(address => uint256) BalanceETH;

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
    event NewCustomer(address customerAddress, address customerToken);

    constructor(uint256 _fee, QoistipPriceAggregator _qoistipPriceAggregator) {
        fee = _fee;
        qoistipPriceAggregator = _qoistipPriceAggregator;
    }

    function setFee(uint256 _fee) external onlyOwner {
        //add some limit, for exampple new fee must < +10%, or fee <20% ?
        require(_fee < 10000);
        fee = _fee;
    }

    function tokenCustomer(address _customerAddress)
        external
        view
        returns (address)
    {
        return _tokenCustomer[_customerAddress];
    }

    function calculateWithFee(uint256 _amount) internal view returns (uint256) {
        return (_amount * fee) / 10000;
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

    function setPriceOracle(
        address _tokenAddress,
        address _oracleAddress,
        bool _inUSD,
        bool _chailinkOracle
    ) external onlyOwner {
        // check cost of checking data and write, and only write
        addressToPriceOracle[_tokenAddress] = PriceOracle(
            _oracleAddress,
            _inUSD,
            _chailinkOracle
        );
    }

    function priceOracle(address _tokenAddress)
        external
        view
        returns (PriceOracle memory)
    {
        return addressToPriceOracle[_tokenAddress];
    }

    AggregatorV3Interface constant ethOracle =
        AggregatorV3Interface(0x986b5E1e1755e3C2440e960477f25201B0a8bbD4);

    function _getPrice(address _tokenAddress) private view returns (uint256) {
        PriceOracle memory oracle = addressToPriceOracle[_tokenAddress];
        require(oracle.oracleAddress != address(0), "Not supported token");
        int256 price;
        if (oracle.isChailink) {
            if (oracle.priceInUSD) {
                (, price, , , ) = AggregatorV3Interface(oracle.oracleAddress)
                    .latestRoundData();
                return uint256(price * 10**10);
            } else {
                (, price, , , ) = AggregatorV3Interface(oracle.oracleAddress)
                    .latestRoundData();
                (, int256 priceEth, , , ) = ethOracle.latestRoundData();
                return uint256((price * 10**18) / priceEth);
                // return uint256(price);
            }
        } else {
            price = qoistipPriceAggregator.latestRoundData(_tokenAddress);
            return uint256(price);
        }

        // return uint256(price);
    }

    function registerCustomer(
        string memory _tokenSymbol,
        string memory _tokenName
    ) external {
        address _newToken = address(
            new CustomerToken(_tokenSymbol, _tokenName)
        );
        _tokenCustomer[msg.sender] = _newToken;
        emit NewCustomer(msg.sender, _newToken);
    }

    function donateERC20(
        address _addressToDonate,
        address _tokenAddress,
        uint256 _tokenAmount
    ) external returns (bool success) {
        require(_addressToDonate != address(0), "Can not donate address 0");
        require(_tokenAmount != 0, "Amount of tokens donated can not be 0");
        uint256 _tokenToMint = (_getPrice(_tokenAddress) * _tokenAmount) / 1e18;
        console.log("Amount token to mint: %s", _tokenToMint);

        IERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokenAmount
        );

        uint256 _withFee = calculateWithFee(_tokenAmount);
        addressToTokenToBalance[_addressToDonate][_tokenAddress] = _withFee;
        addressToTokenToBalance[address(this)][_tokenAddress] =
            _tokenAmount -
            _withFee;
        CustomerToken(_tokenCustomer[_addressToDonate]).mint(
            msg.sender,
            _tokenToMint
        );
        emit Donate(msg.sender, _addressToDonate, _tokenAddress, _tokenAmount);
        return true;
    }

    function donateETH(address _addressToDonate)
        external
        payable
        returns (bool success)
    {
        uint256 _value = msg.value;
        require(_addressToDonate != address(0), "Can not send to 0 address");
        require(_value != 0, "Donate tokens amount can not be 0");

        uint256 _withFee = calculateWithFee(_value);
        BalanceETH[_addressToDonate] = _withFee;
        BalanceETH[address(this)] = _value - _withFee;
        emit Donate(msg.sender, _addressToDonate, address(0), _value);
        return true;
    }

    // function withdrawERC20(address _tokenAddress) public {
    //     uint256 _tokenBalance = addressToTokenToBalance[msg.sender][
    //         _tokenAddress
    //     ];
    //     require(_tokenBalance > 0, "You have 0 tokens on balance");
    //     addressToTokenToBalance[msg.sender][_tokenAddress] = 0;
    //     IERC20(_tokenAddress).transfer(msg.sender, _tokenBalance);
    //     emit Withdraw(msg.sender, _tokenAddress, _tokenBalance);
    // }

    // function withdrawManyERC20(address[] memory _tokenAddress) external {
    //     uint256 _iteration = _tokenAddress.length;
    //     for (uint256 _i = 0; _i < _iteration; _i++) {
    //         withdrawERC20(_tokenAddress[_i]);
    //     }
    // }

    // function withdrawETH() public {
    //     uint256 _ethBalance = BalanceETH[msg.sender];
    //     require(_ethBalance > 0, "You have 0 ETH");
    //     BalanceETH[msg.sender] = 0;
    //     (bool sent, ) = address(msg.sender).call{value: _ethBalance}("");
    //     require(sent, "Failed to send Ether");
    //     emit Withdraw(msg.sender, address(0), _ethBalance);
    // }
}
