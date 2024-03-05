import { TransactionResponse, TransactionStatus } from 'fireblocks-sdk'
import { NeededResultType, Network } from './config/types'
import { networkAsset } from './config/config'
import { Response } from 'express'

export function sleep (delay: number) {
  return new Promise((r) => setTimeout(r, delay))
}

export function getRskAsset(network: Network) {
  return networkAsset[network]['rsk']
}

export function getBtcAsset(network: Network) {
  return networkAsset[network]['btc']
}

export function returnError(res: Response, error: string) {
  res.status(422)
  res.json({ error })
}

export function isTxBeingProcessed (txInfo: TransactionResponse, type: NeededResultType) {
  const finishedStatuses = [
    TransactionStatus.BLOCKED,
    TransactionStatus.REJECTED,
    TransactionStatus.FAILED,
    TransactionStatus.CANCELLED,
    TransactionStatus.COMPLETED
  ]

  const cases = {
    status: ({ status }: { status: TransactionStatus }) => {
      return !finishedStatuses.includes(status)
    },
    txHash: ({ txHash, status }: { txHash: string, status: TransactionStatus }) => {
      return !txHash && ! finishedStatuses.includes(status)
    }
  }

  return cases[type](txInfo)
}
