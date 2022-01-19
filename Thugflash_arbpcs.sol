pragma solidity =0.6.12;


// import "./IThugswap.sol";
// import "./IPCswap.sol";
import "./ThugswapflashloanImports.sol";
import "./AddressStorage.sol"; 

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/Math.sol";
//  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol";



contract ExampleFlashSwap is IThugswapCallee, AddressStorage {  // 0x94fD1C7B78c573A61836537d13Fc6da62CdB708b
    
    using SafeMathThugswap for uint256;
    using Math for uint256;
 //   using SafeERC20 for IERC20;

  //  address immutable factory;
  //  IThugswapFactory Factory;
    IWBNB immutable WBNB;
  //  address BNB;
    address payable Myaddress;
    ThugswapRouter ThugRouter;
    uint amountin;
    uint amountout;

    
    constructor() public {
   
    //    factory = 0x5C69bEe701ef814a2B6a....; 
     //   Factory = IThugswapFactory(0x5C69bEe70....);
        ThugRouter = ThugswapRouter(0x3bc677674df90A9e5D741f28f6CA303357D0E4Ec); 
        WBNB = IWBNB(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c);
      //  BNB = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
        Myaddress = 0xD0D5487D171590d9504ef149A7DF2A358774a628;
       
        
    }

    receive() external payable {}
    
    function syphoner(address token) external {
       require(msg.sender == Myaddress, "onlyowner can call this");
     //  Myaddress.transfer(address(this).balance);
       TransferHelper.safeTransferBNB(Myaddress, address(this).balance);
       IBEP20Thugswap Token = IBEP20Thugswap(token);
       Token.transfer(Myaddress, Token.balanceOf(address(this)));
       
    } 
    
    
    
    function ArbSwap(uint _amount, address _token, address _ThugPair, address _PcsPair) public {
     //  pair = Factory.getPair(_loan, router.WETH()));
     
       require(msg.sender == Myaddress, "onlyowner can call this");
       IThugswapPair ThugPair = IThugswapPair(_ThugPair);
       uint amount0Out = _token == ThugPair.token0() ? _amount : 0;
       uint amount1Out = _token == ThugPair.token1() ? _amount : 0;
       bytes memory data = abi.encode(_amount, _token);
       ThugPair.swap(amount0Out, amount1Out, address(this), data);  // flashloan de _token

    }
    
    
    // gets tokens/WETH via a V2 flash swap, swaps for the ETH/tokens on V1, repays V2, and keeps the rest!
    function ThugswapCall(address sender, uint amount0, uint amount1, bytes calldata data) external override {
        (uint TokenAmount, address token) = abi.decode(data,(uint, address));
        address[] memory path = new address[](2);
        uint amountToken;
        uint amountBNB;
        { // scope for token{0,1}, avoids stack too deep errors
        address token0 = IThugswapPair(msg.sender).token0();  // msg.sender = pair(loan, weth)
        address token1 = IThugswapPair(msg.sender).token1();
        
        
// require(msg.sender == ThugswapLibrary.pairFor(factory, token0, token1), "paire non reconnue"); // ensure that msg.sender is actually a V2 pair
        require(amount0 == 0 || amount1 == 0, "none amount = 0"); // this strategy is unidirectional
        require(amount0 > 0 || amount1 > 0, "none amount > 0");
        path[0] = amount0 == 0 ? token0 : token1;  // token à rembourser WBNB
        path[1] = amount0 == 0 ? token1 : token0;  // token emprunté _token
        amountToken = token0 == address(WBNB) ? amount1 : amount0;
        amountBNB = token0 == address(WBNB) ? amount0 : amount1;
        }
        
       IBEP20Thugswap Token = IBEP20Thugswap(path[0] == address(WBNB) ? path[1] : path[0]); 
       PancakeRouter PcsRouter = PancakeRouter(0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F);
       path[0] = address(Token);  
       path[1] = address(WBNB);
       Token.approve(address(PcsRouter),TokenAmount);
       uint amountReceived = PcsRouter.swapExactTokensForETH(TokenAmount, 1000, path, address(this), now + 120 )[1];
       path[0] = address(WBNB); path[1] = address(Token);
       uint amountRequired = ThugRouter.getAmountsIn(TokenAmount, path)[0];
     //  uint amountRequired = ThugRouter.getAmountsOut(TokenAmount, path)[1];
       require(amountReceived > amountRequired, "flashswap non profitable"); // fail if we didn't get enough ETH back to repay our flash loan
       WBNB.deposit{value: amountRequired}();  // deposit eth and get Weth
             //   require(WETH.balanceOf(address(this)),"pas assez de weth a renvoyer a pair");
       require(WBNB.transfer(msg.sender, amountRequired),"le transfer de wbnb à la paire a echoué"); // return WETH to V2 pair

           // (bool success,) = sender.call{value: amountReceived - amountRequired}(new bytes(0)); // keep the rest! (ETH)
          //  require(success, "loan revert bc not profitable");
          //  WETH.withdraw(WETH.balanceOf(address(this)));
           
       Myaddress.transfer(address(this).balance);
     //  TransferHelper.safeTransferBNB(Myaddress, address(this).balance);
    } 
}