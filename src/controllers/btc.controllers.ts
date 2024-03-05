import { Request, Response } from "express"
import { getBtcAsset } from "../utils"
import { signBtcTransaction } from "../services/transaction"
import { signMessage } from "../services/sign"
import { getAssetBalance } from "../services/balance"
import { getPubKey } from "../services/publicKey"
import { Network } from "../config/types"

export async function signArbitraryMessage (req: Request, res: Response) {
  try {
    const { message } = req.body as { message: string }
    const { network } = req.params as { network: Network }

    const { fullSig, publicKey } = await signMessage(message, getBtcAsset(network))

    res.json({ data: { fullSig, publicKey }})
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}

export async function signRawTransaction (req: Request, res: Response) {
  try {
    const { encodedPsbt } = req.body
    const { network } = req.params as { network: Network }

    const hexEncodedSignedTx = await signBtcTransaction(getBtcAsset(network), encodedPsbt)

    res.json({ data: { hexEncodedSignedTx } })
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}

export async function getBalance (req: Request, res: Response) {
  try {
    const { network } = req.params as { network: Network }
    const { total: balance, blockHeight } = await getAssetBalance(getBtcAsset(network))
    
    res.json({ data: { balance, blockHeight }})
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}

export async function getPublicKey (req: Request, res: Response) {
  try {
    const { network } = req.params as { network: Network }
    const publicKey = await getPubKey(getBtcAsset(network))

    res.json({ data: { publicKey } })
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}