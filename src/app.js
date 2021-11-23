/* ----------------------- Llama módulos y requeridos ----------------------- */
const express = require('express')
const exphbs = require('express-handlebars')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const routerProductos = require('../router/routerProductos')
const { getMessages, saveMessage } = require('../models/mensajes')
const { getProducts, saveProduct } = require('../models/productos')

const app = express()
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)



/* ------------------------------- Handlebars ------------------------------- */
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

app.engine('hbs', exphbs({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use('/', routerProductos)



/* --------------------------- Crea bases de datos -------------------------- */
const { Mensajes } = require('../models/mensajesSQL')
const { sqlite3 } = require('./options')

const arrayMensajes = [
    { autor: 'server:', texto: 'Bienvenido', fecha: "" }
]

const mensajes = new Mensajes(sqlite3)
mensajes.crearTablaMensajes()
    .then(() => console.log('Tabla Mensajes creada'))
    .then(() => {
        return mensajes.insertarMensajes(arrayMensajes)
    })
    .then(() => {
        return mensajes.listarMensajes()
    })
    .then(listado => {
        console.table(listado)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        mensajes.cerrarBDMensajes()
    })



/* ---------------------------- Configura socket ---------------------------- */
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado')

    const messages = await getMessages()
    socket.emit('messages', messages)

    const products = getProducts()
    socket.emit('products', products)

    socket.on('new-message', async message => {
        await saveMessage(message)
        const allMessages = await getMessages()
        io.sockets.emit('messages', allMessages)
    })

    socket.on('new-product', product => {
        saveProduct(product)
        const allProducts = getProducts()
        io.sockets.emit('products', allProducts)
    })
})



/* --------------------------- Configura servidor --------------------------- */
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor (sockets sobre http) escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))
