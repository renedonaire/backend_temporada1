const mysql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'testDb'
    }
}


const sqlite3 = {
    client: 'sqlite3',
    connection: { filename: 'storage/mensajes.sqlite3' },
    useNullAsDefault: true
}

module.exports = { mysql, sqlite3 }
