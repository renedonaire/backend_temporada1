import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"


class CarritosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/carritos.json`)
    }
}


export default CarritosDaoArchivo
