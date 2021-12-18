import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"


class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('personas', {
            nombre: { type: String, required: true },
            apellido: { type: Number, required: true },
            edad: { type: Number, required: true },
        })
    }
}


export default ProductosDaoMongoDb