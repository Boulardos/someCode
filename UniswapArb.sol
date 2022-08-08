pragma solidity =0.6.6;

import "./IUniswapV2Callee.sol";
import "./IUniswapV2Factory.sol";
import "./uniswapV2routerinterface.sol";
import './IUniswapV2Pair.sol';
import "./UniswapV2Library.sol";
// import "https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/interfaces/IUniswapV2Pair.sol";
// import '../interfaces/IERC20.sol';
import './IWETH.sol';
import "./IOneSplit.sol";  // address: 0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E
import "./AddressStorage.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/Math.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol";



contract uniswaparb  is IUniswapV2Callee, AddressStorage {
    
    using SafeMath for uint256;
    using Math for uint256;
    using SafeERC20 for IERC20;
    
    address factory;
    IUniswapV2Factory Factory;
    IWETH WETH;
    address eth;
    address payable Myaddress;
    IUniswapV2Router02 router;
    address OneSplitAddress;
    uint amountin;
    uint amountout;
    
    constructor() public {
   
        factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f; // KOVAN
        Factory = IUniswapV2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f);
        router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D); // KOVAN
        WETH = IWETH(router.WETH());
        eth = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
        Myaddress = 0xcbdbf7A101Bb22F5a26E0d7C7360210C6826b1Ac;
        OneSplitAddress = 0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E;
        
    }
    
    receive() external payable {}
    
    function buyToken(address token, uint amount) external {
        IUniswapV2Pair pair;
        pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, token, router.WETH()));
        bytes memory data = abi.encode(token, amount);
        uint amount0Out = token == pair.token0() ? amount : 0;
        uint amount1Out = token == pair.token1() ? amount : 0;
        pair.swap(amount0Out, amount1Out, address(this), data);
        
    } 
    
     function buyETH(address token, uint amount) external {
        IUniswapV2Pair pair;
        pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, token, router.WETH()));
        bytes memory data = abi.encode(token, amount);
        uint amount0Out = token == pair.token0() ? 0 : amount;
        uint amount1Out = token == pair.token1() ? 0 : amount;
        pair.swap(amount0Out, amount1Out, address(this), data);
        
    } 
    
     function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external override {
        (address tok, uint amount) = abi.decode(data,(address, uint));
        address[] memory path = new address[](2);
        uint amountToken;
        uint amountETH;
        bool isEth;
        { // scope for token{0,1}, avoids stack too deep errors
        address token0 = IUniswapV2Pair(msg.sender).token0();  // msg.sender = pair(loan, weth)
        address token1 = IUniswapV2Pair(msg.sender).token1();
       // if (address(WETH) != loan && address(WETH) != collat) {isEth = false;} else { isEth = true;}
        require(msg.sender == UniswapV2Library.pairFor(factory, token0, token1), "paire non reconnue"); // ensure that msg.sender is actually a V2 pair
        require(amount0 == 0 || amount1 == 0, "both amounts > 0"); // this strategy is unidirectional
        require(amount0 > 0 || amount1 > 0, "no amount > 0");
        path[0] = amount0 == 0 ? token0 : token1;
        path[1] = amount0 == 0 ? token1 : token0;
        amountToken = token0 == address(WETH) ? amount1 : amount0;
        amountETH = token0 == address(WETH) ? amount0 : amount1;
        }

       // assert(path[0] == address(WETH) || path[1] == address(WETH)); // this strategy only works with a V2 WETH pair
        address token = path[0] == address(WETH) ? path[1] : path[0]; 
       // IERC20 Token = IERC20(path[0] == address(WETH) ? path[1] : path[0]);
        IERC20 Token = IERC20(token);
        uint[] memory distribution = new uint[](2);
      
        
        if (amountToken > 0) { // ERC20/ETH flashswap ERC20
         
            Token.safeApprove(address(router), amountToken);
            ( , distribution) = IOneSplit(OneSplitAddress).getExpectedReturn(Token, IERC20(eth), amountToken, 12, 12);
            uint amountReceived = IOneSplit(OneSplitAddress).swap(Token, IERC20(eth), amountToken, 10000, distribution, 0);
            uint amountRequired = router.getAmountsIn(amountToken, path)[0];
            require(amountReceived > amountRequired, "flashswap non profitable"); // fail if we didn't get enough ETH back to repay our flash loan
            WETH.deposit{value: amountRequired}();  // deposit eth and get Weth
            assert(WETH.transfer(msg.sender, amountRequired)); // return WETH to V2 pair
           // (bool success,) = 
            //sender.call{value: amountReceived - amountRequired}(new bytes(0)); // keep the rest! (ETH)
             //  require(success, "loan revert bc not profitable");
            Myaddress.transfer(address(this).balance);
        } 
        if (amountETH > 0 ) { // amountETH > 0  ETH/ERC20 flashswap weth 
            WETH.withdraw(amountETH); // recupere des eth contre weth
            ( , distribution) = IOneSplit(OneSplitAddress).getExpectedReturn(IERC20(eth), Token, amountETH, 12, 12);
            uint amountReceived = IOneSplit(OneSplitAddress).swap(IERC20(eth), Token, amountETH, 10000, distribution, 0);
           // uint amountRequired = UniswapV2Library.getAmountsIn(factory, amountETH, path)[0];
            uint amountRequired = router.getAmountsIn(amountETH, path)[0];
          //  emit tracker (amountReceived, amountRequired);
            require(amountReceived > amountRequired, " amountReceived must be superieor to amountRequired"); // fail if we didn't get enough tokens back to repay our flash loan
            require(Token.transfer(msg.sender, amountRequired), " transfer funds back to pair failed"); // return tokens to V2 pair
       // inutile ds ce cas     assert(Token.transfer(sender, amountReceived - amountRequired)); // keep the rest! (tokens)
            Token.transfer(Myaddress, Token.balanceOf(address(this)));
        }
        
        
    }
    
}