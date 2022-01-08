/* ----------------------- Llama módulos y requeridos ----------------------- */
const express = require('express')
const exphbs = require('express-handlebars')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const { Mensajes } = require('../models/mensajesSQL')
const { Productos } = require('../models/productosMariaDB')
const { sqlite3 } = require('./options')
const { mysql } = require('./options')
const { variosProductos } = require('../api/fakerApi')
const { ProductosDaoMongoDb } = require('./daos/productos/ProductosDaoMongoDb.js')

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

app.get('/', async (req, res) => {
    const listaProductos = await productos.listarProductos()
    res.render('list', { list: listaProductos })
})

app.get('/api/productos-test', async (req, res) => {
    const listaProductos = await variosProductos(5)
    res.render('listaTest', { list: listaProductos })
})



/* --------------------------- Crea bases de datos -------------------------- */
const arrayMensajes = [
    { autor: 'server:', texto: 'Bienvenido', fecha: "" }
]

const arrayProductos = [
    {
        "title": "La Vuelta al Mundo en 80 días",
        "price": 15900,
        "thumbnail": "https://www.antartica.cl/media/catalog/product/9/7/9788417127916_1.png?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
    },
    {
        "title": "Primera Persona Del Singular",
        "price": 19900,
        "thumbnail": "https://www.antartica.cl/media/catalog/product/9/7/9789569961212_1.png?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
    },
    {
        "title": "Ajuste De Cuentas",
        "price": 15000,
        "thumbnail": "https://www.antartica.cl/media/catalog/product/9/7/9789569646867_1.png?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
    }
]

const mensajes = new Mensajes(sqlite3)
mensajes.crearTablaMensajes()
    .then(() => {
        return mensajes.insertarMensajes(arrayMensajes)
    })
    .then(() => console.log('Tabla Mensajes creada'))
    .catch((err) => {
        console.log(err)
    })


const productos = new Productos(mysql)
productos.crearTablaProductos()
    .then(() => {
        return productos.insertarProductos(arrayProductos)
    })
    .then(() => console.log('Tabla Productos creada'))
    .catch((err) => {
        console.log(err)
    })



/* ---------------------------- Configura socket ---------------------------- */
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado')

    const messages = await mensajes.listarMensajes()
    socket.emit('messages', messages)

    const products = await productos.listarProductos()
    socket.emit('products', products)

    socket.on('new-message', async message => {
        await mensajes.insertarMensajes(message)
        const allMessages = await mensajes.listarMensajes()
        io.sockets.emit('messages', allMessages)
    })

    socket.on('new-product', async product => {
        await productos.insertarProductos(product)
        const allProducts = await productos.listarProductos()
        io.sockets.emit('products', allProducts)
    })
})



/* --------------------------- Configura servidor --------------------------- */
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor (sockets sobre http) escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))
