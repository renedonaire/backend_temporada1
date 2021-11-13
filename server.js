const express = require('express')
const routerProductos = require('./router/routerProductos')
const routerCarritos = require('./router/routerCarritos')
const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('api/carrito', routerCarritos)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))
