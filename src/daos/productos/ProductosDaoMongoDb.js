const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb.js")


class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor(database, collection) {
        super("coderhouse", "productos")
    }
}


module.exports = ProductosDaoMongoDb
// export default ProductosDaoMongoDb
