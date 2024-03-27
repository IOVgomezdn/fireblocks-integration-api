import { Asset } from "../config/types"
import { fireblocksClient } from "../config/config"

export function getPublicKeyService(fireblocks = fireblocksClient) {
  return {
    async getPubKey (assetId: Asset) {
      const { publicKey } = await fireblocks.getPublicKeyInfoForVaultAccount({
        vaultAccountId: 0,
        change: 0,
        addressIndex: 0,
        assetId,
        compressed: true
      })

      return publicKey
    }
  }
}
