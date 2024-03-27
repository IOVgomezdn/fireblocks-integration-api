import { FireblocksSDK } from 'fireblocks-sdk'
import { fireblocksClient } from '../config/config'
import { NeededResultType } from '../config/types'
import { isTxBeingProcessed, sleep } from '../utils'

async function getTransactionById (id: string, fireblocks: FireblocksSDK) {
  const txInfo = await fireblocks.getTransactionById(id)

  return txInfo
}

export async function waitForResult (txId: string, resultType: NeededResultType, fireblocks = fireblocksClient) {
  let txInfo = await getTransactionById(txId, fireblocks)

  while (isTxBeingProcessed(txInfo, resultType)) {
    await sleep(1000)
    console.log(`Checking transaction status with id ${txInfo.id} ...`)
    txInfo = await getTransactionById(txInfo.id, fireblocks)
    console.log(`Status: ${txInfo.status} \n`)
  }
  return txInfo
}