pragma solidity =0.6.12;

import "./IPCswap.sol";
import "./AddressStorage.sol"; 


contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

 
  constructor() public {
    owner = msg.sender;
  }


  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address newOwner) onlyOwner public {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}



contract arbPcsV2 is AddressStorage, Ownable { 
    
    using SafeMath for uint256;
    using Math for uint256;
 //   using SafeERC20 for IERC20;

  //  address immutable factory;
  //  IThugswapFactory Factory;
    IWETH immutable WBNB;
    address busd =  0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    // uint amountout;

    
    constructor() public {
   
       WBNB = IWETH(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c); 
             //   WBNB = IWETH(0xd0A1E359811322d97991E03f863a0C30C2cF029C); // kovan WETH
        
      //  BNB = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    }

    receive() external payable {}
    
    function syphoner() external onlyOwner {
     //  TransferHelper.safeTransferBNB(Myaddress, address(this).balance);
     // IERC20 Token = IERC20(token);
     //  Token.transfer(owner, Token.balanceOf(address(this)));
       IERC20 BUSD = IERC20(busd);
       BUSD.transfer(owner, BUSD.balanceOf(address(this)));
       address payable me = 0xD0D5487D171590d9504ef149A7DF2A358774a628; // DITTO
       me.transfer(address(this).balance);
       
    } 
    


   function busd_bnb_token(uint _amountin, address _token) internal {
      //uint amountin = _amountin.mul(1e15);
              // busd = 0xe22da380ee6B445bb8273C81944ADEB6E8450422; // kovan 
      address[] memory path = new address[](2);
      path[0] = busd; path[1] = address(WBNB);
      PancakeRouter PcsRouter = PancakeRouter(0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F);
                // PancakeRouter PcsRouter = PancakeRouter(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
      IERC20 BUSD = IERC20(busd);
      BUSD.approve(address(PcsRouter), _amountin);
      uint amountout = PcsRouter.swapExactTokensForETH(_amountin, 100, path, address(this), now + 120 )[1];
      
      path[0] = address(WBNB); path[1] = _token;
      amountout = PcsRouter.swapExactETHForTokens{value: amountout}(100, path, address(this), now + 120 )[1];
      
      path[0] = _token; path[1] = busd;
      IERC20 Token = IERC20(_token);
      Token.approve(address(PcsRouter), amountout);
      PcsRouter.swapExactTokensForTokens(amountout, 1000, path, address(this), now + 120 )[1]; 
   }
   
   
   function busd_token(uint _amountin, address _token) internal {
      // uint amountin = _amountin.mul(1e15);
              // busd = 0xe22da380ee6B445bb8273C81944ADEB6E8450422; // kovan 
      address[] memory path = new address[](2);
      path[0] = busd; path[1] = _token;
      IERC20 BUSD = IERC20(busd);
      PancakeRouter PcsRouter = PancakeRouter(0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F); 
               //PancakeRouter PcsRouter = PancakeRouter(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
      BUSD.approve(address(PcsRouter), _amountin);
      uint amountout = PcsRouter.swapExactTokensForTokens(_amountin, 100, path, address(this), now + 120 )[1];
      
      path[0] = _token; path[1] = address(WBNB);
      IERC20 Token = IERC20(_token);
      Token.approve(address(PcsRouter), amountout);
      amountout = PcsRouter.swapExactTokensForETH(amountout, 100, path, address(this), now + 120 )[1];
      
      path[0] = address(WBNB); path[1] = busd;
      PcsRouter.swapExactETHForTokens{value: amountout}(100, path, address(this), now + 120 )[1];
       
   }
   
   function check_arb_opp(uint _amount, address _token, uint _pourcent) external onlyOwner {
       PancakeRouter PcsRouter = PancakeRouter(0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F);
       // IPancakeFactory Factory = IPancakeFactory(0xBCfCcbde45cE874adCB698cC183deBcF17952812);
       // address pair1 = Factory.getPair(address(WBNB), _token);
       // IPancakePair pairBnb = IPancakePair(pair1);
       // address pair2 = Factory.getPair(busd, _token);
       // IPancakePair pairBusd = IPancakePair(pair2);
       
       address[] memory path = new address[](2);
       path[0] = busd; path[1] = address(WBNB);
       uint amountout  = PcsRouter.getAmountsOut(_amount, path)[1];
       path[0] = address(WBNB); path[1] = _token;
       uint amountout1 = PcsRouter.getAmountsOut(amountout, path)[1];
       
       path[0] = busd; path[1] = _token;
       uint amountout2  = PcsRouter.getAmountsOut(_amount, path)[1];
       
       uint margin = amountout2.mul(_pourcent).div(100);
    
       if ( amountout1 >  amountout2.add(margin)) {
         busd_bnb_token(_amount, _token);
       }
       
       if ( amountout1 < amountout2.sub(margin)) {
         busd_token(_amount, _token);
       }
     
   }
   
}


