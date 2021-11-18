const express = require('express')
const { Router } = require('express')
const routerCarritos = Router()
const app = express()
const { userLevel } = require('../data/userLevel')
const { createCart } = require('../models/modeloCarritos')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())



routerCarritos.get('/', async (req, res) => {
    const arrayProductos = await getProducts()
    res.json(arrayProductos)
})



routerCarritos.get('/:id', async (req, res) => {
    const ident = req.params
    const response = await getProductById(ident)
    res.json(response)
})



routerCarritos.post('/', async (req, res) => {
    const admin = userLevel()
    if (admin) {
        const response = await createCart()
        res.json(response)
    } else {
        const response = { error: '-1', descripcion: "ruta '/api/carrito' método 'POST' no autorizada" }
        res.json(response)
    }
})



routerCarritos.put('/:id', async (req, res) => {
    const admin = userLevel()
    if (admin) {
        const product = req.body
        const ident = req.params
        const response = await updateProduct(product, ident)
        res.json(response)
    } else {
        const response = { error: '-1', descripcion: "ruta '/api/productos' método 'PUT' no autorizada" }
        res.json(response)
    }
})



routerCarritos.delete('/:id', async (req, res) => {
    const admin = userLevel()
    if (admin) {
        const product = req.body
        const ident = req.params
        const response = await deleteProduct(ident)
        res.json(response)
    } else {
        const response = { error: '-1', descripcion: "ruta '/api/productos' método 'DELETE' no autorizada" }
        res.json(response)
    }
})



module.exports = routerCarritos
