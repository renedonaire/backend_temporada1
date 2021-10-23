const express = require('express')
const routerProductos = require('../router/routerProductos')
const app = express()


app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(static('public'))

app.use('/api/productos', routerProductos)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))
