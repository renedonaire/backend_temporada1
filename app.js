const express = require('express')
const exphbs = require('express-handlebars')
const routerProductos = require('./router/routerProductos')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const { getMessages, saveMessage } = require('./models/mensajes')
const { getProducts, saveProduct } = require('./models/productos')


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


io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    const messages = getMessages()
    socket.emit('messages', messages)

    const products = getProducts()
    socket.emit('products', products)

    socket.on('new-message', message => {
        saveMessage(message)

        const allMessages = getMessages();
        io.sockets.emit('messages', allMessages)
    })
})


const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor (sockets sobre http) escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))
