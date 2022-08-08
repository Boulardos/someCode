/**
 *Submitted for verification at BscScan.com on 2021-04-04
*/

pragma solidity 0.6.11;

import "./Nft1155.sol";
import "./Nft721.sol";


// SPDX-License-Identifier: BSD-3-Clause

/**
 * @title SafeMath
 * @dev Math operations with safety checks that thsrow on error
 */
 
/*
library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

*/


/**
 * @dev Standard math utilities missing in the Solidity language.
 */
 
interface IRouter {
    
     function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external  returns (uint amountA, uint amountB);
    
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    
    function getAmountsOut(uint amountIn, address[] memory path)
        external
        view returns (uint[] memory amounts);
        
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    
    function addLiquidity(
       address tokenA,
       address tokenB,
       uint amountADesired,
       uint amountBDesired,
       uint amountAMin,
       uint amountBMin,
       address to,
       uint deadline
     ) external returns (uint amountA, uint amountB, uint liquidity);
    
} 
 
library Math {
  
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

   
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

   
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow, so we distribute
        return (a / 2) + (b / 2) + ((a % 2 + b % 2) / 2);
    }
}



/**
 * @dev Library for managing
 * https://en.wikipedia.org/wiki/Set_(abstract_data_type)[sets] of primitive
 * types.
 *
 * Sets have the following properties:
 *
 * - Elements are added, removed, and checked for existence in constant time
 * (O(1)).
 * - Elements are enumerated in O(n). No guarantees are made on the ordering.
 *
 * ```
 * contract Example {
 *     // Add the library methods
 *     using EnumerableSet for EnumerableSet.AddressSet;
 *
 *     // Declare a set state variable
 *     EnumerableSet.AddressSet private mySet;
 * }
 * ```
 *
 * As of v3.0.0, only sets of type `address` (`AddressSet`) and `uint256`
 * (`UintSet`) are supported.
 */



/* 
library EnumerableSet {
    // To implement this library for multiple types with as little code
    // repetition as possible, we write it in terms of a generic Set type with
    // bytes32 values.
    // The Set implementation uses private functions, and user-facing
    // implementations (such as AddressSet) are just wrappers around the
    // underlying Set.
    // This means that we can only create new EnumerableSets for types that fit
    // in bytes32.

    struct Set {
        // Storage of set values
        bytes32[] _values;

        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the set.
        mapping (bytes32 => uint256) _indexes;
    }

   
    function _add(Set storage set, bytes32 value) private returns (bool) {
        if (!_contains(set, value)) {
            set._values.push(value);
            // The value is stored at length-1, but we add 1 to all indexes
            // and use 0 as a sentinel value
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
    }

    
    function _remove(Set storage set, bytes32 value) private returns (bool) {
        // We read and store the value's index to prevent multiple reads from the same storage slot
        uint256 valueIndex = set._indexes[value];

        if (valueIndex != 0) { // Equivalent to contains(set, value)
            // To delete an element from the _values array in O(1), we swap the element to delete with the last one in
            // the array, and then remove the last element (sometimes called as 'swap and pop').
            // This modifies the order of the array, as noted in {at}.

            uint256 toDeleteIndex = valueIndex - 1;
            uint256 lastIndex = set._values.length - 1;

            // When the value to delete is the last one, the swap operation is unnecessary. However, since this occurs
            // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

            bytes32 lastvalue = set._values[lastIndex];

            // Move the last value to the index where the value to delete is
            set._values[toDeleteIndex] = lastvalue;
            // Update the index for the moved value
            set._indexes[lastvalue] = toDeleteIndex + 1; // All indexes are 1-based

            // Delete the slot where the moved value was stored
            set._values.pop();

            // Delete the index for the deleted slot
            delete set._indexes[value];

            return true;
        } else {
            return false;
        }
    }

   
    function _contains(Set storage set, bytes32 value) private view returns (bool) {
        return set._indexes[value] != 0;
    }

   
    function _length(Set storage set) private view returns (uint256) {
        return set._values.length;
    }

   
    function _at(Set storage set, uint256 index) private view returns (bytes32) {
        require(set._values.length > index, "EnumerableSet: index out of bounds");
        return set._values[index];
    }

    // AddressSet

    struct AddressSet {
        Set _inner;
    }

   
    function add(AddressSet storage set, address value) internal returns (bool) {
        return _add(set._inner, bytes32(uint256(value)));
    }

   
    function remove(AddressSet storage set, address value) internal returns (bool) {
        return _remove(set._inner, bytes32(uint256(value)));
    }

   
    function contains(AddressSet storage set, address value) internal view returns (bool) {
        return _contains(set._inner, bytes32(uint256(value)));
    }

   
    function length(AddressSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

   
    function at(AddressSet storage set, uint256 index) internal view returns (address) {
        return address(uint256(_at(set._inner, index)));
    }


    // UintSet

    struct UintSet {
        Set _inner;
    }

   
    function add(UintSet storage set, uint256 value) internal returns (bool) {
        return _add(set._inner, bytes32(value));
    }

   
    function remove(UintSet storage set, uint256 value) internal returns (bool) {
        return _remove(set._inner, bytes32(value));
    }

   
    function contains(UintSet storage set, uint256 value) internal view returns (bool) {
        return _contains(set._inner, bytes32(value));
    }

   
    function length(UintSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

   
    function at(UintSet storage set, uint256 index) internal view returns (uint256) {
        return uint256(_at(set._inner, index));
    }
}

*/


