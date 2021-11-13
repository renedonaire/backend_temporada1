const express = require('express')
const { Router } = require('express')
const routerProductos = Router()
const app = express()
const admin = require('../data/userLevel')
const { saveProduct, getProducts } = require('../models/modeloProductos')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())


routerProductos.get('/', async (req, res) => {
  const arrayProductos = await getProducts()
  res.json(arrayProductos)
})


routerProductos.get('/:id', async (req, res) => {
  const { id } = req.params
  const arrayProductos = await getProducts()
  const result = arrayProductos[parseInt(id) - 1]
  result ?
    res.json({ result })
    :
    res.json({ error: 'producto no encontrado' })
})


routerProductos.post('/', (req, res) => {
  if (admin) {
    const { title, price, thumbnail } = req.body
    let ident = 0
    let indexArray = []
    arrayProductos.forEach(element => indexArray.push(element.id))
    if (indexArray.length > 0) {
      const arraySorted = indexArray.sort((a, b) => (b - a))
      ident = arraySorted[0] + 1
    } else {
      ident = 1
    }
    const response = { title: title, price: price, thumbnail: thumbnail, id: ident }
    arrayProductos.push(response)
    res.json(response)
  } else {
    const response = { error: '-1', descripcion: "ruta '/api/productos' método 'post' no autorizada" }
    res.json(response)
  }
})


routerProductos.put('/:id', (req, res) => {
  if (admin) {
    const { title, price, thumbnail } = req.body
    const { ident } = req.params
    const producto = { title: title, price: price, thumbnail: thumbnail, id: ident }
    const actualizado = arrayProductos[parseInt(ident) - 1]
    if (actualizado) {
      arrayProductos[parseInt(ident) - 1] = producto
      res.json({ actualizado: producto })
    } else {
      res.json({ error: 'producto no encontrado' })
    }
  } else {
    const response = { error: '-1', descripcion: "ruta '/api/productos' método 'put' no autorizada" }
    res.json(response)
  }
})


routerProductos.delete('/:id', (req, res) => {
  if (admin) {
    const { id } = req.params
    const [borrado] = arrayProductos.splice(parseInt(id) - 1, 1)
    borrado ?
      res.json({ eliminado: borrado })
      :
      res.json({ error: 'producto no encontrado' })
  } else {
    const response = { error: '-1', descripcion: "ruta '/api/productos' método 'post' no autorizada" }
    res.json(response)
  }
})

module.exports = routerProductos
