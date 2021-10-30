const express = require('express')
const exphbs = require('express-handlebars')
const routerProductos = require('./router/routerProductos')
const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())


app.engine('hbs', exphbs({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')


app.use('/productos', routerProductos)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))
