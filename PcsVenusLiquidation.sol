pragma solidity =0.6.12;


// import "./IThugswap.sol";
// import "./IPCswap.sol";
// import "./ThugswapflashloanImports.sol";
import "./IPCswap.sol";
import "./AddressStorage.sol"; 


import "./ICToken.sol";
import "./comptrollerinterface.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/Math.sol";
//  import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/SafeERC20.sol";



contract PcsFlashSwap is IPancakeCallee, AddressStorage {  // 0x94fD1C7B78c573A61836537d13Fc6da62CdB708b
    
    using SafeMath for uint256;
    using Math for uint256;
  //  using SafeERC20 for IERC20;

  //  address immutable factory;
  //  IThugswapFactory Factory;
    IWETH immutable WBNB;
  //  address BNB;
    address payable Myaddress;
    PancakeRouter PcsRouter;
    address Pcsfactory = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
    uint amountin;
    uint amountout;

    
    constructor() public {
   
    //    factory = 0x5C69bEe701ef814a2B6a....; 
     //   Factory = IThugswapFactory(0x5C69bEe70....);
        PcsRouter = PancakeRouter(0x10ED43C718714eb63d5aA57B78B54704E256024E); // V2
        WBNB = IWETH(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c);
      //  BNB = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
        Myaddress = 0x1628E66dF4752C670b430E6ac087Ab1B3D6b35b2;
       
        
    }

    receive() external payable {}
    
    function syphoner() external {
       require(msg.sender == Myaddress, "only me can call this");
       Myaddress.transfer(address(this).balance);
      // TransferHelper.safeTransferBNB(Myaddress, address(this).balance);
    } 
    
    
    
    function liquideAccount(address _target, address _loan, address _vloan, address _collat, address _vcollat) public {
       require(msg.sender == Myaddress, "only me can call this");
             //  pair = Factory.getPair(_loan, router.WETH()));
       ICErc20 vloanToken = ICErc20(_vloan);
       uint debt_to_liquide = vloanToken.borrowBalanceCurrent(_target).div(2) - 100;
       IPancakePair Pair_loan_bnb;
       if ( _loan != address(WBNB)) {
       Pair_loan_bnb = IPancakePair(PancakeLibrary.pairFor(Pcsfactory, _loan, PcsRouter.WETH()));
       } else {Pair_loan_bnb = IPancakePair(PancakeLibrary.pairFor(Pcsfactory, _collat, PcsRouter.WETH()));}
       
       uint amount0Out = _loan == Pair_loan_bnb.token0() ? debt_to_liquide : 0;
       uint amount1Out = _loan == Pair_loan_bnb.token1() ? debt_to_liquide : 0;
       bytes memory data = abi.encode(debt_to_liquide, _target, _loan, _vloan, _collat, _vcollat);
       Pair_loan_bnb.swap(amount0Out, amount1Out, address(this), data);  // flashloan de _token

    }
    
    
    // gets tokens/WETH via a V2 flash swap, swaps for the ETH/tokens on V1, repays V2, and keeps the rest!
    function pancakeCall(address sender, uint amount0, uint amount1, bytes calldata data) external override {
        
        (uint repayAmount, address target, address loan, address vloan, address collat, address vcollat) 
        = abi.decode(data,(uint,address, address, address, address, address));
        address[] memory path = new address[](2);
        uint amountToken;
        uint amountBNB;
        { // scope for token{0,1}, avoids stack too deep errors
        address token0 = IPancakePair(msg.sender).token0();  // msg.sender = pair(loan, wbnb)
        address token1 = IPancakePair(msg.sender).token1();
        
        
        require(msg.sender == PancakeLibrary.pairFor(Pcsfactory, token0, token1), "paire non reconnue"); // ensure that msg.sender is actually a V2 pair
        require(amount0 == 0 || amount1 == 0, "one amount = 0"); // this strategy is unidirectional
        require(amount0 > 0 || amount1 > 0, "one amount > 0");
        path[0] = amount0 == 0 ? token0 : token1;  // token à rembourser WBNB
        path[1] = amount0 == 0 ? token1 : token0;  // token emprunté _token
        amountToken = token0 == address(WBNB) ? amount1 : amount0;
        amountBNB = token0 == address(WBNB) ? amount0 : amount1;
        }
        
       IERC20 Loan = IERC20(loan); 
            // path[0] = address(Loan);  
            // path[1] = address(WBNB) == address(Loan) ? collat : address(WBNB);
            //  Token.approve(address(PcsRouter),TokenAmount);
            //  uint amountReceived = PcsRouter.swapExactTokensForETH(TokenAmount, 1000, path, address(this), now + 120 )[1];
      
       Loan.approve(vloan, repayAmount);
            // ICErc20 Vcollat = ICErc20(vcollat);
       if (loan == address(WBNB)) {
          ICEther Vloan = ICEther(vloan);
          Vloan.liquidateBorrow{value: repayAmount}(target, ICErc20(vcollat));
       }
       else {
          ICErc20 Vloan = ICErc20(vloan);
          require(Vloan.liquidateBorrow(target, repayAmount, ICErc20(vcollat)) == 0, 'liquidation failed');
       }       
   
       ICErc20(vcollat).approve(vcollat, ICErc20(vcollat).balanceOf(address(this)));
       require(ICErc20(vcollat).redeem(ICErc20(vcollat).balanceOf(address(this))) == 0, "redeem failed");
       
       path[0] = collat;
       path[1] = address(WBNB);
       IERC20(collat).approve(address(PcsRouter), IERC20(collat).balanceOf(address(this)));
       PcsRouter.swapExactTokensForETH(IERC20(collat).balanceOf(address(this)), 10000, path, address(this), now + 120);
       
       
       uint amountReceived = address(this).balance;
       path[0] = address(WBNB); path[1] = loan;
         //    uint amountRequired = PcsRouter.getAmountsIn(repayAmount, path)[0];
      uint amountRequired = loan == address(WBNB) ? repayAmount.mul(1000).div(997) : PcsRouter.getAmountsIn(repayAmount, path)[0];
       require(amountReceived > amountRequired, "flashswap non profitable"); // fail if we didn't get enough ETH back to repay our flash loan
       WBNB.deposit{value: amountRequired}();  // deposit eth and get Weth
       require(WBNB.transfer(msg.sender, amountRequired),"le transfer de wbnb à la paire a echoué"); // return WETH to V2 pair

                // (bool success,) = sender.call{value: amountReceived - amountRequired}(new bytes(0)); // keep the rest! (ETH)
              //  require(success, "loan revert bc not profitable");
               //  WETH.withdraw(WETH.balanceOf(address(this)));
           
       Myaddress.transfer(address(this).balance);
     //  TransferHelper.safeTransferBNB(Myaddress, address(this).balance);
    } 

    
}