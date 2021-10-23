const express = require('express')
const { Router } = require('express')
const routerProductos = Router()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// const arrayProductos = JSON.parse('../data/productos.txt')
const arrayProductos = [
  {
    "title": "La Vuelta al Mundo en 80 días",
    "price": 15900,
    "thumbnail": "https://images.cdn3.buscalibre.com/fit-in/360x360/cc/ff/ccff1c289cdb7b75f0f6b15c09be499d.jpg",
    "id": 1
  },
  {
    "title": "Primera Persona Del Singular",
    "price": 19900,
    "thumbnail": "https://www.antartica.cl/media/catalog/product/9/7/9789569961212_1.png?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
    "id": 2
  },
  {
    "title": "Ajuste De Cuentas",
    "price": 15000,
    "thumbnail": "https://www.antartica.cl/media/catalog/product/9/7/9789569646867_1.png?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
    "id": 3
  }
]

routerProductos.get('/', (req, res) => {
  res.json(arrayProductos)
})


routerProductos.get('/:id', (req, res) => {
  const { ident } = req.params
  const result = arrayProductos[parseInt(ident) - 1]
  result ?
    res.json({ result })
    :
    res.json({ error: 'producto no encontrado' })
})


routerProductos.post('/', (req, res) => {
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
})


routerProductos.put('/:id', (req, res) => {
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
})


routerProductos.delete('/:id', (req, res) => {
  const { id } = req.params
  const [borrado] = arrayProductos.splice(parseInt(id) - 1, 1)
  borrado ?
    res.json({ eliminado: borrado })
    :
    res.json({ error: 'producto no encontrado' })
})

module.exports = routerProductos
