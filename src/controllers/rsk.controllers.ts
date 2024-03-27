import { Request, Response } from "express"
import { getTransactionService } from "../services/transaction"
import { getSignService } from "../services/sign"
import { getBalanceService } from '../services/balance'
import { getRskAsset } from "../utils"
import { getPublicKeyService } from "../services/publicKey"
import { Network } from "../config/types"

const publicKeyService = getPublicKeyService()
const transactionService = getTransactionService()
const balanceService = getBalanceService()
const signService = getSignService()

export async function signArbitraryMessage (req: Request, res: Response) {
  try {
    const { content } = req.query as { content: string }
    const { network } = req.params as { network: Network }

    const { publicKey, fullSig } = await signService.signMessage(content, getRskAsset(network))

    return { data: { publicKey, fullSig } }

  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}

export async function getBalance (req: Request, res: Response) {
  try {
    const { network } = req.params as { network: Network }

    const { total, blockHeight } = await balanceService.getAssetBalance(getRskAsset(network))
    
    res.json({ data: { balance: total, blockHeight }})
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}

export async function getPublicKey (req: Request, res: Response) {
  try {
    const { network } = req.params as { network: Network }

    const publicKey = await publicKeyService.getPubKey(getRskAsset(network))

    res.json({ data: { publicKey } })
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}

export async function sendTransaction (req: Request, res: Response) {
  try {
    const payload = req.body

    const { network } = req.params as { network: Network }

    const txInfo  = await transactionService.sendRskTransaction(getRskAsset(network), payload)
    const { txHash, status, subStatus } = txInfo

    if (txHash) {
      res.json({ data: { txHash }})
    } else {
      res.status(500)
      res.json({ error: { status, subStatus }})
    }
  } catch (e: any) {
    res.status(500)
    res.json({ error: e.message })
  }
}