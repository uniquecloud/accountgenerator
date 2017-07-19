# Operation Instructions
## Summary
This is an ethereum and bitcoin accounts generator,below are these instructions

## Bitcoin
- install docker
- docker pull amacneil/bitcoin
- docker network create bitcoin
- docker run -d --rm --name bitcoind -v "/mnt/blockchain/bitcoindata:/data" --network bitcoin -p 8332-8333:8332-8333 amacneil/bitcoin
- docker run --rm --network bitcoin amacneil/bitcoin bitcoin-cli -rpcconnect=bitcoind getinfo

## Ethereum
- install docker
- docker pull ethereum/client-go
- docker run -d --name ethereum-node -v "/mnt/blockchain/ethereumdata:/root" -p 8545:8545 -p 30303:30303 ethereum/client-go --fast --cache=512

## Account Generator
- install docker
- sudo npm start
