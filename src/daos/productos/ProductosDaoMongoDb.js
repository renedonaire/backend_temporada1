
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"


class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor(database, collection) {
        super("coderhouse", "productos")
    }
}


export default ProductosDaoMongoDb