# Monitoring of ETH/USD, LINK/ETH, USDT/ETH, BTC/USD trade price.

## Preparing
```
npm install alchemy-sdk
npm install web3
npm install ethers
```

## Usage
```
node index.js <ALCHEMY TOKEN>
```

## Sample of usage:
```
> node index.js CuStOmAlChEmYtOkEn
2022-11-18T06:14:23.000Z    [latestAnswer]    LINK/ETH    0.005145982794835123
2022-11-18T09:55:35.000Z    [latestAnswer]    BTC/USD     16723.36
2022-11-18T10:29:59.000Z    [latestAnswer]    ETH/USD     1220.78
2022-11-18T07:57:59.000Z    [latestAnswer]    USDT/ETH    0.000823404448030828
2022-11-18T10:31:35.000Z    [AnswerUpdated]    BTC/USD     16808.07948943
2022-11-18T10:55:47.000Z    [AnswerUpdated]    BTC/USD     16750.3239319
2022-11-18T10:56:23.000Z    [AnswerUpdated]    ETH/USD     1218.7725
2022-11-18T10:59:47.000Z    [AnswerUpdated]    ETH/USD     1218.24331564
2022-11-18T11:05:23.000Z    [AnswerUpdated]    ETH/USD     1218.031
```

## Explanation

Connects to contract oracle via web3 API. For getting last block info calls latestAnswer method, for subscribing for price updates calls ```Alchemy.ws.on``` for ```aggregator``` address and ```AnswerUpdated(int256,uint256,uint256)``` event as topic. For more details of methods, see [contracts abi file](./config/abi.json).

