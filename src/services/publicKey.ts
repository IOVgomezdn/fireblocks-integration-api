import { Asset } from "../config/types"
import { fireblocksClient } from "../config/config"

export async function getPubKey (assetId: Asset) {
  const { publicKey } = await fireblocksClient.getPublicKeyInfoForVaultAccount({
    vaultAccountId: 0,
    change: 0,
    addressIndex: 0,
    assetId,
    compressed: true
  })

  return publicKey
}