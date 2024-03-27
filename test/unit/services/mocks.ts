import { Psbt } from "bitcoinjs-lib";
import { FireblocksSDK, TransactionOperation, TransactionStatus, TransferPeerPath } from "fireblocks-sdk";
import { Asset } from "../../../src/config/types";

function mockMethod(returnValue: any) {
  return new Promise((resolve) => setTimeout(() => {
    resolve(returnValue)
  }, 200))
}

export const psbtMock = {
  fromBase64 (encodedPsbt: string) {
    return {
      async signAllInputsAsync (signer: any) {
        return true
      },
      finalizeAllInputs () {
        return {
          extractTransaction () {
            return {
              toHex () {
                return '09831abcdef127892300'
              }
            }
          }
        }
      }
    }
  }
} as unknown as Psbt

export const fireblocksMock = {
  getVaultBalanceByAsset(assetId: Asset) {
    return mockMethod({
      total: '0.07',
      blockHeight: '1333'
    })
  },
  getPublicKeyInfoForVaultAccount(
    vaultAccountId: number,
    change: number,
    addressIndex: number,
    assetId: Asset,
    compressed: boolean
  ) {
    return mockMethod({ publicKey: '0987654321abcdedabc' })
  },
  createTransaction({
    operation,
    assetId,
    source,
    extraParameters
  }: {
    operation: TransactionOperation,
    assetId: Asset,
    source: TransferPeerPath,
    extraParameters: object
  }) {
    if (operation === TransactionOperation.RAW) {
      return mockMethod({ id: 'signMessageTx' })
    } else {
      return mockMethod({ id: 'regularTx' })
    }
  },
  getTransactionById(id: string) {
    if (id === 'signMessageTx') {
      return mockMethod({
        status: TransactionStatus.COMPLETED,
        signedMessages: [
          {
            publicKey: '0987654321abcdedabc',
            signature: { fullSig: '01283cbdafe89036782cbde87ebfcba3342b0100' }
          }
        ]
      })
    } else {
        return mockMethod({
          txHash: '0x12378789cbdedf',
          status: TransactionStatus.COMPLETED,
          subStatus: 'some substatus'
        })
    }
  }
} as unknown as FireblocksSDK