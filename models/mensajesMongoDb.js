const { MongoClient } = require('mongodb')

// CREO QUE ESTO ESTA BIEN
class Mensajes {
    constructor(config) {
        console.log(config);
        const client = new MongoClient(config, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect()
        console.log("conectado a mongodb");
    }


    //Y QUE EL PROBLEMA ESTÁ DE AQUÍ PARA ABAJO
    crearTablaMensajes() {
        try {
            return this.dropDatabase('mensajes')
        } catch (error) {
            return error
        }
    }

    insertarMensajes(mensajes) {
        try {
            return this.insertOne(mensajes)
        } catch (error) {
            return error
        }
    }

    listarMensajes() {
        try {
            return this.find().toArray()
        } catch (error) {
            return error
        }
    }
}

module.exports = { Mensajes }
