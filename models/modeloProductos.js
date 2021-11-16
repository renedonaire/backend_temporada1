const fs = require("fs")
const path = require("path")

const route = path.join(__dirname, "../data/productos.txt")

const getProducts = async () => {
    try {
        const result = await fs.promises.readFile(route, 'utf-8')
        return JSON.parse(result)
    } catch (err) {
        await fs.promises.writeFile(route, JSON.stringify([], null, 2))
        const result = await fs.promises.readFile(route, 'utf-8')
        return JSON.parse(result)
    }
}

const saveProduct = async (product) => {
    const { nombre, descripcion, codigo, url, precio, stock } = product
    const stamp = new Date().toLocaleString("en-GB")
    const arrayProducts = await getProducts()
    let ident = 0
    let indexArray = []
    arrayProducts.forEach(element => indexArray.push(element.id))
    if (indexArray.length > 0) {
        const arraySorted = indexArray.sort((a, b) => (b - a))
        ident = arraySorted[0] + 1
    } else {
        ident = 1
    }
    const response = { id: ident, timestamp: stamp, nombre: nombre, descripcion: descripcion, codigo: codigo, url: url, precio: precio, stock: stock }
    arrayProducts.unshift(response)

    try {
        await fs.promises.writeFile(route, JSON.stringify(arrayProducts, null, 2))
        return arrayProducts
    } catch (err) {
        console.log("Error al guardar: ", err)
    }
}


const updateProduct = async (product, ident) => {
    const { nombre, descripcion, codigo, url, precio, stock } = product
    const { id } = ident
    const stamp = new Date().toLocaleString("en-GB")
    const response = { id: id, timestamp: stamp, nombre: nombre, descripcion: descripcion, codigo: codigo, url: url, precio: precio, stock: stock }
    const arrayProducts = await getProducts()

    const actualizado = arrayProductos[parseInt(id) - 1]
    if (actualizado) {
        arrayProductos[parseInt(id) - 1] = response
        res.json({ actualizado: response })
    } else {
        res.json({ error: 'producto no encontrado' })
    }

    try {
        await fs.promises.writeFile(route, JSON.stringify(arrayProducts, null, 2))
        return arrayProducts
    } catch (err) {
        console.log("Error al guardar: ", err)
    }
}



module.exports = {
    getProducts,
    saveProduct,
    updateProduct
}
