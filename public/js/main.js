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
    const usuario = document.getElementById('email').value
    const fecha = new Date().toLocaleString("en-GB")
    const mensaje = {
        autor: document.getElementById('email').value,
        texto: document.getElementById('texto').value,
        fecha: fecha
    }
    socket.emit('new-message', mensaje);

    document.getElementById('email').value = usuario
    document.getElementById('texto').value = ""

    return false
}

// Metodo que me renderiza los mensajes en el DOM
const renderMessages = (messages) => {
    if (messages.lenght>0) {
        const html = messages.map((element) => {
            return (`
                <p>
                <span style="color:blue;"><b>${element.autor}</b></span>
                <span style="color:brown;">[${element.fecha}]</span>
                <span style="color:green;"><i>${element.texto}</i></span>
                </p> 
                `)
        }).join(' ')
        document.getElementById('mensajes').innerHTML = html;
    } else {
        document.getElementById('mensajes').innerHTML = "No hay mensajes"
    }
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
