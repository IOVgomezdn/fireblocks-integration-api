import { Asset } from '../config/types'
import { fireblocksClient } from '../config/config'

export async function getAssetBalance(assetId: Asset) {
  const { total, blockHeight } = await fireblocksClient.getVaultBalanceByAsset(assetId)

  return { total, blockHeight }
}