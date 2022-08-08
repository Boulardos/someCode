const Web3 = require('web3');
const BN = require('bn.js');
require('dotenv').config(); 

// const web3 = new Web3 (
//     new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/262187caeacd4fe8ad8e761bfb3665e2')
// );
// var Tx = require("ethereumjs-tx");
// const myaccount = "0xcbdbf7A101Bb22F5a26E0d7C7360210C6826b1Ac";
// const privateKey = Buffer.from("F2E5F.....................", "hex");


const HDWalletProvider = require('@truffle/hdwallet-provider');
const myaccount = "0xD3378cc43c7Ef51bFcbD924E6028B495994dCA71";


const provider = new HDWalletProvider(process.env.BOTprivK, 'https://rpc-mainnet.maticvigil.com');
const web3 = new Web3(provider);

const erc20 = require ('@studydefi/money-legos/erc20');
const Bep20abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const factoryabi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const routerabi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

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
		"name": "totalSupply",
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

const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const factoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const cakeAddress = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";
const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const ethAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
const learnAddress = '0xe980166dfccbb85723ae47da787183c43d11fbda';
const wbnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const Tokenaddress = "0x2bE5c3870285DC65b31412Fc5a16a8F0cF8DF4e2"; // NWC
// const newTokenaddress = "0x2cc26dd730F548dc4ac291ae7D84a0C96980d2cB"; // pizza
let turbov2 = '0xe4a43f8Bdaf4fC6a3b118A5448983fe783724BC8';

const cake = new web3.eth.Contract(Bep20abi, cakeAddress);
const newToken = new web3.eth.Contract(Bep20abi, Tokenaddress);
const router = new web3.eth.Contract(routerabi, routerAddress);
const factory = new web3.eth.Contract(factoryabi, factoryAddress);


var out = false; 
let PAIRS = [];
let pairevents = [];



var ethers = require("ethers");
var url = "wss://mainnet.infura.io/ws/v3/262187caeacd4fe8ad8e761bfb3665e2";

var init = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url);
  
  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(function (transaction) {
      console.log(transaction);
    });
  });

  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

init();



const balance = async () => {
    let bal =  await cake.methods.balanceOf('0x1628E66dF4752C670b430E6ac087Ab1B3D6b35b2').call();
    console.log('bal', bal);
}
// balance();




const btd = '0xD1102332a213E21faF78B69C03572031F3552c33';
const turbo = '0xe4a43f8Bdaf4fC6a3b118A5448983fe783724BC8';
let learnT = '0xe980166DfcCbB85723AE47dA787183c43d11FBda';


async function getLiquidity(tokenA) {

	var pairBnbAddress = await factory.methods.getPair(tokenA, wbnbAddress).call(); 
	var pairBusdAddress = await factory.methods.getPair(tokenA, busdAddress).call(); 
   
    let pairBnb = new web3.eth.Contract(uniswapV2pairabi, pairBnbAddress);
	let pairBusd = new web3.eth.Contract(uniswapV2pairabi, pairBusdAddress);

	let reservePairBnb = await pairBnb.methods.getReserves().call();
	let token0 = await pairBnb.methods.token0().call();
	let reserveBnb = token0 == wbnbAddress ?  reservePairBnb[0] : reservePairBnb[1];

	let reservePairBusd = await pairBusd.methods.getReserves().call();
	token0 = await pairBusd.methods.token0().call();
	let reserveBusd = token0 == busdAddress ?  reservePairBusd[0] : reservePairBusd[1];

	console.log('reserve pool BNB', reserveBnb/1e18);
	console.log('reserve pool BUSD', reserveBusd/1e18);
}
//  getLiquidity(cakeAddress);


