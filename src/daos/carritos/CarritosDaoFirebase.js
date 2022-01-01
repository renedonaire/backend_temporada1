import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"


class CarritosDaoFirebase extends ContenedorFirebase {

    constructor(coleccion) {
        super('carritos')
    }
}


export default CarritosDaoFirebase
