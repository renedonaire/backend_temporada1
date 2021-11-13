const express = require('express')
const { Router } = require('express')
const routerCarritos = Router()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


routerCarritos.get('/', (req, res) => {
    res.json(arrayProductos)
})


routerCarritos.get('/:id', (req, res) => {
    const { id } = req.params
    const result = arrayProductos[parseInt(id) - 1]
    result ?
        res.json({ result })
        :
        res.json({ error: 'producto no encontrado' })
})


routerCarritos.post('/', (req, res) => {
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


routerCarritos.put('/:id', (req, res) => {
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


routerCarritos.delete('/:id', (req, res) => {
    const { id } = req.params
    const [borrado] = arrayProductos.splice(parseInt(id) - 1, 1)
    borrado ?
        res.json({ eliminado: borrado })
        :
        res.json({ error: 'producto no encontrado' })
})

module.exports = routerCarritos
