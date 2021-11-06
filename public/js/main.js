const socket = io.connect();

socket.on('messages', data => {
    renderMessages(data)
})

socket.on('products', data => {
    renderProducts(data)
})


// Metodo para agregar productos
const addProduct = () => {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value

        ,
    }
    socket.emit('new-product', product);

    // Limpiamos los campos de texto
    document.getElementById('title').value = ''
    document.getElementById('price').value = ''
    document.getElementById('thumbnail').value = ''
    return false
}



// Metodo para agregar mensajes
const addMessage = () => {
    const mensaje = {
        autor: document.getElementById('userName').value,
        texto: document.getElementById('texto').value
    }
    socket.emit('new-message', mensaje);

    // Limpiamos los campos de texto
    document.getElementById('userName').value = ''
    document.getElementById('texto').value = ''
    return false
}

// Metodo que me renderiza los mensajes en el DOM
const renderMessages = (messages) => {
    const html = messages.map((element, index) => {
        return (`
            <div>
                <strong>${index} - ${element.autor}</strong>: 
                <em>${element.texto}</em> 
            </div>
            `)
    }).join(' ')
    document.getElementById('mensajes').innerHTML = html;
}

// Metodo que me renderiza los productos en el DOM
const renderProducts = (products) => {
    const html = products.map((element) => {
        return (`
            <tr>
                <td> ${element.title} </td>
                <td> ${element.price} </td>
                <td>
                    <img src=" ${element.thumbnail} " width="50" height="auto" alt="miniatura no disponible">
                </td>
            </tr>
        `)
    }).join(' ')
    document.getElementById('productos').innerHTML = html;
}
