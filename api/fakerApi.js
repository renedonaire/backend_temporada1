const faker = require('faker')
faker.locale = 'es'


const unProducto = async () => {
    const product = await faker.commerce.product()
    const price = await faker.commerce.price()
    const image = await faker.image.unsplash.image(640, 640, product)
    return { product, price, image }
}

const variosProductos = async (cantidad) => {
    let resultado = []
    for (let i = 1; i <= cantidad; i++) {
        resultado.push(await unProducto())
    }
    return resultado
}

module.exports = { variosProductos }