// UNISWAP POLYGONE
const router23abi = [{"inputs":[{"internalType":"address","name":"_factoryV2","type":"address"},{"internalType":"address","name":"factoryV3","type":"address"},{"internalType":"address","name":"_positionManager","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveMax","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveMaxMinusOne","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveZeroThenMax","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveZeroThenMaxMinusOne","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"callPositionManager","outputs":[{"internalType":"bytes","name":"result","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"paths","type":"bytes[]"},{"internalType":"uint128[]","name":"amounts","type":"uint128[]"},{"internalType":"uint24","name":"maximumTickDivergence","type":"uint24"},{"internalType":"uint32","name":"secondsAgo","type":"uint32"}],"name":"checkOracleSlippage","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint24","name":"maximumTickDivergence","type":"uint24"},{"internalType":"uint32","name":"secondsAgo","type":"uint32"}],"name":"checkOracleSlippage","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"}],"internalType":"struct IV3SwapRouter.ExactInputParams","name":"params","type":"tuple"}],"name":"exactInput","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct IV3SwapRouter.ExactInputSingleParams","name":"params","type":"tuple"}],"name":"exactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"}],"internalType":"struct IV3SwapRouter.ExactOutputParams","name":"params","type":"tuple"}],"name":"exactOutput","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct IV3SwapRouter.ExactOutputSingleParams","name":"params","type":"tuple"}],"name":"exactOutputSingle","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factoryV2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getApprovalType","outputs":[{"internalType":"enum IApproveAndCall.ApprovalType","name":"","type":"uint8"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"}],"internalType":"struct IApproveAndCall.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"bytes","name":"result","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"internalType":"struct IApproveAndCall.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"bytes","name":"result","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"previousBlockhash","type":"bytes32"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"positionManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"pull","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"sweepTokenWithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"sweepTokenWithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"unwrapWETH9WithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"unwrapWETH9WithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"wrapETH","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const Router23addr = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const FactoryV3addr = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const FactoryV2addr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const factory2 = new web3.eth.Contract(factoryabi, FactoryV2addr);

const router23 = new web3.eth.Contract(router23abi, Router23addr);

const learn = "0xe980166DfcCbB85723AE47dA787183c43d11FBda"; 
const meowth = "0xe561479bebee0e606c19bb1973fc4761613e3c42";
let newtoken = "0xc0fe33b654d13af5a72c47dc5a370674ba85b3e6";
 newtoken = cakeAddress;
const usdcPoly = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const aavePoly = "0xD6DF932A45C0f255f85145f286eA0b292B21C90B";
const mechaPoly = "0xaCd4E2d936Be9B16c01848A3742A34B3D5A5bDfa";

// web3.eth.sendTransaction({to:"0x9133F68392A8Dc204Fa8DD2e023642D769a24096", from: Dittoaccount, value: web3.utils.toWei("0.0002", "ether")});

const buynewTokenWithEth = async (newTokenaddress) => { 
try {	
    out = true;
	var BN = web3.utils.BN;

	const pairAddress = await factory.methods.getPair(newTokenaddress, wbnbAddress).call();
	
    console.log("paire address:", pairAddress);
	let oneE18 = '1000000000000000000';
	let oneE15 = '1000000000000000';
	let amount = 80; // amount BNB  1000 = 1 BNB
	let BNamount = new BN(amount).mul(new BN(oneE15));
    
   if ( pairAddress != "0x0000000000000000000000000000000000000000") {
	  const pair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);
	 
	  let reserve = await pair.methods.getReserves().call();
	  let pair_bnb_amount;
	  const address0 = await pair.methods.token0().call();
	  pair_bnb_amount = address0 == wbnbAddress ? reserve[0] : reserve[1];
      console.log( "reserve bnb:", pair_bnb_amount/1e18);

      if ( parseInt(pair_bnb_amount) > 90e18) { 
        var path = [wbnbAddress, newTokenaddress];  
        let block = await web3.eth.getBlock('latest');
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
		let min = '200';
		min = new BN(min);
		console.log('TX sennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt');

	    // await router.methods.swapExactTokensForTokens(BNamount, min, path, Dittoaccount, sellDeadline)
        //      .send({from: Dittoaccount, gas:'2000000', gasPrice: web3.utils.toWei("10", 'gwei')});	
        
        // await router.methods.swapExactETHForTokens(BNamount, path, myaccount, sellDeadline)
        //     .send({from: myaccount, value: BNamount, gas: '2000000',
        //      gasPrice: web3.utils.toWei("5", 'gwei')});	

		await router.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(BNamount, path, myaccount, sellDeadline)
			 .send({from: myaccount, value: BNamount, gas: '2000000',
			 gasPrice: web3.utils.toWei("5", 'gwei')});	

        console.log('tx done');            
             
	   } else {out = false} 
	 
	//    else if (  parseInt(pair_bnb_amount) < 40e18 && parseInt(pair_bnb_amount) > 10e18)  { 
	// 	out = true;  // tx triggered
    //     amount = 0.1e18;
    //     var path = [wbnbAddress, newTokenaddress];  
    //     let block = await web3.eth.getBlock('latest');
    //     let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	//     // await router.methods.swapExactTokensForTokens(amountIn.toString(), 1000, path, Dittoaccount, sellDeadline)
    //     //      .send({from: Dittoaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')});	
    //     console.log('cest parti');
    //     await router.methods.swapExactETHForTokens(amount.toString(), path, Dittoaccount, sellDeadline)
    //         .send({from: Dittoaccount, value: amount.toString(), gas: '2000000',
    //          gasPrice: web3.utils.toWei("20", 'gwei')});	 
    //     console.log('tx done');            
             
	//    }        

  }
} catch (e) {console.log(e)}
}
// buynewToken(cakeAddress);

setInterval(function()  { 
    if (!out) {buynewTokenWithEth(newtoken)} else {console.log('out =', out)} 
}
, 10000000000); 


const buynewToken = async (newTokenaddress) => { 
    try {	
        out = true;
        var BN = web3.utils.BN;
    
        const pairAddress = await factory2.methods.getPair(usdcPoly, aavePoly).call();
        console.log("paire address:", pairAddress);
        
        let oneE18 = '1000000000000000000';
        let oneE15 = '1000000000000000';
        let oneE3 = '1000';
        let amount = 80; // amount BNB  1000 = 1 BNB
        let BNamount = new BN(amount).mul(new BN(oneE15));
        BNamount = new BN(amount).mul(new BN(oneE3)); // FOR USDC
        
       if ( pairAddress != "0x0000000000000000000000000000000000000000") {
          const pair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);
         
          let reserve = await pair.methods.getReserves().call();
          let pair_token0_amount;
          const address0 = await pair.methods.token0().call();
          pair_token0_amount = address0 == newTokenaddress ? reserve[0] : reserve[1];
          console.log( "reserve token to buy:", pair_token0_amount/1e18);
          // const tokenIn = address0 == newTokenaddress ? token0 : token1
          console.log('address 0', address0);

    
          if ( parseInt(pair_bnb_amount) > 90e18) { 
            var path = [usdcPoly, newTokenaddress];  
            let block = await web3.eth.getBlock('latest');
            let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
            let min = '20';
            min = new BN(min);
            console.log('TX sennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt');


            // await router23.methods.ExactInputSingle(
            //     usdcPoly,
            //     aavePoly,
            //     3000, // 0.3%
            //     myaccount,
            //     sellDeadline,
            //     BNamount,
            //     0,
            //     0
            // ).send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("30", 'gwei')});

    
            // await router23.methods.swapExactTokensForTokens(BNamount, min, path, myaccount, sellDeadline)
            //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("30", 'gwei')});	
            
            // await router.methods.swapExactETHForTokens(BNamount, path, myaccount, sellDeadline)
            //     .send({from: myaccount, value: BNamount, gas: '2000000',
            //      gasPrice: web3.utils.toWei("5", 'gwei')});	
    
            // await router.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(BNamount, path, myaccount, sellDeadline)
            //      .send({from: myaccount, value: BNamount, gas: '2000000',
            //      gasPrice: web3.utils.toWei("5", 'gwei')});	
    
            // console.log('tx done');            
                 
           } else {out = false} 
               
    
      }
    } catch (e) {console.log(e)}
    }
    
    setInterval(function()  { 
        if (!out) {buynewToken(aavePoly)} else {console.log('out =', out)} 
    }
    , 300000000); 
    





