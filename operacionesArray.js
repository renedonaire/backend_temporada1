const productos = [
    { id: 1, nombre: 'Escuadra', precio: 323.45 },
    { id: 2, nombre: 'Calculadora', precio: 234.56 },
    { id: 3, nombre: 'Globo Terráqueo', precio: 45.67 },
    { id: 4, nombre: 'Paleta Pintura', precio: 456.78 },
    { id: 5, nombre: 'Reloj', precio: 67.89 },
    { id: 6, nombre: 'Agenda', precio: 78.90 }
]

const nombres = (productos) => {
    let result = productos.map(p => p.nombre)
    return result
}

const precioTotal = (productos) => {
    let result = productos.reduce((total, product) => product.precio + total, 0)
    return parseFloat(result).toFixed(2)
}

const precioPromedio = (productos) => {
    let result = precioTotal(productos) / productos.length
    return parseFloat(result).toFixed(2)
}

const menorPrecio = (productos) => {
    return productos.reduce((min, curr) => (curr.precio < min.precio ? curr : min), productos[0])
}

const mayorPrecio = (productos) => {
    return productos.reduce((max, curr) => (curr.precio > max.precio ? curr : max), productos[0])
}

console.log(nombres(productos))
console.log(precioTotal(productos))
console.log(precioPromedio(productos))
console.log(menorPrecio(productos))
console.log(mayorPrecio(productos))
