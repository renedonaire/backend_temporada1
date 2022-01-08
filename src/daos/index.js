import config from '../../config.js'


let productosDao

switch (config.PERS) {
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js')
        // const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb()
        // carritosDao = new CarritosDaoMongoDb()
        console.log("Persistencia en mongodb")
}

export { productosDao }
