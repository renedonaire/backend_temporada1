const express = require('express')
const exphbs = require('express-handlebars')
const routerProductos = require('../router/routerProductos')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const { getMessages, saveMessage } = require('../models/mensajes')
const { getProducts, saveProduct } = require('../models/productos')


const app = express()
const httpServer = new HTTPServer(app)
const io = new SocketServer(httpServer)


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())


app.engine('hbs', exphbs({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')


app.use('/', routerProductos)


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


const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor (sockets sobre http) escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))


// import mensajesSQL from '../models/mensajesSQL'
const { Mensajes } = require('../models/mensajesSQL')
// import { mysql as options } from './options.js'
// import { sqlite3 as options } from './options.js'
const { sqlite3 } = require('./options')

const arrayMensajes = [
    { tipo: 'Perro', nombre: 'Firulais', edad: 5 },
    { tipo: 'Gato', nombre: 'Michi', edad: 3 },
    { tipo: 'Loro', nombre: 'Pedro', edad: 8 },
    { tipo: 'Caballo', nombre: 'Flecha Negra', edad: 9 },
]

const mensajes = new Mensajes(sqlite3)
mensajes.crearTabla()
    .then(() => console.log('Tabla mensajes creada con éxito'))
    .then(() => {
        return mensajes.insertar(arrayMensajes)
    })
    .then(() => {
        return mensajes.listar()
    })
    .then(listado => {
        console.table(listado)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        mensajes.cerrarBD()
    })