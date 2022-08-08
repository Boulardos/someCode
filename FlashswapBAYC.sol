// NFTX sc 0x0fc584529a2AEfA997697FAfAcbA5831faC0c22d   buyandRedeem()
// sushiswap router mainnet sc 0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F
// kovan DAI 0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD

// mainnet
// const factoryV1 = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95'
// // testnets
// const ropsten = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'
// const rinkeby = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36'
// const kovan = '0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30'
// const görli = '0x6Ce570d02D73d4c384b46135E87f8C592A8c86dA'


pragma solidity =0.6.6;

// import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol';

import './UniswapV2Library.sol';
// import '../interfaces/V1/IUniswapV1Factory.sol';
// import '../interfaces/V1/IUniswapV1Exchange.sol';
import './IUniswapV2Routers.sol';
// import '../interfaces/IERC20.sol';
// import '../interfaces/IWETH.sol';

pragma solidity >=0.5.0;

interface IUniswapV2Callee {
    function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}

pragma solidity >=0.5.0;

interface IUniswapV1Factory {
    function getExchange(address) external view returns (address);
}

pragma solidity >=0.5.0;

interface IUniswapV1Exchange {
    function balanceOf(address owner) external view returns (uint);
    function transferFrom(address from, address to, uint value) external returns (bool);
    function removeLiquidity(uint, uint, uint, uint) external returns (uint, uint);
    function tokenToEthSwapInput(uint, uint, uint) external returns (uint);
    function ethToTokenSwapInput(uint, uint) external payable returns (uint);
}

pragma solidity >=0.5.0;

interface IERC20 {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
}


pragma solidity >=0.5.0;

interface IWETH {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
}



contract ExampleFlashSwap is IUniswapV2Callee {
    using SafeMath for uint256;

    IUniswapV1Factory immutable factoryV1;
    address immutable factory;
    IUniswapV2Router02 immutable router;
    address eth;
    IWETH WETH;

    constructor() public {
        factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f; // KOVAN
        factoryV1 = IUniswapV1Factory(0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30);
        router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D); // KOVAN
        // WETH = IWETH(router.WETH());
        eth = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    }

    // needs to accept ETH from any V1 exchange and WETH. ideally this could be enforced, as in the router,
    // but it's not possible because it requires a call to the v1 factory, which takes too much gas
    receive() external payable {}

    function syphoner(address token) external {
       // require(msg.sender == Myaddress, "onlyowner can call this");
       msg.sender.transfer(address(this).balance);
      // TransferHelper.safeTransferBNB(Myaddress, address(this).balance);
      IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    } 

    function flashloanToken(address token, uint _amountFiney) external payable {
        uint amount = _amountFiney.mul(1e15);
        WETH = IWETH(router.WETH());
        IUniswapV2Pair pair;
        pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, token, router.WETH()));
        bytes memory data = abi.encode(token, amount);
        uint amount0Out = token == pair.token0() ? amount : 0;
        uint amount1Out = token == pair.token1() ? amount : 0;
        pair.swap(amount0Out, amount1Out, address(this), data);
        
    } 

    function flashloanWETH(address token, uint _amountFiney) external payable {
        uint amount = _amountFiney.mul(1e15);
        WETH = IWETH(router.WETH());
        IUniswapV2Pair pair;
        pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, token, router.WETH()));
        bytes memory data = abi.encode(100);
        uint amount0Out = router.WETH() == pair.token0() ? amount : 0;
        uint amount1Out = router.WETH() == pair.token1() ? amount : 0;
        pair.swap(amount0Out, amount1Out, address(this), data);
        
    } 

    // gets tokens/WETH via a V2 flash swap, swaps for the ETH/tokens on V1, repays V2, and keeps the rest!
    function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external override {
        address[] memory path = new address[](2);
        uint amountToken;
        uint amountETH;
        { // scope for token{0,1}, avoids stack too deep errors
        address token0 = IUniswapV2Pair(msg.sender).token0();
        address token1 = IUniswapV2Pair(msg.sender).token1();
        require(msg.sender == UniswapV2Library.pairFor(factory, token0, token1),"call by pair"); // ensure that msg.sender is actually a V2 pair
        require(amount0 == 0 || amount1 == 0,"1 amount >0"); // this strategy is unidirectional
        path[0] = amount0 == 0 ? token0 : token1;
        path[1] = amount0 == 0 ? token1 : token0;
        amountToken = token0 == address(WETH) ? amount1 : amount0;
        amountETH = token0 == address(WETH) ? amount0 : amount1;
        }

        assert(path[0] == address(WETH) || path[1] == address(WETH)); // this strategy only works with a V2 WETH pair
        IERC20 token = IERC20(path[0] == address(WETH) ? path[1] : path[0]);
        IUniswapV1Exchange exchangeV1 = IUniswapV1Exchange(factoryV1.getExchange(address(token))); // get V1 exchange

        if (amountToken > 0) {
            (uint minETH) = abi.decode(data, (uint)); // slippage parameter for V1, passed in by caller
            // multi token
            // token.approve(address(exchangeV1), amountToken);
            // uint amountReceived = exchangeV1.tokenToEthSwapInput(amountToken, minETH, uint(-1));
            //   //  uint amountReceived = address(this).balance; // triche en envoyant des eth au sc
            // uint amountRequired = UniswapV2Library.getAmountsIn(factory, amountToken, path)[0];
            // require(amountReceived > amountRequired,"amount token received insufisant"); // fail if we didn't get enough ETH back to repay our flash loan
            // WETH.deposit{value: amountRequired}();
            // require(WETH.transfer(msg.sender, amountRequired),"WETH payback failed"); // return WETH to V2 pair
           
            // (bool success,) = sender.call{value: amountReceived - amountRequired}(new bytes(0)); // keep the rest! (ETH)
            // require(success,"flashoan failed");

            // single token
            // uint amountRequired = amountToken + amountToken.mul(3).div(1000).div(997).mul(1000);
            uint amountRequired = amountToken.mul(1000).div(997) + 10;
            uint amountReceived = amountToken.add(token.balanceOf(address(this)));
            require(amountReceived > amountRequired,"amount token received insufisant");
            require(token.transfer(msg.sender, amountRequired),"le remboursement single token failed");
            

        } else { // emprunt weth
            (uint minTokens) = abi.decode(data, (uint)); // slippage parameter for V1, passed in by caller
            WETH.withdraw(amountETH);
            uint amountReceived = exchangeV1.ethToTokenSwapInput{value: amountETH}(minTokens, uint(-1));
            uint amountRequired = UniswapV2Library.getAmountsIn(factory, amountETH, path)[0];
            require(amountReceived > amountRequired,"amount weth received insufisant"); // fail if we didn't get enough tokens back to repay our flash loan
            require(token.transfer(msg.sender, amountRequired),"token transfer faled"); // return tokens to V2 pair
            require(token.transfer(sender, amountReceived - amountRequired),"token transfer to sc caller failed"); // keep the rest! (tokens)
        }
    }
}