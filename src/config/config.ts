require('dotenv').config()
import { FireblocksSDK } from 'fireblocks-sdk'
import { NetworkAsset } from './types'

const {
  API_KEY,
  API_SECRET,
  BASE_URL
} = process.env as { API_KEY: string, API_SECRET: string, BASE_URL: string, NETWORK: string }

const fireblocksClient = new FireblocksSDK(API_SECRET, API_KEY, BASE_URL)

const networkAsset: NetworkAsset = {
  testnet: {
    rsk: 'RBTC_TEST',
    btc: 'BTC_TEST'
  },
  mainnet: {
    rsk: 'RBTC',
    btc: 'BTC'
  }
}

export {
  fireblocksClient,
  networkAsset
}