import { Asset, BTC, BTC_TESTNET } from "../config/types"
import { fireblocksClient } from "../config/config"
import { PeerType, TransactionOperation } from "fireblocks-sdk"
import { waitForResult } from "./requestResult"

async function getBtcAsyncSigner (assetId: BTC | BTC_TESTNET, pubkey: string, fireblocks: any) {
  return {
    publicKey: Buffer.from(pubkey, 'hex'),
    async sign (bufferHash: Buffer, lowR?: Boolean) {
      const hash = bufferHash.toString('hex')
      const { fullSig } = await signMessage(hash, assetId, fireblocks)

      return Buffer.from(fullSig, 'hex')
   }
  }
}

async function signMessage (content: string, assetId: Asset, fireblocks: any) {
  const { id } = await fireblocks.createTransaction({
    operation: TransactionOperation.RAW,
    assetId,
    source: {
        type: PeerType.VAULT_ACCOUNT,
        id: '0'
    },
    extraParameters: {
        rawMessageData: {
            messages: [{
                content,
                bip44addressIndex: '0'
        }]
        }
    },
  })

  const { signedMessages } = await waitForResult(id, 'status', fireblocks)

  if (signedMessages && signedMessages[0]) {
    const { publicKey, signature: { fullSig } } = signedMessages[0]
    return { publicKey, fullSig }
  } else {
    throw Error(`For some reason, the message couldn\'nt be signed. \n FireblocksTxId: ${id} \n Payload: ${content}`)
  }
}

export function getSignService(fireblocks = fireblocksClient) {
  return {
    getBtcAsyncSigner (assetId: BTC | BTC_TESTNET, pubkey: string) {
      return getBtcAsyncSigner(assetId, pubkey, fireblocks)
    },
    signMessage (content: string, assetId: Asset) {
      return signMessage(content, assetId, fireblocks)
    }
  }
}
