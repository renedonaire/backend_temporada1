const socket = io.connect();

socket.on('messages', data => {
    console.log(data)
    renderMessages(data)
})

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

    console.log(html)

    document.getElementById('mensajes').innerHTML = html;
}
