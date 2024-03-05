import { assert } from "console"
import { NextFunction, Request, Response } from "express"
import { returnError } from "../utils"

export function validateSignMessage(req: Request, res: Response, next: NextFunction) {
  const { message } = req.body as { message: string }

  if (!message) {
    returnError(res, '"message" query param must not be empty.')
  } else if (!/\b[A-Fa-f0-9]{64}\b/.test(message)) {
    returnError(res, '"message" query param must be a sha256 hash.')
  } else {
      next()
  }
}