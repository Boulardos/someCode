async function get_apr_for_turbo_pool1(tokenA, tokenB) {
    try {
    //VARIABLES
    var BN = web3.utils.BN; 
    const oneE18 = web3.utils.toWei('1','ether'); 
    let amount = 1e18;


    //nb tokens à distribuer dans le contrat
    let disburseTokens = 300000;

    //duree distribution en jours
    let disbureDuration = 1500;

    //calcul distribution pour un an à faire
    let oneyear_rewards = disburseTokens / disbureDuration * 365;


    //CONTRATS
    const factory = new web3.eth.Contract(FACTORY_TOKEN_ABI, factory_add);
    const router = new web3.eth.Contract(ROUTER_TOKEN_ABI, router_add);

    const pairAddress = await factory.methods.getPair(tokenA, tokenB).call();

    let  newpair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);


    ///TRAITEMENTS
    //balance deposit sur contrat de farming
    let lp_deposits = await newpair.methods.balanceOf(farmingAddress1).call()
    



    //calcul du prix du turbo
    let path = [turboAddress, busdAddress];
    let turbo_price = await router.methods.getAmountsOut(amount.toString(), path).call();
    turboPrice = turbo_price[1];
    priceToDisplay = turboPrice / 1e18;
    priceToDisplay = getFormattedNumber(priceToDisplay, 2);
    


    totalTVL = 0

    totalTVL = totalTvl1Count + totalTvl2Count + totalTvl3Count;

    totalTVL = getFormattedNumber(totalTVL, 0);
    //alert(totalTVL);

    let circulatingSupply = await getCirculatingSupply();

    marketCap = priceToDisplay * circulatingSupply;
    marketCap = getFormattedNumber(marketCap, 0);


    circulatingSupply = getFormattedNumber(circulatingSupply,0);


    
    $("#turboPrice").html("<b>Turbo price</b> : $" + priceToDisplay + " | <b>Marketcap</b> : $"+ marketCap + " | <b>Total TVL</b> : $"+ totalTVL + " | <b>Circulating supply</b> : " + circulatingSupply + " | <b>Total supply</b> : 1 000 000");
    //$("#turboPrice").html("<b>Turbo price</b> : $" + priceToDisplay + " | <b>Marketcap</b> : $"+ marketCap + " | <b>Circulating</b> : 493 500 | <b>Total supply</b> : 1 000 000");



    path = [learnAddress, busdAddress];
    let bnb_price = await router.methods.getAmountsOut(amount.toString(), path).call();


    //récupère la total supply de la paire LP
    let totsupply = await newpair.methods.totalSupply().call();

    //reserves des deux tokens
    let token0 = await newpair.methods.token0().call();
    let reserves = await newpair.methods.getReserves().call();
    let bnbReserve = token0 == learnAddress ? reserves[0] : reserves[1];
    let turboReserve = token0 == turboAddress ? reserves[0] : reserves[1];

    //calcul la valeur de la total supply des LPs
    //let totalsupply_value   = (new BN(turboReserve)).mul(new BN(turbo_price[1]).div(new BN(oneE18)));
    let totalsupply_value = turboReserve * turbo_price[1] / 1e18;
    totalsupply_value = totalsupply_value * 2;
    /*
    let bnbsupply_value = bnbReserve * bnb_price[1] / 1e18;
    totalsupply_value = parseInt(totalsupply_value) + parseInt(bnbsupply_value);
    */

    //calcul du prix d'un LP
    const mille = '1000';   
    //let oneLp_price = new BN(mille).mul(totalsupply_value).div(new BN(totsupply));
    let oneLp_price = totalsupply_value / totsupply;

    //calcul de la valeur total des rewards distribuées pour un an
    let rewards_value = oneyear_rewards * turbo_price[1];

    //calcul de valeur des LPs deposés sur le contrat de farming en dollars
    let deposits_value = lp_deposits * oneLp_price;
    //4 531 758 508 303 044 
    //let deposits_value = 200000e18;


    //Calcul APR
    let apr = (100) * (rewards_value) / (deposits_value);


    //Calcul TV

    let tvl1 = lp_deposits * oneLp_price;

    

    //alert("tvl1 " + tvl1);

    tvl1 = tvl1 / 1e18;

   

    totalTvl1Count = tvl1;

    

    //alert("tvl1 " + tvl1);

    //alert(totalTVL);

    //alert("tvl1 " + tvl1);

 

    //tvl1 = getFormattedNumber(tvl1, 6);


    //totalTVL = parseInt(totalTVL) + parseInt(tvl1);

  


    




    // console.log("1- turbo_price " + turbo_price[1]);
    // console.log("1- bnb_price " + bnb_price[1]);
    // console.log("1- bnbReserve " + bnbReserve);
    // console.log("1- turboReserve " + turboReserve);
    // console.log("1- totalsupply_value " + totalsupply_value);
    // console.log("1- totsupply " + totsupply);
    // console.log("1- oneyear_rewards " + oneyear_rewards);
    // console.log("1- oneLp_price " + oneLp_price);
    // console.log("1- lp_deposits " + lp_deposits);
    // console.log("1- deposits_value " + deposits_value);
    // console.log("1- rewards_value " + rewards_value);
    // console.log("1- apr " + apr);
    // console.log("1- tvl " + tvl1);

    let result = [apr, oneLp_price];


        multiplierPool1 = await vault_lp.turboMultiplier.call()


        
        //Affichage APR en fonction du turbo courant
        value1 = await vault_lp.watchTurbo.call()
        



        //alert("value1 " + value1);

        let apy1 = parseInt(apr);

        if (value1 == true) {

            apy1 = apy1 * multiplierPool1;
            apy1 = getFormattedNumber(apy1, 0)
            $("#aprPool1").html("Current APR : " + apy1 + "%");
            $("#aprPool1Next").html("<br><br>");
        }
        if (value1 == false) {

            let nextApy1 = apy1 * multiplierPool1;
            apy1 = getFormattedNumber(apy1, 0)
            nextApy1 = getFormattedNumber(nextApy1, 0)
            $("#aprPool1").html("Current APR : " + apy1 + "% ");
            $("#aprPool1Next").html(" Next Turbo APR : " + nextApy1 + "%<br><br>")
        }


        $("#tvl1").html("TVL in pool : $" + getFormattedNumber(tvl1, 0));

         
        } catch (e) {console.log(e)};
}