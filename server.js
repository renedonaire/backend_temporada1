import express from 'express'
import { productosRouter } from './src/routers/productosRouter.js'
import { carritosRouter } from './src/routers/carritosRouter.js'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)


export default app
