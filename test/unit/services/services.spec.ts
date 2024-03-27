import { expect } from 'chai'
import { TransactionStatus } from 'fireblocks-sdk'
import { Asset } from '../../../src/config/types'
import { getBalanceService } from '../../../src/services/balance'
import { getPublicKeyService } from '../../../src/services/publicKey'
import { getSignService } from '../../../src/services/sign'
import { getTransactionService } from '../../../src/services/transaction'
import { fireblocksMock, psbtMock } from './mocks'

describe('SERVICES', () => {
  const assets: Asset[] = ['RBTC_TEST', 'BTC_TEST']

  describe('BALANCE', () => {
    const balanceService = getBalanceService(fireblocksMock)
  
    for (const asset of assets) {
      it(`getAssetBalance(${asset}) should return a balance succesfully`, async () => {
    
        const { total, blockHeight } = await balanceService.getAssetBalance(asset)
    
        expect(Number(total)).not.to.be.NaN
        expect(Number(blockHeight)).not.to.be.NaN
      })
    }
  })

  describe('PUBLIC KEY', () => {
    const publicKeyService = getPublicKeyService(fireblocksMock)
  
    for (const asset of assets) {
      it(`getPubKey(${asset}) should return a public key succesfully`, async () => {
        const publicKey = await publicKeyService.getPubKey('RBTC_TEST')
    
        expect(publicKey).to.be.a('string').and.have.length.above(0)
      })
    }
  })

  describe('SIGN', () => {
    const signService = getSignService(fireblocksMock)
    const content = '2ed46d7bedc17aba18343eac71e21648b1af50fff732af7e338075cd0ed1567a'

    for (const asset of assets) {
      it(`signMessage(${content}, ${asset}) should sign a message succesfully`, async () => {
        const { publicKey, fullSig } = await signService.signMessage(content, asset)

        expect(publicKey).to.be.a('string').and.have.length.above(0)
        expect(fullSig).to.be.a('string').and.have.length.above(0)
      })
    }
  })

  describe('TRANSACTION', () => {
    const transactionService = getTransactionService(fireblocksMock)

    it(`signRawTransaction('BTC_TEST', encodedPsbt) should sign a psbt transaction succesfully`, async () => {
      const signedTx = await transactionService.signBtcTransaction('BTC_TEST', 'encodedPsbt', psbtMock)

      expect(signedTx).to.be.a('string').and.have.length.above(0)
    })

    it(`sendRskTransaction('RBTC_TEST', { address, value, gasLimit, gasPrice }) should send a transaction succesfully`, async () => {
      const { txHash, status, subStatus } = await transactionService.sendRskTransaction(
        'RBTC_TEST',
        {
          to: 'address',
          value: '0.789',
          gasLimit: '200000',
          gasPrice: '0.00006'
        }
      )

      expect(txHash).to.be.a('string').and.have.length.above(0)
      expect(status).to.be.oneOf(Object.values(TransactionStatus))
      expect(subStatus).to.be.a('string').and.have.length.above(0)
    })
  })
})
