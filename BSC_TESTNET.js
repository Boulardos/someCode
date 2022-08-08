const Web3 = require('web3');
const BN = require('bn.js');

// const web3 = new Web3 (
//     new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/262187caeacd4fe8ad8e761bfb3665e2')
// );
// var Tx = require("ethereumjs-tx");
// const myaccount = "0xcbdbf7A101Bb22F5a26E0d7C7360210C6826b1Ac";
// const privateKey = Buffer.from("F2E5F7447.........................................", "hex");


const HDWalletProvider = require('@truffle/hdwallet-provider');
const myaccount = "0x1628E66dF4752C670b430E6ac087Ab1B3D6b35b2";
const myDittoaccount = "0xD0D5487D171590d9504ef149A7DF2A358774a628";



const provider = new HDWalletProvider(process.env.privateKey, 'https://data-seed-prebsc-2-s1.binance.org:8545/');
// const provider = new HDWalletProvider(DittoprivaKey, 'https://bsc-dataseed1.binance.org:443');
const web3 = new Web3(provider);

const erc20 = require ('@studydefi/money-legos/erc20');
const Bep20abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totaltotal_supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const factoryabi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const bakeryrouterabi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const uniswapV2pairabi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount0",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount1",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "Burn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount0",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount1",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount0In",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount1In",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount0Out",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount1Out",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "Swap",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint112",
				"name": "reserve0",
				"type": "uint112"
			},
			{
				"indexed": false,
				"internalType": "uint112",
				"name": "reserve1",
				"type": "uint112"
			}
		],
		"name": "Sync",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINIMUM_LIQUIDITY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PERMIT_TYPEHASH",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "burn",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount0",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount1",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "factory",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReserves",
		"outputs": [
			{
				"internalType": "uint112",
				"name": "reserve0",
				"type": "uint112"
			},
			{
				"internalType": "uint112",
				"name": "reserve1",
				"type": "uint112"
			},
			{
				"internalType": "uint32",
				"name": "blockTimestampLast",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "kLast",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price0CumulativeLast",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price1CumulativeLast",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "skim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount0Out",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount1Out",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "swap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sync",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token0",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token1",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totaltotal_supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const Bakeryrouterabi = require ('./utils/BakeryrouterAbi.js');
const BakeryFactoryabi = require('./utils/BakeryFactoryAbi.js');
const BakeryPairabi = require ('./utils/BakeryPairAbi.js');


const factoryAddress = "0xF407cd098c8FD46929ECeFEC28dcC5CBf064A578";
const BakeryrouterAddress = "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F";
const BakeryFactoryAddress = "0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7";
const cakeAddress = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";
// const wbnbAddress = "0x58AbBb3c89750dDA42b65822042EbADb00f9Ef61";
const tbusdAddress = "0x0F999E1db4f58FD2020FDAFaF7B296b9DcB7B203";
const Tokenaddress = "0x2bE5c3870285DC65b31412Fc5a16a8F0cF8DF4e2"; // NWC
// const newTokenaddress = "0x2cc26dd730F548dc4ac291ae7D84a0C96980d2cB"; // pizza

const cake = new web3.eth.Contract(Bep20abi, cakeAddress);
const tbusd = new web3.eth.Contract(Bep20abi, tbusdAddress);
const newToken = new web3.eth.Contract(Bep20abi, Tokenaddress);
const bakeryrouter = new web3.eth.Contract(bakeryrouterabi, BakeryrouterAddress);
const factory = new web3.eth.Contract(factoryabi, factoryAddress);
const bakeryfactory = new web3.eth.Contract(BakeryFactoryabi, BakeryFactoryAddress);


var out = false; 
let PAIRS = [];
let pairevents = [];
let block = 4674620; // last check 4660000

const balance = async () => {
    let bal =  await cake.methods.balanceOf('0x1628E66dF4752C670b430E6ac087Ab1B3D6b35b2').call();
    console.log('bal', bal);
}
// balance();

const testing = async () => {
try {	
//	const bakeryrouter1Address = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
//	const bakeryrouter1 = new web3.eth.Contract(bakeryrouterabi, bakeryrouter1Address);
// wwbnb =  await bakeryrouter1.methods.WETH().call();
    const wwbnb = await bakeryrouter.methods.WETH().call();
	
    console.log(wwbnb);
    const pairAddress = await factory.methods.getPair(tbusdAddress, wbnbAddress).call();
//	const pairAddress1 = await factory.methods.getPair(NWCaddress, wbnbAddress).call();
    console.log("paire address:", pairAddress);
	let onepair = await factory.methods.allPairs(1).call();
	console.log('paire', onepair);

    const pair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);
    let reserve = await pair.methods.getReserves().call();
    console.log('reserve', reserve[0], reserve[1]);
    let pair_bnb_amount;
    const address0 = await pair.methods.token0().call();
  //  const address1 = await pair.methods.token1().call();
    pair_bnb_amount = address0 == wbnbAddress ? reserve[0] : reserve[1];
    console.log( "reserve bnb:", pair_bnb_amount);
} catch (e) {console.log("erreur"+ e)}
}
// testing();

const bakery_swap = async () => {
try {
    const bwbnb = await bakerybakeryrouter.methods.WBNB().call();
	console.log('wbnb', bwbnb);
	let amountBUSD = 200e18;
	let amountBNB = 1e18;
	let block = await web3.eth.getBlock('latest');
    let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	  
    // console.log('cest parti');
	// await tbusd.methods.approve(BakerybakeryrouterAddress, amountBUSD.toString())
	// 	     .send({from: myaccount, gas: '4000000', gasPrice: web3.utils.toWei("20", 'gwei')});	

    // await bakerybakeryrouter.methods.addLiquidityBNB(tbusdAddress, amountBUSD.toString(), 1000, 1000, myaccount, sellDeadline)
    //         .send({from: myaccount, value: amountBNB.toString(), gas: '4000000',
    //          gasPrice: web3.utils.toWei("20", 'gwei')});
			 

    console.log('tx done');         
} catch (e)	{console.log('erreur'+ e)}
}
// bakery_swap();

const add_liquidity = async () => {
	let amountBUSD = 140e18;
	let amountBNB = 1e18;
	let block = await web3.eth.getBlock('latest');
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	    // await bakeryrouter.methods.swapExactTokensForTokens(amountIn.toString(), 1000, path, myaccount, sellDeadline)
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')});	
        console.log('cest parti');
		await tbusd.methods.approve(bakeryrouterAddress, amountBUSD.toString())
		     .send({from: myaccount, gas: '4000000', gasPrice: web3.utils.toWei("20", 'gwei')});	

        await bakeryrouter.methods.addLiquidityETH(tbusdAddress, amountBUSD.toString(), 1000, 1000, myaccount, sellDeadline)
            .send({from: myaccount, value: amountBNB.toString(), gas: '4000000',
             gasPrice: web3.utils.toWei("20", 'gwei')})
			.catch( e => {console.log('erreeuur', e)});	 

        console.log('tx done');            
}
// add_liquidity();

const get_newpairs = async () => {
  pairevents = await factory.getPastEvents('PairCreated',{fromBlock: block});
  console.log('pair events length', pairevents.length);
  console.log(pairevents);
  const blockObj = await web3.eth.getBlock('latest');
  console.log(blockObj.number);
  if ( pairevents.length > 0) {
  console.log(pairevents);
  const index = pairevents.length - 1;
  let token0 = pairevents[index].returnValues.token0;
  let token1 = pairevents[index].returnValues.token1;
  let pair = pairevents[index].returnValues.pair;
  const newpair = new web3.eth.Contract(uniswapV2pairabi, pair);
  let reserves = await newpair.methods.getReserves().call();
  console.log('new pair reserves','0', reserves[0]/1e18,'1', reserves[1]/1e18);
  let reserveBNB = token0 == wbnbAddress ? reserves[0] : reserves[1];
  const tokenAddress = token0 == wbnbAddress ? token1 : token0;
  console.log('reserve BNB', parseInt(reserveBNB)/1e18, 'token address',tokenAddress );
  block = blockObj.number + 1;
  } 
  else {console.log('no pair found')}
//   let pair_number = await factory.methods.allPairsLength().call();
//   let lastpair = await factory.methods.allPairs(pair_number - 1).call();
//   console.log('total pcs pairs', pair_number);
//   console.log('last pair', lastpair);
//   const newpair = new web3.eth.Contract(uniswapV2pairabi, lastpair);
//   let reserves = await newpair.methods.getReserves().call();
//   console.log('new pair reserves','0', reserves[0]/1e18,'1', reserves[1]/1e18);
//   token0 = await newpair.methods.token0().call();
//   console.log('token0', token0);
//   token1 = await newpair.methods.token1().call();
//   console.log('token1', token1);

}

// get_newpairs();
// setInterval (get_newpairs, 200000);


const buynewToken = async () => { 
  //  const wbnbAddress = await bakeryrouter.methods.WETH().call(); 
	const newTokenaddress = "0x58f651DDE51CAa87c4111B16ee0A6Fab061Ee564"; // ICECREAM

//	const NWCaddress = "0x2bE5c3870285DC65b31412Fc5a16a8F0cF8DF4e2";
	const pairAddress = await factory.methods.getPair(newTokenaddress, wbnbAddress).call();
//	const pairAddress1 = await factory.methods.getPair(NWCaddress, wbnbAddress).call();
    console.log("paire address:", pairAddress);
    let amount; 
    
   if ( pairAddress != "0x0000000000000000000000000000000000000000") {
	  const pair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);
	  const pair1 = new web3.eth.Contract(uniswapV2pairabi, pairAddress1);
	  let reserve = await pair.methods.getReserves().call();
	  let pair_bnb_amount;
	  const address0 = await pair.methods.token0().call();
	//  const address1 = await pair.methods.token1().call();
	  pair_bnb_amount = address0 == wbnbAddress ? reserve[0] : reserve[1];
      console.log( "reserve bnb:", pair_bnb_amount);
      if ( parseInt(pair_bnb_amount) > 40e18) { 
		out = true;  // tx triggered
        // await dai.methods.approve(bakeryrouterAddress, amount.toString())
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')}); 
        amount = 2e18;
        var path = [wbnbAddress, newTokenaddress];  
        let block = await web3.eth.getBlock('latest');
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	    // await bakeryrouter.methods.swapExactTokensForTokens(amountIn.toString(), 1000, path, myaccount, sellDeadline)
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')});	
        console.log('cest parti');
        await bakeryrouter.methods.swapExactETHForTokens(amount.toString(), path, myaccount, sellDeadline)
            .send({from: myaccount, value: amount.toString(), gas: '2000000',
             gasPrice: web3.utils.toWei("20", 'gwei')});	 
        console.log('tx done');            
             
	   }   
	   // else {out = false};  
	   if (  parseInt(pair_bnb_amount) < 40e18 && parseInt(pair_bnb_amount) > 10e18)  { 
		out = true;  // tx triggered
        // await dai.methods.approve(bakeryrouterAddress, amount.toString())
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')}); 
        amount = 1e18;
        var path = [wbnbAddress, newTokenaddress];  
        let block = await web3.eth.getBlock('latest');
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	    // await bakeryrouter.methods.swapExactTokensForTokens(amountIn.toString(), 1000, path, myaccount, sellDeadline)
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')});	
        console.log('cest parti');
        await bakeryrouter.methods.swapExactETHForTokens(amount.toString(), path, myaccount, sellDeadline)
            .send({from: myaccount, value: amount.toString(), gas: '2000000',
             gasPrice: web3.utils.toWei("20", 'gwei')});	 
        console.log('tx done');            
             
	   }        

  }
}
// buynewToken();


