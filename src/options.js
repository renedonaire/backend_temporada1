const mysql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'coder',
        password: 'coder',
        database: 'storage/productos.mdb'
    }
}


const sqlite3 = {
    client: 'sqlite3',
    connection: { filename: 'storage/mensajes.sqlite3' },
    useNullAsDefault: true
}

module.exports = { mysql, sqlite3 }
