const express = require('express')
const app = express()

const Contenedor = require('./operaciones')
const database = new Contenedor('.//data/productos.txt')

app.get('/productos', async (req, res) => {
    const response = await database.getAll()
    res.json({response})
})

app.get('/productoRandom', (req, res) => {
    res.send("mis cosas")
})

const server = app.listen(8080, () => {
    console.log("conectado a puerto ${server.address().port}")
})

server.on("error", (error) => {
    console.log(error)
})
