import { fireblocksClient } from '../config/config'
import { NeededResultType } from '../config/types'
import { isTxBeingProcessed, sleep } from '../utils'

async function getTransactionById (id: string) {
  const txInfo = await fireblocksClient.getTransactionById(id)
  
  return txInfo
}

export async function waitForResult (txId: string, resultType: NeededResultType) {
  let txInfo = await getTransactionById(txId)

  while (isTxBeingProcessed(txInfo, resultType)) {
    await sleep(1000)
    console.log(`Checking transaction status with id ${txInfo.id} ...`)
    txInfo = await getTransactionById(txInfo.id)
    console.log(`Status: ${txInfo.status} \n`)
  }
  return txInfo
}