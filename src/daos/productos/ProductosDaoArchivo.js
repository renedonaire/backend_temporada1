import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/productos.json`)
    }
}


export default ProductosDaoArchivo
