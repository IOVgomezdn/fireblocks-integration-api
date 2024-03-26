import { NextFunction, Request, Response } from "express"
import { returnError, isSha256 } from "../utils"

export function validateSignMessage (req: Request, res: Response, next: NextFunction) {
  const { message } = req.body as { message: string }

  if (!isSha256(message)) {
    returnError(res, '"message" query param must be a sha256 hash.')
  } else {
    next()
  }
}

export async function validateNetwork (req: Request, res: Response, next: NextFunction) {
  const { network } = req.params

  if (!['mainnet', 'testnet'].includes(network)) {
    returnError(res, '"network" query param must be either "testnet" or "mainnet".')
  } else {
    next()
  }
}