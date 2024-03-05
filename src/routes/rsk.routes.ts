import { Router } from "express"
import { signArbitraryMessage, getBalance, getPublicKey, sendTransaction } from "../controllers/rsk.controllers"

const rsk = Router({ mergeParams: true })

rsk.get('/balance', getBalance)
rsk.get('/public-key', getPublicKey)

rsk.post('/sign/message', signArbitraryMessage)
rsk.post('/tx', sendTransaction)

export { rsk }