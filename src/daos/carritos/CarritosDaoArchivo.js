import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"


class CarritosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/personas.json`)
    }
}


export default CarritosDaoArchivo
