const express = require('express')
const app = express()
import routerProductos from "../router/routerProductos"


app.use(json())
app.use(urlencoded({ extended: true }))
app.use(static('public'))

app.use('/api/productos', routerProductos)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))
