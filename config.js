// El valor de esta variable determina el tipo de persistencia
// Puede ser 'memoria', 'file', 'mongodb' o 'firebase'

const PERS = 'file'

export default {
    PERS,
    fileSystem: {
        path: './storage'
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