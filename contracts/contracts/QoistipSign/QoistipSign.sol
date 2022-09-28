//SPDX-License-Identifier: MIT
// CHANGE LICENSE !
pragma solidity 0.8.13;

import "../UserToken/UserToken.sol";
import "./AggregatorV3Interface.sol";
// import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IERC20Minimal {
    // function totalSupply() external view returns (uint256);
    // function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);

    // function allowance(address owner, address spender) external view returns (uint256);
    // function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract QoistipSign is Initializable, UUPSUpgradeable {
    uint256 internal _minValue;
    // 0100=>1%  0010=>0,1%  0001=>0,01%  0300=>3%  0030=>0,3%
    uint256 internal _donateFee;

    bool internal _paused;
    //Use mapping to handle many address to handle many donate in time
    address internal _signerAdmin;
    address internal _owner;

    mapping(address => uint256) internal _balanceETH;
    mapping(address => mapping(address => uint256))
        internal _addressToTokenToBalance;
    mapping(address => address) internal _tokenUser;

    AggregatorV3Interface constant ethUsdOracle =
        AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);

    event Donate(
        address indexed donator,
        address indexed addressToDonate,
        address tokenAddress,
        uint256 tokenAmount
    );
    event Withdraw(
        address indexed user,
        address tokenAddress,
        uint256 tokenAmount
    );
    event NewUser(address indexed userAddress, address userToken);

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
        _donateFee = 300;
        // 0.1$
        _minValue = 1e17;
        _signerAdmin = adminSigner;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function paused() external view virtual returns (bool) {
        return _paused;
    }

    function pause() external virtual onlyOwner {
        _paused = true;
    }

    function unPause() external virtual onlyOwner {
        _paused = false;
    }

    function owner() external view virtual returns (address) {
        return _owner;
    }

    function changeOwner(address newOwner) external virtual onlyOwner {
        _owner = newOwner;
    }

    function changeSigner(address newSigner) external virtual onlyOwner {
        _signerAdmin = newSigner;
    }

    function donateFee() external view virtual returns (uint256) {
        return _donateFee;
    }

    function setFee(uint256 newFee) external virtual onlyOwner {
        // Fee must be below 15%
        require(newFee < 1500);
        _donateFee = newFee;
    }

    function setMinValue(uint256 newMinValue) external virtual onlyOwner {
        _minValue = newMinValue;
    }

    function tokenUser(address userAddress)
        external
        view
        virtual
        returns (address)
    {
        return _tokenUser[userAddress];
    }

    function balanceERC20(address userAddress, address tokenAddress)
        external
        view
        virtual
        returns (uint256 balance)
    {
        return _addressToTokenToBalance[userAddress][tokenAddress];
    }

    function balanceETH(address userAddress)
        external
        view
        virtual
        returns (uint256 balance)
    {
        return _balanceETH[userAddress];
    }

    /// @notice Register user and create your token - `tokenSymbol` - `tokenName`
    /// @dev Create user in global map and create their loyal token
    /// @param tokenSymbol The symbol of user token
    /// @param tokenName The name of user token
    function registerUser(string memory tokenSymbol, string memory tokenName)
        external
        virtual
        notPaused
    {
        require(_tokenUser[msg.sender] == address(0), "Address registered");

        address _newToken = address(new UserToken(tokenSymbol, tokenName));
        _tokenUser[msg.sender] = _newToken;
        emit NewUser(msg.sender, _newToken);
    }

    //donateERC20_K3u(): 0x0000701f
    function donateERC20(
        bytes calldata signature,
        uint256 tokenAmount,
        uint256 mintTokenAmount,
        uint256 toUser,
        uint256 fee,
        uint256 timestampOffChain,
        address addressToDonate,
        address tokenAddress,
        address tokenUserAddress
    ) external virtual notPaused {
        // donate worth check on backend
        //connect msg with onChain data with tx

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
                                toUser,
                                fee,
                                timestampOffChain,
                                tokenAddress,
                                tokenUserAddress
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

        IERC20Minimal(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            tokenAmount
        );

        unchecked {
            _addressToTokenToBalance[addressToDonate][tokenAddress] += toUser;
            _addressToTokenToBalance[address(this)][tokenAddress] += fee;
        }

        UserToken(tokenUserAddress).mint(msg.sender, mintTokenAmount);
    }

    //donateETH_Bej(): 0x00002206
    function donateETH(address addressToDonate)
        external
        payable
        virtual
        notPaused
    {
        (, int256 price, , , ) = ethUsdOracle.latestRoundData();
        uint256 tokenToMint = (uint(price) * msg.value) / 1e8;

        //set to hard number?
        require(tokenToMint >= _minValue, "Donate worth too little");

        uint256 fee = (msg.value * _donateFee) / 10000;

        unchecked {
            _balanceETH[address(this)] += fee;
            _balanceETH[addressToDonate] += msg.value - fee;
        }

        UserToken(_tokenUser[addressToDonate]).mint(msg.sender, tokenToMint);

        emit Donate(msg.sender, addressToDonate, address(0), msg.value);
    }

    function withdrawERC20(address tokenAddress) public virtual {
        uint256 _tokenBalance = _addressToTokenToBalance[msg.sender][
            tokenAddress
        ];
        require(_tokenBalance != 0, "You have 0 tokens on balance");
        delete _addressToTokenToBalance[msg.sender][tokenAddress];
        bool success = IERC20Minimal(tokenAddress).transfer(
            msg.sender,
            _tokenBalance
        );
        require(success, "Withdraw ERC20 not success");

        emit Withdraw(msg.sender, tokenAddress, _tokenBalance);
    }

    function withdrawManyERC20(address[] calldata tokenAddress)
        external
        virtual
    {
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
        (bool sent, ) = address(msg.sender).call{value: _ethBalance}("");
        require(sent, "Failed to withdraw Ether");
        emit Withdraw(msg.sender, address(0), _ethBalance);
    }

    function withdrawERC20Admin(address tokenAddress) public virtual onlyOwner {
        uint256 _tokenBalance = _addressToTokenToBalance[address(this)][
            tokenAddress
        ];
        delete _addressToTokenToBalance[address(this)][tokenAddress];
        bool success = IERC20Minimal(tokenAddress).transfer(
            msg.sender,
            _tokenBalance
        );
        require(success, "Withdraw ERC20 not success");
    }

    function withdrawManyERC20Admin(address[] calldata tokenAddress)
        external
        virtual
        onlyOwner
    {
        uint256 _iteration = tokenAddress.length;
        for (uint256 _i = 0; _i != _iteration; ) {
            withdrawERC20Admin(tokenAddress[_i]);
            unchecked {
                _i++;
            }
        }
    }

    function withdrawETHAdmin() external payable virtual onlyOwner {
        uint256 _ethBalance = _balanceETH[address(this)];
        delete _balanceETH[address(this)];
        (bool sent, ) = address(msg.sender).call{value: _ethBalance}("");
        require(sent, "Failed to withdraw Ether");
    }
}
