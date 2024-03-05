import { Psbt, SignerAsync } from 'bitcoinjs-lib'
import { TransactionOperation, PeerType } from 'fireblocks-sdk'
import { fireblocksClient } from '../config/config'
import { waitForResult } from './requestResult'
import { 
  RskTxRequest,
  FireblocksRskTxPayload,
  RBTCAsset,
  BTCAsset
} from "../config/types"
import { getPubKey } from './publicKey'
import { getBtcAsyncSigner } from './sign'

export async function sendRskTransaction(assetId: RBTCAsset, { to, value, data, gasLimit, gasPrice }: RskTxRequest) {
  const payload: FireblocksRskTxPayload = {
    assetId,
    amount: value || '0',
    source: {
        type: PeerType.VAULT_ACCOUNT,
        id: '0'
    },
    destination: {
      type: PeerType.ONE_TIME_ADDRESS,
      oneTimeAddress: {
        address: to
      }
    },
    gasLimit,
    gasPrice
  }

  if (typeof data === 'string' && data.length) {
    payload.operation = TransactionOperation.CONTRACT_CALL
    payload.extraParameters = {
      contractCallData: data
    }
  }
  const { id } = await fireblocksClient.createTransaction(payload)

  const txInfo = await waitForResult(id, 'txHash')

  return txInfo
}

export async function signBtcTransaction(assetId: BTCAsset, unsignedEncodedPsbt: string) {
  const unsignedTx = Psbt.fromBase64(unsignedEncodedPsbt)

  const pubKey = await getPubKey(assetId)
  const signer = await getBtcAsyncSigner(assetId, pubKey)

  await unsignedTx.signAllInputsAsync(signer)
  console.log('dajsiudoajdioajsiodsa')

  const signedTx = unsignedTx.finalizeAllInputs().extractTransaction()

  return signedTx.toHex()
}