// setInterval(function()  { 
//     if (!out) {buynewToken()} else {console.log('tx sent')} 
// }
// , 2000);
	


const buynewTokenatBLock = async () => {
    out = 1;
    let newTokenaddress = "0x2090c8295769791ab7A3CF1CC6e0AA19F35e441A";
  //  newTokenaddress = cakeAddress;
  //  console.log(wbnbAddress);
 //   const pairAddress = await factory.methods.getPair(cakeAddress, wbnbAddress).call();
 //   console.log("paire address:", pairAddress);
    const amount = 5e18; 
    let block = await web3.eth.getBlock('latest');
    console.log(block.number);
    const atblock = 2866144;  // 2866144

   if ( block.number == atblock) {
      
        // await dai.methods.approve(bakeryrouterAddress, amount.toString())
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')}); 

        var path = [wbnbAddress, newTokenaddress];  
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	    // await bakeryrouter.methods.swapExactTokensForTokens(amountIn.toString(), 1000, path, myaccount, sellDeadline)
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')});	
        console.log('send txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        await bakeryrouter.methods.swapExactETHForTokens(amount.toString(), path, myaccount, sellDeadline)
            .send({from: myaccount, value: amount.toString(), gas: '2000000',
             gasPrice: web3.utils.toWei("20", 'gwei')});	 
        console.log('tx done !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');            
                     
    } else {out = 0};       

}

// setInterval(function() 
//     { 
//     if (out == 0 ) {buynewToken()} else { console.log('loop')}
//     }, 1000);





const getblock = async () => { // 2866144
    let block = await web3.eth.getBlock('latest');
    console.log(block.number);
     const atblock = 2861960;
    //  const wbnbAddress = await bakeryrouter.methods.WETH().call();
    //  console.log('wbnb',wbnbAddress);
    // const pairAddress = await factory.methods.getPair("0x2090c8295769791ab7A3CF1CC6e0AA19F35e441A", wbnbAddress).call();
   //  console.log("paire address:", pairAddress);
     const pair = new web3.eth.Contract(uniswapV2pairabi, '0x3763A3263CEaca5e7Cc1Bc22A43920bAd9f743Cd');
     let reserve = await pair.methods.getReserves().call();
     console.log( "reserve cake/bnb:", reserve[0]/1e18, reserve[1]/1e18);
    if ( block.number == atblock) {
        buynewTokenatBLock();
        console.log ('succes');
    }    

} 
// getblock();

// setInterval(function() {
//     getblock();
// },500);


const get_api_for_turbo = async () => {
  const WbnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const ltc_bnb_pair = "0xbc765fd113c5bdb2ebc25f711191b56bb8690aec";
  const ltcAddress = "0x4338665cbb7b2485a8855a139b75d5e34ab0db94";	
  const tbusdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  const newpair = new web3.eth.Contract(uniswapV2pairabi, ltc_bnb_pair);
  let rewards_total = 1000; // tokens distribuées sur 1 an
  var BN = web3.utils.BN;
 
  token0 = await newpair.methods.token0().call();
  console.log('token0', token0);
  token1 = await newpair.methods.token1().call();
  console.log('token1', token1);
  const total_supply = await newpair.methods.totalSupply().call();
  console.log ('total_supply', total_supply);
  const turboAddress = token0 == WbnbAddress ? token1 : token0;
  let path = [turboAddress, WbnbAddress];
  let amount = 1e18;
  let firstprice = await bakeryrouter.methods.getAmountsOut(amount.toString(), path).call();
  path = [ WbnbAddress, tbusdAddress];
  let turbo_price = await bakeryrouter.methods.getAmountsOut(firstprice[1].toString(), path).call();
  console.log('turbo_price',parseInt(turbo_price[1])/1e18);
  path = [WbnbAddress, tbusdAddress];
  let bnb_price = await bakeryrouter.methods.getAmountsOut(amount.toString(), path).call();
  console.log('bnb_price',parseInt(bnb_price[1])/1e18);

  let reserves = await newpair.methods.getReserves().call();
  console.log('new pair reserves','0', reserves[0]/1e18,'1', reserves[1]/1e18);
  let reserve_turbo = token0 == WbnbAddress ? reserves[1] : reserves[0];
  let reserve_bnb = token0 == WbnbAddress ? reserves[0] : reserves[1];
  let total_supply_value = (reserve_turbo /1e18 * turbo_price[1] ) + (reserve_bnb /1e18 * bnb_price[1] );
  console.log(total_supply_value/1e18);
  const oneLp_price = total_supply_value / total_supply;
  console.log('1 lp price',oneLp_price);

  let rewards_value = rewards_total * turbo_price[1];
  console.log(rewards_value);
  let apy = 100 * rewards_value / total_supply_value;
  console.log('apy',apy);
  return apy;
}

const WbnbAddress = "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F";
let turboAddress = "0xac68cd2e53f3afb6631f5a52e653e1ac1a81b1f7";

const get_api_for_turbotTESTnet = async (multiplier) => {
try {	
	let rewards_total = 50e18; // tokens distribuées sur 1 an
	let distribution_duration = 0.5 ; // 6 mois
	let rewards_peryear = rewards_total / distribution_duration;

	// let turboAddress = tbusdAddress;
	
  //  const wbnbaddress = await bakeryfactory.methods.WBNB().call();
//	console.log('wbnbwaddress', wbnbaddress); 
	let newpairAddress = await bakeryfactory.methods.getPair(WbnbAddress, turboAddress);
	console.log('new pair ', newpairAddress);
	const BNB_Tbusd_lpaddress = "0x98D58Cef7c01F9409f5b8B50e7e965077f276656"; // BNB/TBUSD
	const BNB_Turbo_lpaddress = "0x82098c05D3856B6efd754072A936f4715d374Abc";
	const Tbusd_Turbo_lpaddress = "0x3ffa0b38a1830440eFdFCB2Aee49B49E55C41a3e";
	newpairAddress = BNB_Turbo_lpaddress;
	
	console.log('new pair ', newpairAddress);
	const newpair = new web3.eth.Contract(BakeryPairabi, newpairAddress);
	
	var BN = web3.utils.BN;
   
	let token0 = await newpair.methods.token0().call();
	console.log('token0', token0);
	let token1 = await newpair.methods.token1().call();
	console.log('token1', token1);
	const total_supply = await newpair.methods.totalSupply().call();
	console.log ('total_supply', total_supply/1e18);
	turboAddress = token0 == WbnbAddress ? token1 : token0;

	let amount = 1e18; let token0_price; let token1_price; let firstprice;
	let path = [turboAddress, WbnbAddress];
	path = [turboAddress, WbnbAddress];
	firstprice = await bakeryrouter.methods.getAmountsOut(amount.toString(), path).call();
	path = [ WbnbAddress, tbusdAddress];
	turbo_price = await bakeryrouter.methods.getAmountsOut(firstprice[1].toString(), path).call();
	console.log('turbo_price',parseInt(turbo_price[1])/1e18);
	if ( token0 != WbnbAddress) {
	  path = [token0, WbnbAddress];
	  firstprice = await bakeryrouter.methods.getAmountsOut(amount.toString(), path).call();
	  path = [ WbnbAddress, tbusdAddress];
	  token0_price = await bakeryrouter.methods.getAmountsOut(firstprice[1].toString(), path).call();
	  console.log('token0_price',parseInt(token0_price[1])/1e18);
	}
	if ( token0 == WbnbAddress)
	  path = [WbnbAddress, tbusdAddress];
	  token0_price = await bakeryrouter.methods.getAmountsOut(amount.toString(), path).call();
	  console.log('bnb_price', parseInt(token0_price[1])/1e18);
    
	if ( token1 != WbnbAddress) {
	  path = [token1, WbnbAddress];
	  firstprice = await bakeryrouter.methods.getAmountsOut(amount.toString(), path).call();
	  path = [ WbnbAddress, tbusdAddress];
	  token1_price = await bakeryrouter.methods.getAmountsOut(firstprice[1].toString(), path).call();
	  console.log('token1_price', parseInt(token1_price[1])/1e18);
	}
	if ( token1 == WbnbAddress)
	  path = [WbnbAddress, tbusdAddress];
	  token0_price = await bakeryrouter.methods.getAmountsOut(amount.toString(), path).call();
	  console.log('bnb_price', parseInt(token0_price[1])/1e18);
    
	
  
	let reserves = await newpair.methods.getReserves().call();
	console.log('new pair reserves','0', reserves[0]/1e18,'1', reserves[1]/1e18);
	// let reserve_turbo = token0 == WbnbAddress ? reserves[1] : reserves[0];
	// let reserve_bnb = token0 == WbnbAddress ? reserves[0] : reserves[1];
	// let total_supply_value = (reserve_turbo /1e18 * turbo_price[1] ) + (reserve_bnb /1e18 * bnb_price[1] );
	let total_supply_value = (reserves[0] /1e18 * token0_price[1] ) + (reserves[1] /1e18 * token1_price[1] );
	console.log('tot supply value', total_supply_value/1e18);
	const oneLp_price = total_supply_value / total_supply;
	console.log('one lp price', oneLp_price);
    let lp_staked = 10 // exemple
	let lp_staked_value = lp_staked * oneLp_price * 1e18;
	let rewards_value = rewards_peryear * turbo_price[1]/1e18;
	console.log('rewards value', rewards_value);
	let apy = multiplier * 100 * rewards_value / lp_staked_value;
	console.log('apy',apy);
	return apy;
}	catch  (e) {console.log('erreur apy', e)}

}
  get_api_for_turbotTESTnet(1);
  
  
