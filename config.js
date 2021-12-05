// El valor de esta variable determina el tipo de persistencia
const PERS = 'mongodb'

export default {
    PERS,
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'srv+mongodb://xxxxxxxxxxxxxxxxxxx',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
    }
}