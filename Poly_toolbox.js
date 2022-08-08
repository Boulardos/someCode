const Web3 = require('web3');
const BN = require('bn.js');
require('dotenv').config(); 




const HDWalletProvider = require('@truffle/hdwallet-provider');
const myaccount = "0xD3378cc43c7Ef51bFcbD924E6028B495994dCA71";

const provider = new HDWalletProvider(process.env.BOTprivK,'https://polygon-rpc.com');
const web3 = new Web3(provider);


// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ws-nd-123-456-789.p2piwss://hidden-holy-sky.bsc.quiknode.pro/094839c7022833d5798706d9311e32c7aef24f07/fy.com/3c6e0b8a9c15224a8228b9a98ca1531d'));
// web3.eth.getBlockNumber().then(console.log);

// const web3 = new Web3('https://hidden-holy-sky.bsc.quiknode.pro/094839c7022833d5798706d9311e32c7aef24f07/');
// const web3 = new Web3('wss://hidden-holy-sky.bsc.quiknode.pro/094839c7022833d5798706d9311e32c7aef24f07/');

// web3.eth.getBlock('latest').then(answer => console.log(answer))

web3.eth.getBlockNumber().then(blockNum => console.log('last block',blockNum))
	

const erc20 = require ('@studydefi/money-legos/erc20');
const Bep20abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const factoryabi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const routerabi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
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

const routerAddress = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
const factoryAddress = "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32";
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
var url = "wss://solitary-proud-pine.matic.quiknode.pro/aa715a130c80d2fed707cb57834359cfc964a6b4/";
// wss://avax-ws.lirax.app:8443
// wss://speedy-nodes-nyc.moralis.io/1a2b3c4d5e6f1a2b3c4d5e6f/avalanche/mainnet/ws
let grasshopper;
const pcsAbi = new ethers.utils.Interface(routerabi);
const usdc = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const wmatic = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
let token = '0x3cFA087AA1A74e18676a875de69c49563AFA803D'; 

var init = function () {
  
  let matticAdded;
  var BN = web3.utils.BN;
  let customWsProvider = new ethers.providers.WebSocketProvider(url);
  grasshopper = 0;
  customWsProvider.on("pending", (txHash) => {
    customWsProvider.getTransaction(txHash)
	.then(async(tx) =>
	//   {
    //   console.log(tx);
	//   console.log('tx addresse to________', ethers.utils.getAddress(tx.to));
	//   const re1 = new RegExp("^0xf305d719");
    //    }

	
	{  
        if (grasshopper === 0) {
          console.log("🚧  And, Yes..I am actually working...trust me...");
          grasshopper = 1;
        }
        if (tx && tx.to) {
          if (ethers.utils.getAddress(tx.to) === 
              ethers.utils.getAddress(routerAddress)){
		    // console.log('tx pcs router pending');		  
            const re1 = new RegExp("^0xfb3bdb41"); // addliquidityETH
            const re2 = new RegExp("^0xe8e33700"); // addliquidity
            // if (re1.test(tx.data) || re2.test(tx.data))
			if (re1.test(tx.data))
			 {
				console.log(' pcs router Addliquidity pending'); 
                const decodedInput = pcsAbi.parseTransaction({
                data: tx.data,
                value: tx.value,
              });
			  // console.log(decodedInput);
			  matticAdded = decodedInput.value.toString();
			  console.log('liquidity added in MATIC ', parseInt(matticAdded)/1e18);
			  console.log({
				function_name: decodedInput.name,
				amountBNB: decodedInput.value.toString(),
				from: tx.from,
				token0: decodedInput.args[0],
				token1: decodedInput.args[1],
				// erc20Value: Number(decodedInput.args[1])
			  });  
			  console.log('txHash', txHash);
              if ( 
                ethers.utils.getAddress(token) ===
                ethers.utils.getAddress(decodedInput.args[0]) 
				&&
				 parseInt(matticAdded) > 90000e18
              ) {
                customWsProvider.off("pending");
                // if (tokens.buyDelay > 0) {
                //   await Wait(tokens.buyDelay);
                // }
                //await BuyToken(tx);
				console.log('enough BNB liquidity added');
				let path = [wmatic, token];  
				let block = await web3.eth.getBlock('latest');
				let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,  
                let oneE18 = '1000000000000000000';
	            let oneE15 = '1000000000000000';
            	let amount = 10; // amount BNB  1000 = 1 BNB
            	let BNamount = new BN(amount).mul(new BN(oneE15)); 

				await router.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(10, path, myaccount, sellDeadline)
			     .send({from: myaccount, value: BNamount, gas: '2000000',
			     gasPrice: web3.utils.toWei("200", 'gwei'), chainId: 137});
				console.log('BUYING TOKEN____________________'); 
              }
            }
          }
        }
      }).catch(() => {});
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

// init();



const buynewToken = async (newTokenaddress) => { 
try {	
    out = true;
	var BN = web3.utils.BN;

	const pairAddress = await factory.methods.getPair(newTokenaddress, wmatic).call();
	
    console.log("paire address:", pairAddress);
	let oneE18 = '1000000000000000000';
	let oneE15 = '1000000000000000';
	let amount = 8; // amount BNB  1000 = 1 BNB
	let BNamount = new BN(amount).mul(new BN(oneE15));
    
   if ( pairAddress != "0x0000000000000000000000000000000000000000") {
	  const pair = new web3.eth.Contract(uniswapV2pairabi, pairAddress);
	 
	  let reserve = await pair.methods.getReserves().call();
	  let pair_bnb_amount;
	  const address0 = await pair.methods.token0().call();
	  pair_bnb_amount = address0 == wmatic ? reserve[0] : reserve[1];
      console.log( "reserve matic:", pair_bnb_amount/1e18);

      if ( parseInt(pair_bnb_amount) > 90e18) { 
        var path = [wmatic, newTokenaddress];  
        let block = await web3.eth.getBlock('latest');
        let sellDeadline = block.timestamp + 300; // adding 5 min(300) - unix time,   
		let min = '200';
		min = new BN(min);
		console.log('sennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnd TX');

	    
        
        // await router.methods.swapExactETHForTokens(10, path, myaccount, sellDeadline)
        //     .send({from: myaccount, value: BNamount, gas: '2000000',
        //      gasPrice: web3.utils.toWei("5", 'gwei'), chainId: 137});	

		// await router.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(10, path, myaccount, sellDeadline)
		// 	 .send({from: myaccount, value: BNamount, gas: '2000000',
		// 	 gasPrice: web3.utils.toWei("50", 'gwei'), chainId: 137});	
		// console.log('TX sent');

		// await router.methods.swapExactTokensForTokens(BNamount, min, path, myaccount, sellDeadline)
        //      .send({from: myaccount, gas:'2000000', gasPrice: web3.utils.toWei("5", 'gwei')});	
        // console.log('tx done');            
             
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
    if (!out) {buynewToken(token)} /* else {console.log('out =', out)} */
}
, 2000); 

// let tx;
// web3_filter= web3.eth.filter('pending')

//     let transaction_hashes = web3.eth.getFilterChanges(web3_filter.filter_id)

//     for tx in transaction_hashes:

//         Datatx = web3.eth.getTransaction(tx)


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











