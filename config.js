// El valor de esta variable determina el tipo de persistencia
// Puede ser 'file', 'firebase', 'mongodb' o 'memoria'

const PERS = 'memoria'

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