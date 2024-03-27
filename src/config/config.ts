require('dotenv').config()
import { FireblocksSDK } from 'fireblocks-sdk'
import { NetworkAsset } from './types'

const {
  API_KEY,
  API_SECRET,
  BASE_URL,
  SERVER_PORT
} = process.env as { API_KEY: string, API_SECRET: string, BASE_URL: string, NETWORK: string, SERVER_PORT: string }

export function getFireblocksClient(apiSecret: string, apiKey: string, baseUrl: string) {
  return new FireblocksSDK(apiSecret, apiKey, baseUrl)
}

const fireblocksClient = getFireblocksClient(API_SECRET, API_KEY, BASE_URL)

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
  networkAsset,
  SERVER_PORT
}