const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("hola desde express")
})

app.get('/cosas', (req, res) => {
    res.send("mis cosas")
})

const server = app.listen(8080, () => {
    console.log("conectado a puerto ${server.address().port}")
})

server.on("error", (error) => {
    console.log(error)
})
