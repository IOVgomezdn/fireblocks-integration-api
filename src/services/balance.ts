import { Asset } from '../config/types'
import { fireblocksClient } from '../config/config'

export function getBalanceService (fireblocks = fireblocksClient) {
  return {
    async getAssetBalance (assetId: Asset) {
      const { total, blockHeight } = await fireblocks.getVaultBalanceByAsset(assetId)
    
      return { total, blockHeight }
    }
  }
}
