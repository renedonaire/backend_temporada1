import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"


class ProductosDaoFirebase extends ContenedorFirebase {

    constructor(coleccion) {
        super('productos')
    }
}


export default ProductosDaoFirebase
