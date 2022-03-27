//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CustomerToken.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Qoistip is Ownable {
    /// 99=>1%,  0,1%=>999  0,03% => 997

    uint256 fee;
    struct PriceOracle {
        address addressFeed;
        // flags inUSD/chaiLinkHaveOracle/ (Not use to packing strucn <32 Bits, in future check gas when these are read ?)
        // uint8 flags;
        bool inUSD;
        bool chaiLinkOracle;
    }

    mapping(address => PriceOracle) addressToPriceOracle;
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
    event NewCustomer(
        address customerAddress,
        address customerToken
    );

    constructor(uint256 _fee) {
        fee = _fee;
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

    function _getTokenPrice() private returns (uint256 price) {}

    function registerCustomer(
        string memory _tokenSymbol,
        string memory _tokenName,
        uint256 _maxSupply
    ) external {
        address _newToken = address(new CustomerToken(
            _tokenSymbol,
            _tokenName,
            _maxSupply
        ));
        _tokenCustomer[msg.sender] = _newToken;
        emit NewCustomer(msg.sender, _newToken);
    }

    function donateERC20(
        address _addressToDonate,
        address _tokenAddress,
        uint256 _tokenAmount
    ) external returns (bool success) {
        require(_addressToDonate != address(0), "Can not send to 0 address");
        // require(tokenPair[_tokenAddress] != address(0), "Not supported token");
        require(_tokenAmount != 0, "Donate tokens amount can not be 0");
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
        // uint256 tokenToMint =
        // CustomerToken(private _tokenCustomer[_addressToDonate]).mint(
        //     msg.sender,
        //     tokenToMint
        // );
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
