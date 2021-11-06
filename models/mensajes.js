// Almacenamiento de mensajes

const messages = [
    { autor: 'server', texto: 'Conectado al chat' }
];

const getMessages = () => messages;

const saveMessage = mensaje => {
    messages.push(mensaje);
}

module.exports = {
    getMessages,
    saveMessage
}