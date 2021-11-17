const express = require('express')
const { Router } = require('express')
const routerProductos = Router()
const app = express()
const admin = require('../data/userLevel')
const { saveProduct, getProducts, updateProduct, deleteProduct, getProductById } = require('../models/modeloProductos')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())


routerProductos.get('/', async (req, res) => {
  const arrayProductos = await getProducts()
  res.json(arrayProductos)
})


routerProductos.get('/:id', async (req, res) => {
  const ident = req.params
  const response = await getProductById(ident)
  res.json(response)
})


routerProductos.post('/', (req, res) => {
  if (admin) {
    const product = req.body
    saveProduct(product)
    const response = { estado: 'agregado' }
    res.json(response)
  } else {
    const response = { error: '-1', descripcion: "ruta '/api/productos' método 'POST' no autorizada" }
    res.json(response)
  }
})


routerProductos.put('/:id', async (req, res) => {
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


routerProductos.delete('/:id', async (req, res) => {
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

module.exports = routerProductos