let block = 8116872 ; // last check !!! demarrer d'un block recent sinon error

const get_newpairs = async () => {
	console.log('searching new Pools');	
	let reserveBNB; let reserveToken; let tokenAddress;
	pairevents = await factory.getPastEvents('PairCreated',{fromBlock: block});
	console.log('pair events length', pairevents.length);
	// console.log(pairevents);
	const blockObj = await web3.eth.getBlock('latest');
	console.log('last block', blockObj.number);
	if ( pairevents.length > 0) {
	// console.log(pairevents);
	const index = pairevents.length - 1;
	let token0 = pairevents[index].returnValues.token0;
	let token1 = pairevents[index].returnValues.token1;
	console.log('token0', token0,'token1', token1);
	let pair = pairevents[index].returnValues.pair;
	const newpair = new web3.eth.Contract(uniswapV2pairabi, pair);
	let reserves = await newpair.methods.getReserves().call();
	
	  if ( token0 == wbnbAddress || token1 == wbnbAddress) {
		reserveBNB = token0 == wbnbAddress ? reserves[0] : reserves[1];
		reserveToken = token0 == wbnbAddress ? reserves[1] : reserves[0];
		tokenAddress = token0 == wbnbAddress ? token1 : token0;
		console.log('new pair reserves: ','BNB', reserveBNB/1e18,'Token', reserveToken/1e18);
        await buynewToken(tokenAddress);

		//let reserveBUSD = token0 == busdAddress ? reserves[0] : reserves[1];
		//console.log('reserve BNB', parseInt(reserveBNB)/1e18, 'token address',tokenAddress );
	  }
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
  
  // return tokenAddress;
  
  }
  // setInterval (get_newpairs, 5000);



const buynewTokenatBLock = async () => {
    out = 1;
    let newTokenaddress = "0x2090c8295769791ab7A3CF1CC6e0AA19F35e441A";
  //  newTokenaddress = cakeAddress;
  //  console.log(wbnbAddress);
 //   const pairAddress = await factory.methods.getPair(cakeAddress, wbnbAddress).call();
 //   console.log("paire address:", pairAddress);
    const amount = 2e18; 
    let block = await web3.eth.getBlock('latest');
    console.log(block.number);
    const atblock = 2866144;  // 2866144

   if ( block.number == atblock) {
      
        // await dai.methods.approve(routerAddress, amount.toString())
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')}); 

        var path = [wbnbAddress, newTokenaddress];  
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	    // await router.methods.swapExactTokensForTokens(amountIn.toString(), 1000, path, myaccount, sellDeadline)
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')});	
        console.log('send txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        await router.methods.swapExactETHForTokens(amount.toString(), path, myaccount, sellDeadline)
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
    //  const wbnbAddress = await router.methods.WETH().call();
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



const get_apr_for_turbo = async (tokenA, tokenB) => {
try {	
//   const ltc_bnb_pair = "0xbc765fd113c5bdb2ebc25f711191b56bb8690aec";
//   const busd_bnb_pair = "0x1B96B92314C44b159149f7E0303511fB2Fc4774f";
//   const bnb_eth_pair = "0x70d8929d04b60af4fb9b58713ebcf18765ade422";
//   const ltcAddress = "0x4338665cbb7b2485a8855a139b75d5e34ab0db94";	
   
  
  let turboAddress = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'; // cake 
  const multiplier = '10';
  oneyear_rewards = 1000; // tokens distribuées sur 1 an
  var BN = web3.utils.BN; const oneE18 = web3.utils.toWei('1','ether'); 
  const cent = '100'; const mille = '1000'; let tokenA_price; let tokenB_price;
  var pairAddress = await factory.methods.getPair(tokenA, tokenB).call(); // ne fonctionne pas
  console.log('getPair', pairAddress);
  //   var pairAddress = await GetPair(tokenA,tokenB);
  //   console.log('paire',pairAddress);
  
  let  newpair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);
  let lp_deposits = 100e18; // provisoir
  // lp_deposits = await newpair.balanceOf(farmContract).call();
 
  token0 = await newpair.methods.token0().call();
  console.log('token0', token0);
  token1 = await newpair.methods.token1().call();
  console.log('token1', token1);
  

  let path = [turboAddress, wbnbAddress];
  let amount = 1e18;
  let firstprice = await router.methods.getAmountsOut(amount.toString(), path).call();
  path = [ wbnbAddress, busdAddress];
  let turbo_price = await router.methods.getAmountsOut(firstprice[1].toString(), path).call();
  console.log('turbo_price',parseInt(turbo_price[1])/1e18);

  path = [wbnbAddress, busdAddress];
  let bnb_price = await router.methods.getAmountsOut(amount.toString(), path).call();
  console.log('bnb_price',parseInt(bnb_price[1])/1e18);

  if ( tokenA != wbnbAddress) {
  path = [tokenA, wbnbAddress];
  amount = 1e18;
  firstprice = await router.methods.getAmountsOut(amount.toString(), path).call();
  path = [ wbnbAddress, busdAddress];
  tokenA_price = await router.methods.getAmountsOut(firstprice[1].toString(), path).call();
  }

  if ( tokenB != wbnbAddress) {
  path = [tokenB, wbnbAddress];
  amount = 1e18;
  firstprice = await router.methods.getAmountsOut(amount.toString(), path).call();
  path = [ wbnbAddress, busdAddress];
  tokenB_price = await router.methods.getAmountsOut(firstprice[1].toString(), path).call();
  }

  if (tokenA == wbnbAddress) {tokenA_price = bnb_price}
  if (tokenB == wbnbAddress) {tokenB_price = bnb_price}
  console.log('tokenA price ', tokenA_price[1]/1e18);
  console.log('tokenB price ', tokenB_price[1]/1e18);

  const totsupply = await newpair.methods.totalSupply().call();
  console.log ('total totsupply', totsupply/1e18);
  let reserves = await newpair.methods.getReserves().call();
  console.log('new pair reserves','0', reserves[0]/1e18,'1', reserves[1]/1e18);
  let tokenA_reserve = token0 == tokenA ? reserves[0] : reserves[1];
  let tokenB_reserve = token0 == tokenB ? reserves[0] : reserves[1];

  let value1 = new BN(tokenA_reserve).mul( new BN(tokenA_price[1])).div(new BN(oneE18));
  let value2 = new BN(tokenB_reserve).mul(new BN(tokenB_price[1]).div(new BN(oneE18)));
  console.log(parseInt(value1), parseInt(value2));
  let totalsupply_value = value1.add(value2);
  console.log('totalsupply value ', parseInt(totalsupply_value)/1e18);
  let oneLp_price = new BN(mille).mul(totalsupply_value).div(new BN(totsupply));
  oneLp_price = parseInt(oneLp_price)/1000;
  console.log('1 lp price',parseInt(oneLp_price));

//   totalsupply_value = 2 * tokenA_reserve / 1e18 * tokenA_price[1]; 
//   oneLp_price = totalsupply_value / totsupply;
//   console.log('1 lp price',parseInt(oneLp_price));

  let rewards_value = new BN(oneyear_rewards.toString()).mul(new BN(turbo_price[1]));
  console.log('rewards value',parseInt(rewards_value));
  //let deposits_value = new BN(lp_deposits.toString()).mul(oneLp_price);
  let deposits_value = lp_deposits * oneLp_price;
  console.log('deposit value',deposits_value);
  let apr = new BN(multiplier).mul(new BN(cent)).mul(rewards_value).div(new BN(deposits_value.toString()));

  let test = new BN(multiplier).mul(new BN(cent));
  test = rewards_value.div(new BN(deposits_value.toString()));
  test =  parseInt(rewards_value) / deposits_value;
  console.log('test', test.toString());

  console.log('apr',parseInt(apr));
  let result = [apr, oneLp_price];
  return result;
} catch (e) {console.log(e)};
}
//  get_apr_for_turbo(busdAddress, turbov2); 


const add_turbo_liquidity = async () => {
	let amountTurbo = 10e15;
	let amountBNB = 1e15;
	const TurboAddress = "0x2E4AaE16BD6A41c52d20210de5b678bE1C602347";
	const Turbo = new web3.eth.Contract(Bep20abi, TurboAddress);
	let block = await web3.eth.getBlock('latest');
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
          
	    // await router.methods.swapExactTokensForTokens(amountIn.toString(), 1000, path, myaccount, sellDeadline)
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("90", 'gwei')});	
        console.log('cest parti');
		await Turbo.methods.approve(routerAddress, amountTurbo.toString())
		     .send({from: myaccount, gas: '4000000', gasPrice: web3.utils.toWei("20", 'gwei')});	

        await router.methods.addLiquidityETH(TurboAddress, amountTurbo.toString(), 1000, 1000, myaccount, sellDeadline)
            .send({from: myaccount, value: amountBNB.toString(), gas: '4000000',
             gasPrice: web3.utils.toWei("20", 'gwei')})
			.catch( e => {console.log('erreeuur', e)});	 

        console.log('tx done');            
}
// add_turbo_liquidity();



async function get_tvl(farming_address, tokenA, tokenB) {
	// farm = new web3.eth.Contract(abi, faarming_address);
	var pairAddress = await factory.methods.getPair(tokenA, tokenB).call(); // ne fonctionne pas
    console.log('getPair', pairAddress);
    let pair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);
	let balance_lp = await pair.methods.balanceOf(farming_address).call();
	let data = await get_apr_for_turbo(tokenA, tokenB);
	let oneLp_price = data[1];
	console.log('lp price', oneLp_price/1e18);
	balance_lp = balance_lp/1e18;
	// oneLp_price = oneLp_price/1e18;
	balance_lp = 10; // for test
	let tvl = balance_lp * oneLp_price;
	console.log('tvl', tvl);
	return tvl;
}


