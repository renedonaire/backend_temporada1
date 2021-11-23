// import knex from 'knex';
const knex = require('knex')


class Mensajes {
    constructor(config) {
        this.knex = knex(config);
    }

    crearTablaMensajes() {
        return this.knex.schema.dropTableIfExists('mensajes')
            .then(() => {
                return this.knex.schema.createTable('mensajes', table => {
                    table.increments('id').primary();
                    table.string('autor', 50).notNullable();
                    table.string('texto', 100).notNullable();
                    table.date('fecha', new Date())
                })
            })
    }

    cerrarBDMensajes() {
        return this.knex.destroy()
    }

    insertarMensajes(mensajes) {
        return this.knex('mensajes').insert(mensajes)
    }

    listarMensajes() {
        return this.knex('mensajes').select('*')
    }
}

// export default Animales
module.exports = { Mensajes }
