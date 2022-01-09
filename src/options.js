const mysql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'Coderhouse_123',
        password: 'Coderhouse_123',
        database: 'Coderhouse_BD'
    }
}


const sqlite3 = {
    client: 'sqlite3',
    connection: { filename: 'storage/mensajes.sqlite3' },
    useNullAsDefault: true
}


const mongodb = "mongodb+srv://coderhouse:coderhouse@cluster0.o0eqf.mongodb.net/coderhouse?retryWrites=true&w=majority"


module.exports = { mysql, sqlite3, mongodb }
