import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"


class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor(database, collection) {
        super("coderhouse", "carritos")
    }
}


export default CarritosDaoMongoDb
