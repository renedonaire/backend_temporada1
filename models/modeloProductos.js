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
        return { estado: 'producto agregado' }
    } catch (err) {
        console.log("Error al guardar: ", err)
    }
}



const updateProduct = async (product, ident) => {
    const arrayProducts = await getProducts()
    const id = parseInt(ident.id)
    const { nombre, descripcion, codigo, url, precio, stock } = product
    const stamp = new Date().toLocaleString("en-GB")
    const updated = { id: id, timestamp: stamp, nombre: nombre, descripcion: descripcion, codigo: codigo, url: url, precio: precio, stock: stock }

    const actualizado = JSON.stringify(arrayProducts.find(e => e.id === id))
    const index = arrayProducts.findIndex(e => e.id === id)

    if (actualizado) {
        arrayProducts[index] = updated
        try {
            await fs.promises.writeFile(route, JSON.stringify(arrayProducts, null, 2))
            return ({ estado: 'actualizado' })
        } catch (err) {
            console.log("Error al guardar: ", err)
        }
    } else {
        return ({ error: 'producto no encontrado' })
    }
}



const deleteProduct = async (ident) => {
    const arrayProducts = await getProducts()
    const id = parseInt(ident.id)
    const index = arrayProducts.findIndex(e => e.id === id)

    if (index != -1) {
        try {
            const borrado = arrayProducts.filter(e => e.id != id)
            await fs.promises.writeFile(route, JSON.stringify(borrado, null, 2))
            return ({ estado: 'producto eliminado' })
        } catch (err) {
            console.log("Error al guardar: ", err)
        }
    } else {
        return ({ error: 'producto no encontrado' })
    }
}



const getProductById = async (ident) => {
    const arrayProducts = await getProducts()
    const id = parseInt(ident.id)
    const hallado = (arrayProducts.find(e => e.id === id))
    if (hallado) {
        return hallado
    } else {
        return ({ error: 'producto no encontrado' })
    }
}



module.exports = {
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductById
}
