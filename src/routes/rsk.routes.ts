import { Router } from "express"
import { signArbitraryMessage, getBalance, getPublicKey, sendTransaction } from "../controllers/rsk.controllers"
import { validateSignMessage } from "../middlewares/middlewares"
import { validateSendRskTransaction } from "../middlewares/rsk.middlewares"

const rsk = Router({ mergeParams: true })

rsk.get('/balance', getBalance)
rsk.get('/public-key', getPublicKey)

rsk.post('/sign/message', validateSignMessage, signArbitraryMessage)
rsk.post('/tx', validateSendRskTransaction, sendTransaction)

export { rsk }