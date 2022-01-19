pragma solidity ^0.6.6;


import "https://github.com/aave/flashloan-box/blob/Remix/contracts/aave/FlashLoanReceiverBase.sol";
import "https://github.com/aave/flashloan-box/blob/Remix/contracts/aave/ILendingPoolAddressesProvider.sol";
import "https://github.com/aave/flashloan-box/blob/Remix/contracts/aave/ILendingPool.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/Math.sol";

// import "https://github.com/compound-finance/compound-protocol/blob/master/contracts/CErc20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "./UniswapV2factoryinterface.sol";
import "./uniswapV2routerinterface.sol";
import "./ICToken.sol";
import "./comptrollerinterface.sol";

// import "https://github.com/compound-finance/compound-protocol/blob/master/contracts/CTokenInterfaces.sol";
// import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol";
//import "https://github.com/compound-finance/compound-protocol/blob/master/contracts/ComptrollerInterface.sol";
// import "https://github.com/compound-finance/compound-protocol/blob/master/contracts/CErc20.sol";


//import "https://github.com/compound-finance/compound-protocol/blob/master/contracts/Comptroller.sol";


contract Flashloan is FlashLoanReceiverBase {
    
    
    using SafeMath for uint256;
    using Math for uint256;
    using SafeERC20 for ERC20;
    

    ERC20 loanToken;
    ICEther CETH;
  //  ERC20 collatToken;
    string  Scollat;
    string Sloan;
    address target;
    mapping(string => address) TtoC;
    mapping(string => address) TtoA;

    constructor(address _addressProvider) FlashLoanReceiverBase(_addressProvider) public {
        
        TtoA["DAI"] = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
        TtoA["SAI"] = 0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359;
        TtoA["BAT"] = 0x0D8775F648430679A709E98d2b0Cb6250d2887EF;
        TtoA["USDC"] = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; 
        TtoA["USDT"] = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
        TtoA["ETH"] = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
        TtoA["WBTC"] = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;
        
        
        TtoC["DAI"] = 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643; 
        TtoC["SAI"] = 0xF5DCe57282A584D2746FaF1593d3121Fcac444dC;
        TtoC["BAT"] = 0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E;
        TtoC["USDC"] = 0x39AA39c021dfbaE8faC545936693aC917d5E7563;
        TtoC["USDT"] = 0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9; 
        TtoC["ETH"] = 0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5;
        TtoC["WBTC"] = 0xC11b1268C1A384e55C48c2391d8d480264A3A7F4;
        
        CETH = ICEther(0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5);
       
    }
    
    fallback() external {}
    function invest() external payable {}
    
     
    function liquideAccount (address _target, string memory _Sloan, string memory _Scollat) public {
    
       
      target = _target; 
      Sloan = _Sloan; 
      Scollat = _Scollat;
     // OrFeedInterface orfeed= OrFeedInterface(0x8316B082621CFedAB95bf4a44a1d4B64a6ffc336);
      IUniswapV2Router02 router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
     
      address payable cryptopixelAddress = 0x20C117044E0Dd6a61291c0DbE458b3a1F9eB17cf;
      address payable myAddress = 0x69CEd1CB057808817023F125caF6Be555D6f34D4;
      address coreAddress = addressesProvider.getLendingPoolCore();
      uint debt_to_liquide;
      uint reserve;

      if ( keccak256(abi.encodePacked(Sloan)) != keccak256(abi.encodePacked("ETH")) )
        { // ERC20 loan
         loanToken = ERC20(TtoA[Sloan]);
         ICErc20 CloanToken = ICErc20(TtoC[Sloan]);
         ICErc20 CcollatToken;
         if ( keccak256(abi.encodePacked(Scollat)) != keccak256(abi.encodePacked("ETH")) ) 
         { // collat ERC20
          CcollatToken = ICErc20(TtoC[Scollat]);
          debt_to_liquide = CloanToken.borrowBalanceCurrent(target).div(2) - 100;
          reserve = loanToken.balanceOf(coreAddress);
          debt_to_liquide = debt_to_liquide.min(reserve);
          uint collatvalue = CcollatToken.balanceOfUnderlying(target);
         // collatvalue = orfeed.getExchangeRate(Scollat, Sloan, "DEFAULT", collatvalue);
          address[] memory path = new address[](2);
          path[0] = TtoA[Scollat];
          path[1] = TtoA[Sloan];
          uint[] memory price = new uint[](2);
          price = router.getAmountsOut(collatvalue, path);
          debt_to_liquide = debt_to_liquide.min(price[1]);
          
          flashloan(debt_to_liquide);
         }
         else { // collat ETH
          debt_to_liquide = CloanToken.borrowBalanceCurrent(target).div(2) - 100;
          reserve = loanToken.balanceOf(coreAddress);
          debt_to_liquide = debt_to_liquide.min(reserve);
          uint collatvalue = CETH.balanceOfUnderlying(target);
          address [] memory path = new address[](2);
          path[0] = router.WETH();
          path[1] = TtoA[Sloan];
          uint[] memory price = new uint[](2);
          price = router.getAmountsOut(collatvalue, path);
          debt_to_liquide = debt_to_liquide.min(price[1]);
          
          flashloan(debt_to_liquide);     
         }
         uint crpixelpart = loanToken.balanceOf(address(this)).mul(20).div(100);
         loanToken.safeTransfer(cryptopixelAddress, crpixelpart); 
         loanToken.safeTransfer(myAddress, loanToken.balanceOf(address(this)) ); 
        } 
        
      else  // ETH loan
        {
         debt_to_liquide = CETH.borrowBalanceCurrent(target).div(2) - 100; 
         reserve = coreAddress.balance;
         debt_to_liquide = debt_to_liquide.min(reserve);
         ICErc20 CcollatToken = ICErc20(TtoC[Scollat]);
         uint collatvalue = CcollatToken.balanceOfUnderlying(target);
         address [] memory path = new address[](2);
         path[0] = TtoA[Scollat];
         path[1] = router.WETH();
         uint[] memory price = new uint[](2);
         price = router.getAmountsOut(collatvalue, path);
         debt_to_liquide = debt_to_liquide.min(price[1]);
    
         flashloan(debt_to_liquide);
         
         
        
         cryptopixelAddress.transfer( (address(this).balance).mul(20).div(100) );
         myAddress.transfer(address(this).balance);
        }
      
    }


    /**
        This function is called after your contract has received the flash loaned amount
     */
    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    )
        external
        override
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");
        IUniswapV2Router02 router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D); // MAinnet
        
         if ( keccak256(abi.encodePacked(Sloan)) != keccak256(abi.encodePacked("ETH")) && ( keccak256(abi.encodePacked(Scollat)) != keccak256(abi.encodePacked("ETH"))) )  // ERC20 /ERC20
         // ERC20/ERC20
         {
          ERC20 collatToken = ERC20(TtoA[Scollat]);   
          ICErc20 CloanToken = ICErc20(TtoC[Sloan]);
          ICErc20 CcollatToken = ICErc20(TtoC[Scollat]);
        
          loanToken.safeApprove(address(CloanToken), _amount);
          require(CloanToken.liquidateBorrow(target, _amount, CcollatToken) == 0, 'liquidation failed');
        
          require(CcollatToken.redeem(CcollatToken.balanceOf(address(this))) == 0, "redeem failed");
         
         
          address [] memory path = new address[](2);
          path[0] = address(collatToken);
          path[1] = address(loanToken);
      
          collatToken.safeApprove(address(router), collatToken.balanceOf(address(this)));
          router.swapExactTokensForTokens(collatToken.balanceOf(address(this)), 10000, path, address(this), now + 120);
         }
         
         
         if ( keccak256(abi.encodePacked(Sloan)) == keccak256(abi.encodePacked("ETH")) ) 
         // loan = ETH
         {
          ERC20 collatToken = ERC20(TtoA[Scollat]);   
          ICErc20 CcollatToken = ICErc20(TtoC[Scollat]);
          CETH.liquidateBorrow{value: _amount}(target, CcollatToken );
        
          require(CcollatToken.redeem(CcollatToken.balanceOf(address(this))) == 0, "redeem failed");
         
          address [] memory path = new address[](2);
          path[0] = address(collatToken);
          path[1] = router.WETH();
    
          collatToken.safeApprove(address(router), collatToken.balanceOf(address(this)));
          router.swapExactTokensForETH(collatToken.balanceOf(address(this)), 10000, path, address(this), now + 120);     
         }
         
         if ( keccak256(abi.encodePacked(Scollat)) == keccak256(abi.encodePacked("ETH")) ) 
         //  ERC20/ETH
         {
          ICErc20 CloanToken = ICErc20(TtoC[Sloan]);
          loanToken.safeApprove(address(CloanToken), _amount);
          require(CloanToken.liquidateBorrow(target, _amount, CETH) == 0, 'liquidation failed');
          require(CETH.redeem(CETH.balanceOf(address(this))) == 0, "redeem failed");
         
          address [] memory path = new address[](2);
          path[0] = router.WETH();
          path[1] = address(loanToken);
      
          router.swapExactETHForTokens{value: address(this).balance}(10000, path, address(this), now + 120);  
         }
       
       
     uint totalDebt = _amount.add(_fee);
     transferFundsBackToPoolInternal(_reserve, totalDebt);
    }

  
    function flashloan(uint _amount) public  {
        
        bytes memory data = "";
     
      //  address asset = address(loanToken);  // For mainnet
        address asset = TtoA[Sloan];
        
        ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
        lendingPool.flashLoan(address(this), asset, _amount, data);
    }
}