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
    connection: { filename: './zoo.sqlite3' },
    useNullAsDefault: true
}

// export { mysql, sqlite3 }
module.exports = { mysql, sqlite3 }
