const fs = require('fs')
const path = require('path')

const route = path.join(__dirname, '../storage/mensajes.txt')

const messages = [
    { autor: 'server', texto: 'Conectado al chat', fecha: '' }
];


const getMessages = async () => {
    try {
        const result = await fs.promises.readFile(route, 'utf-8')
        return result
    } catch (err) {
        console.log('Error al obtener mensajes: ', err)
    }
}


const saveMessage = async message => {
    const arrayMessages = await getMessages()
    try {
        arrayMessages.unshift(message)
        await fs.promises.writeFile(route, JSON.stringify(arrayMessages, null, 2))
        return arrayMessages
    } catch (err) {
        console.log('Error al guardar: ', err)
    }
}

module.exports = {
    getMessages,
    saveMessage
}
