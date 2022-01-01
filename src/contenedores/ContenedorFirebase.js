import fs from 'fs'
import admin from "firebase-admin"
import config from '../../config.js'

const serviceAccount = JSON.parse(fs.readFileSync(config.firebase.cnxStr, 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

console.log('conectado a firebase ', config.firebase.cnxStr)

const db = admin.firestore()

const asObj = doc => ({ id: doc.id, ...doc.data() })



class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
    }

    async listarAll() {
    }

    async guardar(nuevoElem) {
    }

    async actualizar(nuevoElem) {
    }

    async borrar(id) {
    }

    async borrarAll() {
    }

}


export default ContenedorFirebase
