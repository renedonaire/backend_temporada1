const { Router } = require('express')
const routerProductos = Router()

const arrayProductos = JSON.parse('../data/productos.txt')

routerProductos.get('/', (req, res) => {
    res.json(arrayProductos)
})

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    const result = arrayProductos[parseInt(id) - 1]
    result ?
        res.json({ result })
        :
        res.json({ error: 'producto no encontrado' })
})

routerProductos.post('/', (req, res) => {
    let { producto } = req.body
    let indexArray = []
    arrayProducts.forEach(element => indexArray.push(element.id))
    if (indexArray.length > 0) {
        const arraySorted = indexArray.sort((a, b) => (b - a))
        producto.id = arraySorted[0] + 1
        arrayProductos.push(producto)
    } else {
        producto.id = 1
        arrayProductos.push(producto)
    }
    res.json({ producto: producto, id: producto.id })
})

routerProductos.put('/:id', (req, res) => {
    const { producto } = req.body
    const { id } = req.params
    arrayProductos[parseInt(id) - 1] = producto
    res.json({ actualizado: producto })
})

routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    const [borrado] = arrayProductos.splice(parseInt(id) - 1, 1)
    res.json({ eliminado: borrado })
})

module.exports = routerProductos