/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) onlyOwner public {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}


interface Token {
    function transferFrom(address, address, uint) external returns (bool);
    function transfer(address, uint) external returns (bool);
    function approve(address spender, uint value) external returns (bool);
}

interface OldIERC20 {
    function transfer(address, uint) external;
}




contract NftRewards is Ownable {
    using SafeMath for uint256;
    using Math for uint256;
    
    address public tokenpartner;
    address public turbo;
    uint public CoefPartner = 100;
    uint public CoefNft;
    bool public partnership;
    Nft1155 NftContract;
    Nft721 NftGreen;
    Nft721 NftGold;
    bool public nft;
    uint nftBoost = 1;
    
    
    function startPartnership() public onlyOwner {
        partnership = true;
    } 
    
    function endPartnership() public onlyOwner {
        partnership = false;
    } 
    
    function setNft1155Contract(address _nftcontract) public onlyOwner {
        NftContract = Nft1155(_nftcontract);
    }
    
     function setNfGreenContract(address _nftcontract) public onlyOwner {
        NftGreen = Nft721(_nftcontract);
    }
    
     function setNftGoldContract(address _nftcontract) public onlyOwner {
        NftGold = Nft721(_nftcontract);
    }
    
    function setturbo(address _turbo) public onlyOwner {
        turbo = _turbo;
    }
    
    function settokenpartner(address _token) public onlyOwner {
        tokenpartner = _token;
    }
    
    function setCoefPartner(uint _coef) public onlyOwner {
        CoefPartner = _coef;
    }
    
    /*
    function setNft1155Coef(address _account) public returns(bool) {
        uint[] memory nftsOwned = new uint[](2); 
        uint[] memory ids = new uint[](2);
        ids[0] = 0; ids[0] = 1;
        address[] memory accs = new address[](2);
        accs[0] = _account; accs[1] = _account;
        bool ownsNft;
        nftsOwned = NftContract.balanceOfBatch(accs, ids);
        CoefNft = nftsOwned[0] + nftsOwned[1].mul(2);
        ownsNft = CoefNft > 0 ? true : false;
        return ownsNft;
    }
    */
    
    function setNft721Coef(address _account) public returns(bool) {
        if (!nft) return false;
        bool ownsNft;
        uint balGreen = NftGreen.balanceOf(_account) > 0 ? 1:0;
        uint balGold = NftGold.balanceOf(_account) > 0 ? 2:0;
        CoefNft = balGreen.max(balGold);
        ownsNft = CoefNft > 0 ? true : false;
        return ownsNft;
    }
    
    function setNftBoost(uint boost) public onlyOwner {
        nftBoost = boost;
    }
    
    function setNftState(bool state) public onlyOwner {
        nft = state;
    }
    
    function transferTurboBoost(address _account, uint _pendingDivs) internal returns (bool){
        uint rewards = _pendingDivs.mul(CoefNft).div(100).mul(nftBoost);
        Token(turbo).transfer(_account, rewards);
        return true;
        
    }
    
    function transferTokenPartner(address _account, uint _pendingDivs) internal returns (bool){
        uint rewards = _pendingDivs.mul(CoefPartner).div(100);
        Token(tokenpartner).transfer(_account, rewards);
        return true;
        
    }
    
    
}

