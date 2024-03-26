import { NextFunction, Request, Response } from "express"
import { isAddress, returnError } from "../utils"

export function validateSendRskTransaction (req: Request, res: Response, next: NextFunction) {
  const { to, value, data, gasLimit, gasPrice } = req.body
  let errors = ''

  if (!isAddress(to)) {
    errors += '"to" body param must be an address. '
  }
  
  if (isNaN(parseFloat(value))) {
    errors += '"value" body param must be a numeric string. '
  }
  
  if (data !== undefined) {
    if (typeof data == 'string') {
      if (!data.length) {
        errors += '"data" body param must not be an empty string. '
      }
    } else {
      errors += '"data" body param must be a string. '
    }
  }
  
  if (isNaN(parseFloat(gasLimit))) {
    errors += '"gasLimit" body param must be a numeric string. '
  }
  
  if (isNaN(parseFloat(gasPrice))) {
    errors += '"gasPrice" body param must be a numeric string. '
  }

  if (errors.length) {
    returnError(res, errors)
  } else {
    next()
  }
}