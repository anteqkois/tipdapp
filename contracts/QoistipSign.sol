//SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity 0.8.13;

import "./CustomerToken.sol";
import "./AggregatorV3Interface.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// contract QoistipSign is Initializable, UUPSUpgradea/ble, OwnableUpgradeable {
contract QoistipSign is Initializable, UUPSUpgradeable {
    //Use mapping to handle many address to handle many donate in time
    //Use lock !
    //check if can update to v3
    uint256 private _minValue;
    // 0100=>1%  0010=>0,1%  0001=>0,01%  0300=>3%  0030=>0,3%
    uint256 private _donateFee;

    bool private _paused;
    address private _signerAdmin;
    address private _owner;

    mapping(address => uint256) private _balanceETH;
    mapping(address => mapping(address => uint256))
        private _addressToTokenToBalance;
    mapping(address => address) private _tokenCustomer;

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

    modifier onlyOwner() {
        require(_owner == msg.sender, "Only owner");
        _;
    }

    modifier notPaused() {
        require(!_paused, "Smart Contract paused");
        _;
    }

    function initialize(address adminSigner) external initializer {
        _owner = msg.sender;
        // __Ownable_init();
        _donateFee = 300;
        // 0.1$
        _minValue = 1e17;
        _signerAdmin = adminSigner;
    }

    // function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function paused() external view returns (bool) {
        return _paused;
    }

    function pause() external onlyOwner {
        _paused = true;
    }

    function unPause() external onlyOwner {
        _paused = false;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function changeOwner(address newOwner) external virtual onlyOwner {
        require(
            newOwner != address(0),
            "New owner is zero address"
        );
        _owner = newOwner;
    }

    function donateFee() external view returns (uint256) {
        return _donateFee;
    }

    function setFee(uint256 newFee) external virtual onlyOwner {
        // Fee must be below 15%
        require(newFee < 1500);
        _donateFee = newFee;
    }

    function setMinValue(uint256 newMinValue) external onlyOwner {
        _minValue = newMinValue;
    }

    function tokenCustomer(address customerAddress)
        external
        view
        returns (address)
    {
        return _tokenCustomer[customerAddress];
    }

    function balanceERC20(address customerAddress, address tokenAddress)
        external
        view
        returns (uint256 balance)
    {
        return _addressToTokenToBalance[customerAddress][tokenAddress];
    }

    function balanceETH(address customerAddress)
        external
        view
        returns (uint256 balance)
    {
        return _balanceETH[customerAddress];
    }

    function registerCustomer(
        string memory tokenSymbol,
        string memory tokenName
    ) external virtual notPaused{
        require(_tokenCustomer[msg.sender] == address(0), "Address registered");

        address _newToken = address(new CustomerToken(tokenSymbol, tokenName));
        _tokenCustomer[msg.sender] = _newToken;
        emit NewCustomer(msg.sender, _newToken);
    }

    //donateERC20_K3u(): 0x0000701f
    function donateERC20(
        bytes calldata signature,
        uint256 tokenAmount,
        uint256 mintTokenAmount,
        uint256 toCustomer,
        uint256 fee,
        uint256 timestampOffChain,
        address addressToDonate,
        address tokenAddress,
        address tokenCustomerAddress
    ) external virtual notPaused{
        // donate worth check on backend
        //connect msg with onChain data with tx

        // console.log('block.number ', block.number);
        require(
            timestampOffChain + 90 seconds > block.timestamp,
            "Signature time expired"
        );

        //Verify signature
        require(signature.length == 65, "Wrong signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // signature.offset = 0x144, location code hardset
            r := calldataload(0x144)
            s := calldataload(0x164)
            v := byte(0, calldataload(0x184))
        }

        require(
            ecrecover(
                keccak256(
                    abi.encodePacked(
                        "\x19Ethereum Signed Message:\n32",
                        keccak256(
                            abi.encodePacked(
                                tokenAmount,
                                mintTokenAmount,
                                toCustomer,
                                fee,
                                timestampOffChain,
                                tokenAddress,
                                tokenCustomerAddress
                            )
                        )
                    )
                ),
                v,
                r,
                s
            ) == _signerAdmin,
            "Wrong signature"
        );

        IERC20(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            tokenAmount
        );

        unchecked {
            _addressToTokenToBalance[addressToDonate][
                tokenAddress
            ] += toCustomer;
            _addressToTokenToBalance[address(this)][tokenAddress] += fee;
        }

        CustomerToken(tokenCustomerAddress).mint(msg.sender, mintTokenAmount);
    }

    //donateETH_Bej(): 0x00002206
    function donateETH(address addressToDonate) external payable virtual notPaused{
        (, int256 price, , , ) = ethUsdOracle.latestRoundData();
        //mul by 10**10 becouse price is return in 8 digit
        // Delete multiple ? Wheather this multiplation is necessary, maybe difference is to small ?
        uint256 tokenToMint = (uint(price) * 10**10 * msg.value) / 1e18;

        //set to hard number?
        require(tokenToMint >= _minValue, "Donate worth too little");

        uint256 fee = (msg.value * _donateFee) / 10000;
        _balanceETH[address(this)] += fee;
        _balanceETH[addressToDonate] += msg.value - fee;

        CustomerToken(_tokenCustomer[addressToDonate]).mint(
            msg.sender,
            tokenToMint
        );

        // send value ? can i get it from transation ?
        emit Donate(msg.sender, addressToDonate, address(0), msg.value);
    }

    function withdrawERC20(address tokenAddress) public virtual {
        uint256 _tokenBalance = _addressToTokenToBalance[msg.sender][
            tokenAddress
        ];
        require(_tokenBalance != 0, "You have 0 tokens on balance");
        delete _addressToTokenToBalance[msg.sender][tokenAddress];
        bool success = IERC20(tokenAddress).transfer(msg.sender, _tokenBalance);
        require(success, "Withdraw ERC20 not success");

        emit Withdraw(msg.sender, tokenAddress, _tokenBalance);
    }

    function withdrawManyERC20(address[] calldata tokenAddress) external {
        uint256 _iteration = tokenAddress.length;
        for (uint256 _i = 0; _i != _iteration; ) {
            withdrawERC20(tokenAddress[_i]);
            unchecked {
                _i++;
            }
        }
    }

    function withdrawETH() external payable virtual {
        uint256 _ethBalance = _balanceETH[msg.sender];
        require(_ethBalance != 0, "You have 0 ETH on balance");
        delete _balanceETH[msg.sender];
        // _balanceETH[msg.sender] = 0;
        (bool sent, ) = address(msg.sender).call{value: _ethBalance}("");
        require(sent, "Failed to withdraw Ether");
        emit Withdraw(msg.sender, address(0), _ethBalance);
    }

    function version() external pure virtual returns (uint8) {
        return 1;
    }
}