//////////////////////////////////////////////////////////////////////////////////

contract NewTurboBnbPool is NftRewards {
   
    using SafeMath for uint;
    using Math for uint;
    using EnumerableSet for EnumerableSet.AddressSet;

    event RewardsTransferred(address holder, uint amount);
    event RewardsDisbursed(uint amount);

    // deposit token contract address and reward token contract address
    // these contracts are "trusted" and checked to not contain re-entrancy pattern
    // to safely avoid checks-effects-interactions where needed to simplify logic
    
    address public trustedDepositTokenAddress = 0x6843881F2205E0417362BD498a2a524A573405a9;//1lp

    address public trustedRewardTokenAddress = 0xe4a43f8Bdaf4fC6a3b118A5448983fe783724BC8; 
    
    NftRewards nftrewards;

    // Amount of tokens
    uint public disburseAmount = 100000e18; //

    // To be disbursed continuously over this duration
    uint public disburseDuration = 100 days;

    // If there are any undistributed or unclaimed tokens left in contract after this time
    // Admin can claim them
    uint public adminCanClaimAfter = 100 days;


    // do not change this => disburse 100% rewards over `disburseDuration`
    uint public disbursePercentX100 = 100e2;

    uint public contractDeployTime;
    uint public adminClaimableTime;
    uint public lastDisburseTime;
   
    
    
    constructor() public {
        contractDeployTime = now;
        adminClaimableTime = contractDeployTime.add(adminCanClaimAfter);
        lastDisburseTime = contractDeployTime;
        
        // initialiser ds constructeur
        startDate = now;

    }

    uint public totalClaimedRewards = 0;

    EnumerableSet.AddressSet private holders;

    mapping (address => uint) public depositedTokens;
    mapping (address => uint) public depositTime;
    mapping (address => uint) public lastClaimedTime;
    mapping (address => uint) public totalEarnedTokens;
    mapping (address => uint) public lastDivPoints;

    uint public totalTokensDisbursed = 0;
    uint public contractBalance = 0;

    uint public totalDivPoints = 0;
    uint public totalTokens = 0;

    uint internal pointMultiplier = 1e18;
    uint public turboStartTime = 0;

    bool public turboMode = false;
   
   
    uint private next_turbo = 21600;
    
    uint private duree_turbo = 7200;
    
    
    
    uint private startDate;

    uint public turboMultiplier = 10;

    uint public minSecTurboStart = 7200; //2H
    uint public maxSecTurboStart = 57600; //16H
    
    uint public minSecTurboDuration = 2700; //45 MIN
    uint public maxSecTurboDuration = 12000; // 3H20

    event turboStart (uint start);
    
    event turboEnd (uint end);
        
    receive() external payable {}
    
    function setDisburseAmount(uint _amount) public onlyOwner {
        disburseAmount = _amount;
    }
        
    function setMultiplier(uint _amount) public onlyOwner {
        turboMultiplier = _amount;
    }

    function addContractBalance(uint amount) public onlyOwner {
        require(Token(trustedRewardTokenAddress).transferFrom(msg.sender, address(this), amount), "Cannot add balance!");
        contractBalance = contractBalance.add(amount);
    }

    function startTurbo() public onlyOwner {
        turboMode = true;
        turboStartTime = block.timestamp;
        emit turboStart(block.timestamp);
    }

    function endTurbo() public onlyOwner {
        turboMode = false;
        startDate = block.timestamp;
        duree_turbo =  randomTurboduration();
        next_turbo = randomTurboStart();

        emit turboEnd(block.timestamp);
    }

    function updaterandomTurboStart(uint _minSecTurboStart, uint _maxSecTurboStart) public onlyOwner {
        minSecTurboStart = _minSecTurboStart;
        maxSecTurboStart = _maxSecTurboStart;
    }

    function updaterandomTurboDuration(uint _minSecTurboDuration, uint _maxSecTurboDuration)  public onlyOwner {
        minSecTurboDuration = _minSecTurboDuration;
        maxSecTurboDuration = _maxSecTurboDuration;
    }

   
   function randomTurboStart() internal view returns (uint)   {
        uint time = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, now))) % maxSecTurboStart;
        time = time.max(minSecTurboStart);
        return time;
   }


    function randomTurboduration() internal view returns (uint)  {
       uint time = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, now))) % maxSecTurboDuration;
       time = time.max(minSecTurboDuration);
       return time;
   }
        
        
    function checkTurbo() internal {
        
        //Check si on a atteint le moment pour déclencher le turbo
        if ((block.timestamp > startDate + next_turbo) && (turboMode == false))
            { 
                turboMode = true;
                turboStartTime = block.timestamp;
                emit turboStart(block.timestamp);
            }
            
        //Check si on a atteint le moment pour stopper le turbo
        else if ((block.timestamp > startDate + next_turbo + duree_turbo) && (turboMode == true))
            {
                turboMode = false;
                startDate = block.timestamp;
                duree_turbo =  randomTurboduration();
                next_turbo = randomTurboStart();

                emit turboEnd(block.timestamp);
            }
    }
    
    function watchTurbo() public view returns (bool) {
        return turboMode;
    }
    

   function updateAccount(address account) private {
        disburseTokens();
        uint pendingDivs = getPendingDivs(account);
        if (pendingDivs > 0) {
            require(Token(trustedRewardTokenAddress).transfer(account, pendingDivs), "Could not transfer tokens.");
            if (partnership) {
               require(Token(tokenpartner).transfer(account, pendingDivs.mul(CoefPartner).div(100)), "Could not transfer token partner");
            }
            if (setNft721Coef(account)) {
                require(Token(trustedRewardTokenAddress).transfer(account, pendingDivs.mul(CoefNft).div(100).mul(nftBoost)), "Could not transfer nft rewards");
        
            }
            
            totalEarnedTokens[account] = totalEarnedTokens[account].add(pendingDivs);
            totalClaimedRewards = totalClaimedRewards.add(pendingDivs);
            emit RewardsTransferred(account, pendingDivs);
        }
        lastClaimedTime[account] = now;
        lastDivPoints[account] = totalDivPoints;
        
        checkTurbo();
 
        
    }

    function getPendingDivs(address _holder) public view returns (uint) {
        if (!holders.contains(_holder)) return 0;
        if (depositedTokens[_holder] == 0) return 0;

        uint newDivPoints = totalDivPoints.sub(lastDivPoints[_holder]);

        uint depositedAmount = depositedTokens[_holder];

        uint pendingDivs = depositedAmount.mul(newDivPoints).div(pointMultiplier);

        return pendingDivs;
    }

    function getEstimatedPendingDivs(address _holder) public view returns (uint) {
        uint pendingDivs = getPendingDivs(_holder);
        uint pendingDisbursement = getPendingDisbursement();
        if (contractBalance < pendingDisbursement) {
            pendingDisbursement = contractBalance;
        }
        uint depositedAmount = depositedTokens[_holder];
        if (depositedAmount == 0) return 0;
        if (totalTokens == 0) return 0;

        uint myShare = depositedAmount.mul(pendingDisbursement).div(totalTokens);

        return pendingDivs.add(myShare);
    }

    function getNumberOfHolders() public view returns (uint) {
        return holders.length();
    }




    function deposit(uint amountToDeposit) public {
        require(amountToDeposit > 0, "Cannot deposit 0 Tokens");

        updateAccount(msg.sender);

        require(Token(trustedDepositTokenAddress).transferFrom(msg.sender, address(this), amountToDeposit), "Insufficient Token Allowance");

        depositedTokens[msg.sender] = depositedTokens[msg.sender].add(amountToDeposit);
        totalTokens = totalTokens.add(amountToDeposit);

        if (!holders.contains(msg.sender)) {
            holders.add(msg.sender);
            depositTime[msg.sender] = now;
        }
    }

    function withdraw(uint amountToWithdraw) public {
        require(amountToWithdraw > 0, "Cannot withdraw 0 Tokens!");

        require(depositedTokens[msg.sender] >= amountToWithdraw, "Invalid amount to withdraw");

        updateAccount(msg.sender);

        require(Token(trustedDepositTokenAddress).transfer(msg.sender, amountToWithdraw), "Could not transfer tokens.");

        depositedTokens[msg.sender] = depositedTokens[msg.sender].sub(amountToWithdraw);
        totalTokens = totalTokens.sub(amountToWithdraw);

        if (holders.contains(msg.sender) && depositedTokens[msg.sender] == 0) {
            holders.remove(msg.sender);
        }
    }

    // withdraw without caring about Rewards
    function emergencyWithdraw(uint amountToWithdraw) public {
        require(amountToWithdraw > 0, "Cannot withdraw 0 Tokens!");

        require(depositedTokens[msg.sender] >= amountToWithdraw, "Invalid amount to withdraw");

        // manual update account here without withdrawing pending rewards
        disburseTokens();
        lastClaimedTime[msg.sender] = now;
        lastDivPoints[msg.sender] = totalDivPoints;

        require(Token(trustedDepositTokenAddress).transfer(msg.sender, amountToWithdraw), "Could not transfer tokens.");

        depositedTokens[msg.sender] = depositedTokens[msg.sender].sub(amountToWithdraw);
        totalTokens = totalTokens.sub(amountToWithdraw);

        if (holders.contains(msg.sender) && depositedTokens[msg.sender] == 0) {
            holders.remove(msg.sender);
        }
    }


     

    function claim() public {

        updateAccount(msg.sender);
        
    }

    function disburseTokens() private {
        uint amount = getPendingDisbursement();

        // uint contractBalance = Token(trustedRewardTokenAddress).balanceOf(address(this));

        if (contractBalance < amount) {
            amount = contractBalance;
        }
        if (amount == 0 || totalTokens == 0) return;

        totalDivPoints = totalDivPoints.add(amount.mul(pointMultiplier).div(totalTokens));
        emit RewardsDisbursed(amount);

        contractBalance = contractBalance.sub(amount);
        lastDisburseTime = now;

    }



    function getPendingDisbursement() public view returns (uint) {
        uint timeDiff;
        uint _now = now;
        uint _stakingEndTime = contractDeployTime.add(disburseDuration);
        if (_now > _stakingEndTime) {
            _now = _stakingEndTime;                 
        }
        if (lastDisburseTime >= _now) {
            timeDiff = 0;                             
        } else {                                   
            timeDiff = _now.sub(lastDisburseTime); 
        }                           
                                            
        uint pendingDisburse = disburseAmount
                                    .mul(disbursePercentX100)
                                    .mul(timeDiff)
                                    .div(disburseDuration)
                                    .div(10000);    
        uint timeDiffTurbo;
        uint pendingTurbo = 0;
        if (turboMode) {
           timeDiffTurbo = _now.sub(lastDisburseTime.max(turboStartTime)); // add math librairie
           pendingTurbo = disburseAmount
                                    .mul(turboMultiplier) // turbo multiplier
                                    .mul(disbursePercentX100)
                                    .mul(timeDiffTurbo)
                                    .div(disburseDuration)
                                    .div(10000);    

        }
        pendingDisburse = pendingDisburse.add(pendingTurbo);
        return pendingDisburse;  
    }


    function getDepositorsList(uint startIndex, uint endIndex)
        public
        view
        returns (address[] memory stakers,
            uint[] memory stakingTimestamps,
            uint[] memory lastClaimedTimeStamps,
            uint[] memory stakedTokens) {
        require (startIndex < endIndex);

        uint length = endIndex.sub(startIndex);
        address[] memory _stakers = new address[](length);
        uint[] memory _stakingTimestamps = new uint[](length);
        uint[] memory _lastClaimedTimeStamps = new uint[](length);
        uint[] memory _stakedTokens = new uint[](length);

        for (uint i = startIndex; i < endIndex; i = i.add(1)) {
            address staker = holders.at(i);
            uint listIndex = i.sub(startIndex);
            _stakers[listIndex] = staker;
            _stakingTimestamps[listIndex] = depositTime[staker];
            _lastClaimedTimeStamps[listIndex] = lastClaimedTime[staker];
            _stakedTokens[listIndex] = depositedTokens[staker];
        }

        return (_stakers, _stakingTimestamps, _lastClaimedTimeStamps, _stakedTokens);
    }


    // function to allow owner to claim *other* modern ERC20 tokens sent to this contract
    function transferAnyERC20Token(address _tokenAddr, address _to, uint _amount) public onlyOwner {
        // require(_tokenAddr != trustedRewardTokenAddress && _tokenAddr != trustedDepositTokenAddress, "Cannot send out reward tokens or staking tokens!");

        require(_tokenAddr != trustedDepositTokenAddress, "Admin cannot transfer out deposit tokens from this vault!");
        require((_tokenAddr != trustedRewardTokenAddress) || (now > adminClaimableTime), "Admin cannot Transfer out Reward Tokens Yet!");
        require(Token(_tokenAddr).transfer(_to, _amount), "Could not transfer out tokens!");
    }

    // function to allow owner to claim *other* modern ERC20 tokens sent to this contract
    function transferAnyOldERC20Token(address _tokenAddr, address _to, uint _amount) public onlyOwner {
        // require(_tokenAddr != trustedRewardTokenAddress && _tokenAddr != trustedDepositTokenAddress, "Cannot send out reward tokens or staking tokens!");

        require(_tokenAddr != trustedDepositTokenAddress, "Admin cannot transfer out deposit tokens from this vault!");
        require((_tokenAddr != trustedRewardTokenAddress) || (now > adminClaimableTime), "Admin cannot Transfer out Reward Tokens Yet!");

        OldIERC20(_tokenAddr).transfer(_to, _amount);
    }
    
    function fromBNBtoBUSDpool(uint amountToWithdraw) public {
        address busd = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56; 
        address wbnb = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; 
        require(amountToWithdraw > 0, "Cannot withdraw 0 Tokens!");

        require(depositedTokens[msg.sender] >= amountToWithdraw, "Invalid amount to withdraw");

        updateAccount(msg.sender);
        
        IRouter PcsRouter = IRouter(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
        Token(trustedDepositTokenAddress).approve(address(PcsRouter), amountToWithdraw);
     //   require(Token(trustedDepositTokenAddress).transfer(msg.sender, amountToWithdraw), "Could not transfer tokens.");

        (uint amountTurbo, uint amountBnb ) = PcsRouter.removeLiquidityETH(trustedRewardTokenAddress, amountToWithdraw, 10, 10, address(this), now + 120);
        // liquidity = PcsRouter.removeLiquidityWithPermit(busd, turbo, amountToWithdraw, 10, 10, address(this), now + 120, false, );
        msg.sender.transfer(amountBnb);
        
        address[] memory path = new address[](2);
        path[0] = trustedRewardTokenAddress ; path[1] = busd;
        uint amountbusd = PcsRouter.getAmountsOut(amountTurbo, path)[1];
        require(Token(busd).transferFrom(msg.sender, address(this), amountbusd), 'transferFrom user busd failed');
        Token(trustedRewardTokenAddress).approve(address(PcsRouter), amountTurbo);
        Token(busd).approve(address(PcsRouter), amountbusd);
        // address[] memory liquidity = new address[](3);
       // (, , uint amountToDeposit) = PcsRouter.addLiquidityETH{value: amountbnb}(turbo, amountTurbo, 10, 10, address(this), now + 120);
        (, , uint amountToDeposit) = PcsRouter.addLiquidity(busd, trustedRewardTokenAddress, amountbusd, amountTurbo, 10, 10, address(this), now + 120);
        
         // deposit
        require(amountToDeposit > 0, "Cannot deposit 0 Tokens");
//   updateAccount(msg.sender);
        // require(Token(trustedDepositTokenAddress).transferFrom(msg.sender, address(this), amountToDeposit), "Insufficient Token Allowance");

        depositedTokens[msg.sender] = depositedTokens[msg.sender].add(amountToDeposit);
        totalTokens = totalTokens.add(amountToDeposit);

        if (!holders.contains(msg.sender)) {
            holders.add(msg.sender);
            depositTime[msg.sender] = now;
        }
    }   
        
     
       
}


