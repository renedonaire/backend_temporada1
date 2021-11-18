const fs = require("fs")
const path = require("path")

const { getProductById } = require('./modeloProductos')
const routeCarts = path.join(__dirname, "../data/carritos.txt")



const createCart = async () => {
    const stamp = new Date().toLocaleString("en-GB")
    const arrayCarts = await getCarts()
    let ident = 0
    let indexArray = []
    arrayCarts.forEach(element => indexArray.push(element.id))
    if (indexArray.length > 0) {
        const arraySorted = indexArray.sort((a, b) => (b - a))
        ident = arraySorted[0] + 1
    } else {
        ident = 1
    }
    const nuevo = { id: ident, timestamp: stamp, productos: [] }
    arrayCarts.unshift(nuevo)

    try {
        await fs.promises.writeFile(routeCarts, JSON.stringify(arrayCarts, null, 2))
        return { estado: 'carrito creado - ', ident }
    } catch (err) {
        console.log("Error al guardar: ", err)
    }
}



const getCarts = async () => {
    try {
        const result = await fs.promises.readFile(routeCarts, 'utf-8')
        return JSON.parse(result)
    } catch (err) {
        await fs.promises.writeFile(routeCarts, JSON.stringify([], null, 2))
        const result = await fs.promises.readFile(routeCarts, 'utf-8')
        return JSON.parse(result)
    }
}



const addProductById = async (cart, prod) => {
    const idProd = { "id": prod }
    const product = await getProductById(idProd)
    console.log("product: ", product, " - tipo: ", typeof product);

    // SALVAMOS el carro en una variable => getCartById
    const idCart = { "id": cart }
    const productosCarro = await getCartProductsById(idCart)
    console.log("productosCarro: ", productosCarro, " - tipo: ", typeof productosCarro);

    // CALCULAMOS EL CAMBIO  a una variable 
    let actualizado = []
    productosCarro.forEach(e => actualizado.push(e))
    actualizado.push(product)
    console.log("actualizado: ", actualizado);

    // LO ACTUALIZAMOS => updateCart
    const response = await updateCart(actualizado, cart)
}



const updateCart = async (cart, ident) => {
    const arrayCarts = await getCarts()
    const id = parseInt(ident)
    const productos = cart
    const stamp = new Date().toLocaleString("en-GB")
    const updated = { id: id, timestamp: stamp, productos: productos }
    console.log("updated: ", updated);

    const actualizado = JSON.stringify(arrayCarts.find(e => e.id === id))
    const index = arrayCarts.findIndex(e => e.id === id)

    if (actualizado) {
        arrayCarts[index] = updated
        try {
            await fs.promises.writeFile(routeCarts, JSON.stringify(arrayCarts, null, 2))
            return ({ estado: 'actualizado' })
        } catch (err) {
            console.log("Error al guardar: ", err)
        }
    } else {
        return ({ error: 'carrito no encontrado' })
    }
}



const deleteCart = async (ident) => {
    const arrayCarts = await getCarts()
    const id = parseInt(ident.id)
    const index = arrayCarts.findIndex(e => e.id === id)

    if (index != -1) {
        try {
            const borrado = arrayCarts.filter(e => e.id != id)
            await fs.promises.writeFile(routeCarts, JSON.stringify(borrado, null, 2))
            return ({ estado: 'carrito eliminado' })
        } catch (err) {
            console.log("Error al guardar: ", err)
        }
    } else {
        return ({ error: 'carrito no encontrado' })
    }
}



const getCartProductsById = async (ident) => {
    const arrayCarts = await getCarts()
    const id = parseInt(ident.id)
    const hallado = (arrayCarts.find(e => e.id === id))
    if (hallado) {
        return hallado.productos
    } else {
        return ({ error: 'carrito no encontrado' })
    }
}



const getCartById = async (ident) => {
    const arrayCarts = await getCarts()
    const id = parseInt(ident.id)
    const hallado = (arrayCarts.find(e => e.id === id))
    if (hallado) {
        return hallado
    } else {
        return ({ error: 'carrito no encontrado' })
    }
}



module.exports = {
    createCart,
    getCarts,
    deleteCart,
    getCartProductsById,
    addProductById,
    getCartById,
    updateCart
}
