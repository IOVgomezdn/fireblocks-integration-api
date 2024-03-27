import express, { json } from 'express'
import { btc } from './routes/btc.routes'
import { rsk } from './routes/rsk.routes'
import { validateNetwork } from './middlewares/middlewares'
import { SERVER_PORT } from './config/config'

const PORT = SERVER_PORT || 3000

const app = express()
app.use(json())

app.use('/:network', validateNetwork)
app.use('/:network/rsk', rsk)
app.use('/:network/btc', btc)

app.listen(SERVER_PORT || 3000, () => {
  console.log(`Server running on port ${PORT}`)
})
