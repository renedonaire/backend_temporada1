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
    const arrayProducts = await getProducts()
    try {
        arrayProducts.unshift(product)
        await fs.promises.writeFile(route, JSON.stringify(arrayProducts, null, 2))
        return arrayProducts
    } catch (err) {
        console.log("Error al guardar: ", err)
    }
}

module.exports = {
    getProducts,
    saveProduct,
}
