import { Request, Response } from "express"
import { getBtcAsset } from "../utils"
import { getTransactionService } from "../services/transaction"
import { getSignService } from "../services/sign"
import { getBalanceService } from "../services/balance"
import { getPublicKeyService } from "../services/publicKey"
import { Network } from "../config/types"

const publicKeyService = getPublicKeyService()
const transactionService = getTransactionService()
const balanceService = getBalanceService()
const signService = getSignService()

export async function signArbitraryMessage (req: Request, res: Response) {
  try {
    const { message } = req.body as { message: string }
    const { network } = req.params as { network: Network }

    const { fullSig, publicKey } = await signService.signMessage(message, getBtcAsset(network))

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

    const hexEncodedSignedTx = await transactionService.signBtcTransaction(getBtcAsset(network), encodedPsbt)

    res.json({ data: { hexEncodedSignedTx } })
  } catch (e: any) {
    res.status(500)
    res.json({ error: `${ e.message }. Check if the encoded PSBT is valid and you have ownership over the UTXOs being spent.` })
  }
}

export async function getBalance (req: Request, res: Response) {
  try {
    const { network } = req.params as { network: Network }
    const { total, blockHeight } = await balanceService.getAssetBalance(getBtcAsset(network))
    
    res.json({ data: { balance: total, blockHeight }})
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}

export async function getPublicKey (req: Request, res: Response) {
  try {
    const { network } = req.params as { network: Network }
    const publicKey = await publicKeyService.getPubKey(getBtcAsset(network))

    res.json({ data: { publicKey } })
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}