async function  turbo_events() {

	let block = 5550000;
	const farmingAddress = "0xdf7852d15877BA6B475427AbFA6d3682C4b0406f";
	const farmingabi = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "RewardsDisbursed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "holder",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "RewardsTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "end",
					"type": "uint256"
				}
			],
			"name": "turboEnd",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "start",
					"type": "uint256"
				}
			],
			"name": "turboStart",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "addContractBalance",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "adminCanClaimAfter",
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
			"name": "adminClaimableTime",
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
			"name": "claim",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "contractBalance",
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
			"name": "contractDeployTime",
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
					"internalType": "uint256",
					"name": "amountToDeposit",
					"type": "uint256"
				}
			],
			"name": "deposit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "depositTime",
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
					"name": "",
					"type": "address"
				}
			],
			"name": "depositedTokens",
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
			"name": "disburseAmount",
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
			"name": "disburseDuration",
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
			"name": "disbursePercentX100",
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
					"internalType": "uint256",
					"name": "amountToWithdraw",
					"type": "uint256"
				}
			],
			"name": "emergencyWithdraw",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "endTurbo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "startIndex",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "endIndex",
					"type": "uint256"
				}
			],
			"name": "getDepositorsList",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "stakers",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "stakingTimestamps",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256[]",
					"name": "lastClaimedTimeStamps",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256[]",
					"name": "stakedTokens",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_holder",
					"type": "address"
				}
			],
			"name": "getEstimatedPendingDivs",
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
			"name": "getNumberOfHolders",
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
			"name": "getPendingDisbursement",
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
					"name": "_holder",
					"type": "address"
				}
			],
			"name": "getPendingDivs",
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
					"name": "",
					"type": "address"
				}
			],
			"name": "lastClaimedTime",
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
			"name": "lastDisburseTime",
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
					"name": "",
					"type": "address"
				}
			],
			"name": "lastDivPoints",
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
			"name": "maxSecTurboDuration",
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
			"name": "maxSecTurboStart",
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
			"name": "minSecTurboDuration",
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
			"name": "minSecTurboStart",
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
			"name": "owner",
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
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "setMultiplier",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "startTurbo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalClaimedRewards",
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
			"name": "totalDivPoints",
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
					"name": "",
					"type": "address"
				}
			],
			"name": "totalEarnedTokens",
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
			"name": "totalTokens",
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
			"name": "totalTokensDisbursed",
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
					"name": "_tokenAddr",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "transferAnyERC20Token",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_tokenAddr",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "transferAnyOldERC20Token",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "trustedDepositTokenAddress",
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
			"name": "trustedRewardTokenAddress",
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
			"name": "turboMode",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "turboMultiplier",
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
			"name": "turboStartTime",
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
					"internalType": "uint256",
					"name": "_minSecTurboDuration",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_maxSecTurboDuration",
					"type": "uint256"
				}
			],
			"name": "updaterandomTurboDuration",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_minSecTurboStart",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_maxSecTurboStart",
					"type": "uint256"
				}
			],
			"name": "updaterandomTurboStart",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "watchTurbo",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amountToWithdraw",
					"type": "uint256"
				}
			],
			"name": "withdraw",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];
	const farming = new web3.eth.Contract(farmingabi, farmingAddress);
	
	let events = await farming.getPastEvents('turboStart',{fromBlock: block});
	console.log(events);	
}
// turbo_events();

