const { Network, Alchemy } = require("alchemy-sdk");
const Web3 = require('web3');
const fs = require('fs');
const { exit } = require("process");
const { ethers } = require("ethers");

main();

async function main() {
  if (process.argv.length != 3) {
    console.log("USAGE: node index.js TOKEN")
    exit(1)
  }

  const token = process.argv[2]

  const settings = {
    apiKey: token,
    network: Network.ETH_MAINNET
  };
  const alchemy = new Alchemy(settings)
  const web3 = new Web3("https://eth-mainnet.g.alchemy.com/v2/" + token)
  const abi = JSON.parse(fs.readFileSync('config/abi.json', 'utf-8'))

  listeningContracts = new Map([
    ["ETH/USD ", "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"],
    ["LINK/ETH", "0xdc530d9457755926550b59e8eccdae7624181557"],
    ["USDT/ETH", "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46"],
    ["BTC/USD ", "0xf4030086522a5beea4988f8ca5b36dbc97bee88c"]
  ])

  timestamp2Date        = timestamp => new Date(timestamp * 1000)

  convert2OriginalUnit  = function (price, decimals) {
    return price / (10 ** decimals)
  }

  printLog              = function(time, type, tokensPairName, price) {
    console.log("%s    [%s]    %s    %f",
                time,
                type,
                tokensPairName,
                price
    )
  }

  listeningContracts.forEach(async function(oracleFeed, tokensPairName) {
    const contract = await new web3.eth.Contract(abi, oracleFeed)
    const answer = await contract.methods.latestAnswer().call()
    const time = await contract.methods.latestTimestamp().call()
    const decimals = await contract.methods.decimals().call()
    const aggregator = await contract.methods.aggregator().call()

    printLog(timestamp2Date(time),
              "latestAnswer",
              tokensPairName,
              convert2OriginalUnit(answer, decimals)
    )

    alchemy.ws.on(
      {
        address: aggregator,
        topics: [
          ethers.utils.id("AnswerUpdated(int256,uint256,uint256)")
        ]
      },
      log => {
        printLog(timestamp2Date(web3.utils.hexToNumber(log.data)),
                  "AnswerUpdated",
                  tokensPairName,
                  convert2OriginalUnit(web3.utils.hexToNumber(log.topics[1]), decimals))
      }
    );
  });
}


