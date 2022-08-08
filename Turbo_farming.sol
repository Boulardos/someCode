contract FarmingTurboBNB is Ownable {
    using SafeMath for uint;
    using Math for uint;
    using EnumerableSet for EnumerableSet.AddressSet;

    event RewardsTransferred(address holder, uint amount);
    event RewardsDisbursed(uint amount);

    // deposit token contract address and reward token contract address
    // these contracts are "trusted" and checked to not contain re-entrancy pattern
    // to safely avoid checks-effects-interactions where needed to simplify logic
    
    address public trustedDepositTokenAddress = 0x0E1ebc385B82615382972a552c196628cb81AE9E;//Adresse paire

    address public trustedRewardTokenAddress = 0x1780240Ef04c0662372737dad10376DD95bc45e5; 

    // Amount of tokens
    uint public disburseAmount = 300000e18; 

    // To be disbursed continuously over this duration
    uint public disburseDuration = 1500 days;

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
   
    uint private next_turbo = 10800;
    
    uint private duree_turbo = 12;
    
    uint private startDate;

    uint public turboMultiplier = 100;

    uint public minSecTurboStart = 7200; //2H
    uint public maxSecTurboStart = 57600; //16H
    
    uint public minSecTurboDuration = 2700; //45 MIN
    uint public maxSecTurboDuration = 12000; // 3H20

    event turboStart (uint start);
    
    event turboEnd (uint end);
        
    function setMultiplier(uint _amount) public onlyOwner {
        turboMultiplier = _amount;
    }

    function addContractBalance(uint amount) public onlyOwner {
        require(Token(trustedRewardTokenAddress).transferFrom(msg.sender, address(this), amount), "Cannot add balance!");
        contractBalance = contractBalance.add(amount);
    }

    function startTurbo() public onlyOwner {
        turboMode = true;

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

    function randomTurboStart() internal view returns (uint8) {
       //return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, _player, _tickets))) % 289;
        uint8 time8 = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, now))) % maxSecTurboStart);
        uint256 time256 = uint256(time8);
        time256 = time256.max(minSecTurboStart);
        return uint8(time256);
   }


   function randomTurboduration() internal view returns (uint8) {
       //return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, _player, _tickets))) % 289;
       uint8 time8 = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, now))) % maxSecTurboDuration);
       uint256 time256 = uint256(time8);
       time256 = time256.max(minSecTurboDuration);
       return uint8(time256);
   }
        
        
    function checkTurbo() internal {
        
        //Check si on a atteint le moment pour déclencher le turbo
        if ((block.timestamp > startDate + next_turbo) && (turboMode == false))
            { 
                turboMode = true;

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
}