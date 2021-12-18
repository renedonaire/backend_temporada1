import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'
import config from '../../config.js'

const client = new MongoClient(config.mongodb.cnxStr, config.mongodb.options)
await client.connect()
console.log('conectado a mongo ', config.mongodb.cnxStr)

class ContenedorMongoDb {

    constructor(baseDatos, coleccion) {
        this.baseDatos = baseDatos
        this.coleccion = coleccion
    }

    async listar(id) {
        console.log(id);
        const result = await client.db(this.baseDatos).collection(this.coleccion).find({ _id: ObjectId(id) }).toArray()
        return result
    }

    async listarAll() {
        const result = await client.db(this.baseDatos).collection(this.coleccion).find().toArray()
        return result
    }

    async guardar(nuevoElem) {
        const result = await client.db(this.baseDatos).collection(this.coleccion).insertOne(nuevoElem)
        return result
    }

    async actualizar(nuevoElem) {
        const result = await client.db(this.baseDatos).collection(this.coleccion).updateOne({ _id: ObjectId(nuevoElem._id) }, { $set: { "producto": nuevoElem.producto, "precio": nuevoElem.precio } })
        return result
    }

    async borrar(id) {
        const result = await client.db(this.baseDatos).collection(this.coleccion).deleteOne({ _id: ObjectId(id) })
        return result
    }

}


export default ContenedorMongoDb
