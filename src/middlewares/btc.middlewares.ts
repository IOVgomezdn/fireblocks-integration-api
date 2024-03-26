import { Psbt } from 'bitcoinjs-lib'
import { NextFunction, Request, Response } from "express"
import { returnError } from "../utils"

export function validateSignRawTransaction (req: Request,res: Response, next: NextFunction) {
  const { encodedPsbt } = req.body as { encodedPsbt: string }

  try {
    Psbt.fromBase64(encodedPsbt)
    next()
  } catch (e: any) {
    returnError(res, 'Invalid encoded PSBT.')
  }
}