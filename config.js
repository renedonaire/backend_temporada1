// El valor de esta variable determina el tipo de persistencia
// Puede ser 'memoria', 'file', 'mongodb' o 'firebase'
const PERS = 'firebase'

export default {
    PERS,
    fileSystem: {
        path: './storage'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://coderhouse:coderhouse@cluster0.o0eqf.mongodb.net/coderhouse?retryWrites=true&w=majority',
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
