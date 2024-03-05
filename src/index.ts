import express, { json } from 'express'
import { btc } from './routes/btc.routes'
import { rsk } from './routes/rsk.routes'

const app = express()
app.use(json())

app.use('/:network/rsk', rsk)
app.use('/:network/btc', btc)

app.listen(3000)
