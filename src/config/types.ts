import { PeerType, TransactionOperation } from "fireblocks-sdk"

export type BTC = 'BTC'
export type BTC_TESTNET = 'BTC_TEST'

export type RBTC = 'RBTC'
export type RBTC_TESTNET = 'RBTC_TEST'

export type Network = 'mainnet' | 'testnet'

export type Asset = RBTC | RBTC_TESTNET | BTC | BTC_TESTNET

export type BTCAsset = BTC | BTC_TESTNET
export type RBTCAsset = RBTC | RBTC_TESTNET

export type NetworkAsset = { testnet: { rsk: RBTC_TESTNET, btc: BTC_TESTNET }, mainnet: { rsk: RBTC, btc: BTC } }

export type NeededResultType = 'txHash' | 'status'

export type RskTxRequest = {
  to: string,
  gasLimit: string,
  gasPrice: string,
  data?: string,
  value?: string
}

export type BtcTxRequest = {
  value: string,
  outputs: { to: string, value: string }[],
  fee: string
}

export type FireblocksRskTxPayload = {
  operation?: TransactionOperation,
  assetId: string,
  amount: string,
  source: { type: PeerType, id: string },
  destination: { type: PeerType, oneTimeAddress?: { address: string } },
  extraParameters?: { contractCallData?: string },
  gasLimit: string,
  gasPrice: string,
}