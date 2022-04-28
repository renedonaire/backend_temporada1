// El valor de esta variable determina el tipo de persistencia
// Puede ser 'memoria', 'file', 'mongodb' o 'firebase'
const PERS = 'memoria'

export default {
    PERS,
    fileSystem: {
        path: './storage'
    },
    mongodb: {
        cnxStr: '',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        cnxStr: './src/daos/fbConnect.json'
    }
}