async function get_turbo_var() {
	const turboabi = [
		{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
		},
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
		"name": "previousOwner",
		"type": "address"
		},
		{
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
		}
		],
		"name": "OwnershipTransferred",
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
		"anonymous": false,
		"inputs": [
		{
		"indexed": false,
		"internalType": "address",
		"name": "sender",
		"type": "address"
		},
		{
		"indexed": false,
		"internalType": "address",
		"name": "recipient",
		"type": "address"
		},
		{
		"indexed": false,
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "followBalance",
		"type": "event"
		},
		{
		"inputs": [],
		"name": "TurboFeePercentX100",
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
		"name": "amount",
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
		"name": "_spender",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "_value",
		"type": "uint256"
		},
		{
		"internalType": "bytes",
		"name": "_extraData",
		"type": "bytes"
		}
		],
		"name": "approveAndCall",
		"outputs": [
		{
		"internalType": "bool",
		"name": "success",
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
		"name": "account",
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
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "account",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "burnFrom",
		"outputs": [],
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
		"name": "subtractedValue",
		"type": "uint256"
		}
		],
		"name": "decreaseAllowance",
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
		"inputs": [],
		"name": "devFeePercentX100",
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
		"name": "fees_wallet_Turbo",
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
		"name": "fees_wallet_dev1",
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
		"name": "fees_wallet_dev2",
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
		"inputs": [
		{
		"internalType": "address",
		"name": "spender",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "addedValue",
		"type": "uint256"
		}
		],
		"name": "increaseAllowance",
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
		"inputs": [],
		"name": "name",
		"outputs": [
		{
		"internalType": "string",
		"name": "",
		"type": "string"
		}
		],
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "owner",
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
		"name": "pcsFactory",
		"outputs": [
		{
		"internalType": "contract IUniswapV2Factory",
		"name": "",
		"type": "address"
		}
		],
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "pcsRouter",
		"outputs": [
		{
		"internalType": "contract IUniswapV2Router02",
		"name": "",
		"type": "address"
		}
		],
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "pcs_pair_addressBNB",
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
		"name": "pcs_pair_addressBUSD",
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
		"inputs": [
		{
		"internalType": "uint256",
		"name": "_TurboFeePercentX100",
		"type": "uint256"
		}
		],
		"name": "setTurboFeePercentX100",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "_fees_wallet_Turbo",
		"type": "address"
		}
		],
		"name": "setTurboFeeWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "lp",
		"type": "address"
		}
		],
		"name": "set_pcs_Bnbturbo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "lp",
		"type": "address"
		}
		],
		"name": "set_pcs_BusdTurbo",
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
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "totalSupply",
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
		"name": "recipient",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "amount",
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
		"name": "_tokenAddress",
		"type": "address"
		},
		{
		"internalType": "address",
		"name": "_to",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
		}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "_tokenAddress",
		"type": "address"
		},
		{
		"internalType": "address",
		"name": "_to",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
		}
		],
		"name": "transferAnyOldERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "sender",
		"type": "address"
		},
		{
		"internalType": "address",
		"name": "recipient",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "amount",
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
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
		}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		}
		];

	const farmingabi = [
		{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
		},
		{
		"anonymous": false,
		"inputs": [
		{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
		},
		{
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
		}
		],
		"name": "OwnershipTransferred",
		"type": "event"
		},
		{
		"anonymous": false,
		"inputs": [
		{
		"indexed": false,
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "RewardsDisbursed",
		"type": "event"
		},
		{
		"anonymous": false,
		"inputs": [
		{
		"indexed": false,
		"internalType": "address",
		"name": "holder",
		"type": "address"
		},
		{
		"indexed": false,
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "RewardsTransferred",
		"type": "event"
		},
		{
		"anonymous": false,
		"inputs": [
		{
		"indexed": false,
		"internalType": "uint256",
		"name": "end",
		"type": "uint256"
		}
		],
		"name": "turboEnd",
		"type": "event"
		},
		{
		"anonymous": false,
		"inputs": [
		{
		"indexed": false,
		"internalType": "uint256",
		"name": "start",
		"type": "uint256"
		}
		],
		"name": "turboStart",
		"type": "event"
		},
		{
		"inputs": [
		{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "addContractBalance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "adminCanClaimAfter",
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
		"name": "adminClaimableTime",
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
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "contractBalance",
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
		"name": "contractDeployTime",
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
		"internalType": "uint256",
		"name": "amountToDeposit",
		"type": "uint256"
		}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "",
		"type": "address"
		}
		],
		"name": "depositTime",
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
		"name": "",
		"type": "address"
		}
		],
		"name": "depositedTokens",
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
		"name": "disburseAmount",
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
		"name": "disburseDuration",
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
		"name": "disbursePercentX100",
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
		"name": "duree_turbo",
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
		"internalType": "uint256",
		"name": "amountToWithdraw",
		"type": "uint256"
		}
		],
		"name": "emergencyWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "endTurbo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "uint256",
		"name": "startIndex",
		"type": "uint256"
		},
		{
		"internalType": "uint256",
		"name": "endIndex",
		"type": "uint256"
		}
		],
		"name": "getDepositorsList",
		"outputs": [
		{
		"internalType": "address[]",
		"name": "stakers",
		"type": "address[]"
		},
		{
		"internalType": "uint256[]",
		"name": "stakingTimestamps",
		"type": "uint256[]"
		},
		{
		"internalType": "uint256[]",
		"name": "lastClaimedTimeStamps",
		"type": "uint256[]"
		},
		{
		"internalType": "uint256[]",
		"name": "stakedTokens",
		"type": "uint256[]"
		}
		],
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "_holder",
		"type": "address"
		}
		],
		"name": "getEstimatedPendingDivs",
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
		"name": "getNumberOfHolders",
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
		"name": "getPendingDisbursement",
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
		"name": "_holder",
		"type": "address"
		}
		],
		"name": "getPendingDivs",
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
		"name": "",
		"type": "address"
		}
		],
		"name": "lastClaimedTime",
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
		"name": "lastDisburseTime",
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
		"name": "",
		"type": "address"
		}
		],
		"name": "lastDivPoints",
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
		"name": "maxSecTurboDuration",
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
		"name": "maxSecTurboStart",
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
		"name": "minSecTurboDuration",
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
		"name": "minSecTurboStart",
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
		"name": "next_turbo",
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
		"name": "owner",
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
		"inputs": [
		{
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
		}
		],
		"name": "setMultiplier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "startTurbo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "totalClaimedRewards",
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
		"name": "totalDivPoints",
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
		"name": "",
		"type": "address"
		}
		],
		"name": "totalEarnedTokens",
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
		"name": "totalTokens",
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
		"name": "totalTokensDisbursed",
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
		"name": "_tokenAddr",
		"type": "address"
		},
		{
		"internalType": "address",
		"name": "_to",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
		}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "_tokenAddr",
		"type": "address"
		},
		{
		"internalType": "address",
		"name": "_to",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
		}
		],
		"name": "transferAnyOldERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
		}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "trustedDepositTokenAddress",
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
		"name": "trustedRewardTokenAddress",
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
		"name": "turboMode",
		"outputs": [
		{
		"internalType": "bool",
		"name": "",
		"type": "bool"
		}
		],
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "turboMultiplier",
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
		"name": "turboStartTime",
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
		"internalType": "uint256",
		"name": "_minSecTurboDuration",
		"type": "uint256"
		},
		{
		"internalType": "uint256",
		"name": "_maxSecTurboDuration",
		"type": "uint256"
		}
		],
		"name": "updaterandomTurboDuration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "uint256",
		"name": "_minSecTurboStart",
		"type": "uint256"
		},
		{
		"internalType": "uint256",
		"name": "_maxSecTurboStart",
		"type": "uint256"
		}
		],
		"name": "updaterandomTurboStart",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "watchTurbo",
		"outputs": [
		{
		"internalType": "bool",
		"name": "",
		"type": "bool"
		}
		],
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "uint256",
		"name": "amountToWithdraw",
		"type": "uint256"
		}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		}
		];	
	const turboAddress = '0xdAF49B7291850d8D201726aE4BE80cD5C29aE350';
	const farmingAddress = '0x26D6A1180356909C322a399969b33dc20B25Ff1A';
	const Turbo = new web3.eth.Contract(turboabi, turboAddress);
	const farming = new web3.eth.Contract(farmingabi, farmingAddress);
	let next = await farming.methods.duree_turbo().call();
	let end = await farming.methods.turboMode().call();
	console.log('var =', end);

}
// get_turbo_var();

