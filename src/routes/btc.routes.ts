import { Router } from "express"
import { signArbitraryMessage, getBalance, getPublicKey, signRawTransaction } from "../controllers/btc.controllers"
import { validateSignMessage } from "../middlewares/btc.middlewares"

const btc = Router({ mergeParams: true })

btc.get('/balance', getBalance)
btc.get('/public-key', getPublicKey)

btc.post('/sign/message', validateSignMessage, signArbitraryMessage)
btc.post('/sign/tx', signRawTransaction)

export { btc }