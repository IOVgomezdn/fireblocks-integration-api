import { Psbt } from 'bitcoinjs-lib'
import { TransactionOperation, PeerType } from 'fireblocks-sdk'
import { fireblocksClient } from '../config/config'
import { waitForResult } from './requestResult'
import { 
  RskTxRequest,
  FireblocksRskTxPayload,
  RBTCAsset,
  BTCAsset
} from "../config/types"
import { getPublicKeyService } from './publicKey'
import { getSignService } from './sign'

export function getTransactionService(fireblocks = fireblocksClient) {
  const publicKeyService = getPublicKeyService(fireblocks)
  const signService = getSignService(fireblocks)

  return {
    async sendRskTransaction(assetId: RBTCAsset, { to, value, data, gasLimit, gasPrice }: RskTxRequest) {
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
    
      if (data) {
        payload.operation = TransactionOperation.CONTRACT_CALL
        payload.extraParameters = {
          contractCallData: data
        }
      }
    
      const { id } = await fireblocks.createTransaction(payload)
    
      const txInfo = await waitForResult(id, 'txHash', fireblocks)
    
      return txInfo
    },
    async signBtcTransaction(assetId: BTCAsset, unsignedEncodedPsbt: string, psbt = Psbt as any) {
      const unsignedTx = psbt.fromBase64(unsignedEncodedPsbt)
    
      const pubKey = await publicKeyService.getPubKey(assetId)
      const signer = await signService.getBtcAsyncSigner(assetId, pubKey)
    
      await unsignedTx.signAllInputsAsync(signer)

      const signedTx = unsignedTx.finalizeAllInputs().extractTransaction()
    
      return signedTx.toHex()
    }
  }
}

