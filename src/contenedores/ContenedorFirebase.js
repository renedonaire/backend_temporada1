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
        const doc = await this.coleccion.doc(id).get()
        return asObj(doc)
    }

    async listarAll() {
        const result = []
        const snapshot = await this.coleccion.get()
        snapshot.forEach(doc => {
            result.push(asObj(doc))
        })
        return result
    }

    async guardar(nuevoElem) {
        const guardado = await this.coleccion.add(nuevoElem)
        return guardado.id
    }

    async actualizar(nuevoElem) {
        const nuevo = await this.coleccion.doc(nuevoElem.id).update(nuevoElem)
        return { result: "actualizado" }
    }

    async borrar(id) {
        const deleted = await this.coleccion.doc(id).delete()
        return { eliminado: id }
    }

    async borrarAll() {
        await this.coleccion.get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete()
                })
            })
    }

}


export default ContenedorFirebase