async function circSupply() {
	
	const poolabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsDisbursed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"end","type":"uint256"}],"name":"turboEnd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"}],"name":"turboStart","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"addContractBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminCanClaimAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminClaimableTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractDeployTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToDeposit","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disburseAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disburseDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disbursePercentX100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTurbo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getDepositorsList","outputs":[{"internalType":"address[]","name":"stakers","type":"address[]"},{"internalType":"uint256[]","name":"stakingTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"lastClaimedTimeStamps","type":"uint256[]"},{"internalType":"uint256[]","name":"stakedTokens","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getEstimatedPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPendingDisbursement","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"}],"name":"getPendingDivs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDisburseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDivPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSecTurboDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSecTurboStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minSecTurboDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minSecTurboStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTurbo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalClaimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDivPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensDisbursed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddr","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddr","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferAnyOldERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trustedDepositTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trustedRewardTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"turboMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"turboMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"turboStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minSecTurboDuration","type":"uint256"},{"internalType":"uint256","name":"_maxSecTurboDuration","type":"uint256"}],"name":"updaterandomTurboDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minSecTurboStart","type":"uint256"},{"internalType":"uint256","name":"_maxSecTurboStart","type":"uint256"}],"name":"updaterandomTurboStart","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"watchTurbo","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
	const turboabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"followBalance","type":"event"},{"inputs":[],"name":"TurboFeePercentX100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devFeePercentX100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees_wallet_Turbo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees_wallet_dev2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pcsFactory","outputs":[{"internalType":"contract IUniswapV2Factory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pcsRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pcs_pair_addressBNB","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pcs_pair_addressBUSD","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_TurboFeePercentX100","type":"uint256"}],"name":"setTurboFeePercentX100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fees_wallet_Turbo","type":"address"}],"name":"setTurboFeeWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"lp","type":"address"}],"name":"set_pcs_Bnbturbo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"lp","type":"address"}],"name":"set_pcs_BusdTurbo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferAnyOldERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

	const turboaddress = "0xe4a43f8Bdaf4fC6a3b118A5448983fe783724BC8";
	const pool1addr = "0xe08BC1e21a19c8F294469cBFF9A1694108193d88";
	const pool2addr = "0xC50CD157e41e74eF0600625e23252A12948E05bb";
	const stakingaddr = "0x20BD1Bd385EBC39ccE83Ce32113092120ABb677F";
	const vestingaddr = "0x92663945cF8857cb26c0Ab0fe52972a11dc2e512";

	const pool1 = new web3.eth.Contract(poolabi, pool1addr);
	const pool2 = new web3.eth.Contract(poolabi, pool2addr);
	const staking = new web3.eth.Contract(poolabi, stakingaddr);
	const turbo = new web3.eth.Contract(turboabi, turboaddress);

	let l1 = await pool1.methods.contractBalance().call();
	let l2 = await pool2.methods.contractBalance().call();
	let ls = await staking.methods.contractBalance().call();
	let lv = await turbo.methods.balanceOf(vestingaddr).call();
	
	let CS = 1000000 - (parseInt(l1) + parseInt(l2) + parseInt(ls) + parseInt(lv))/1e18 - 17000;

	console.log(CS);
	
	return CS;
}
// circSupply()