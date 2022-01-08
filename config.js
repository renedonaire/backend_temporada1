const PERS = 'mongodb'

// export default {
//     PERS,
//     mongodb: {
//         cnxStr: 'mongodb+srv://coderhouse:coderhouse@cluster0.o0eqf.mongodb.net/coderhouse?retryWrites=true&w=majority',
//         options: {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             serverSelectionTimeoutMS: 5000,
//         }
//     }
// }

module.exports = {
    PERS,
    mongodb: {
        cnxStr: 'mongodb+srv://coderhouse:coderhouse@cluster0.o0eqf.mongodb.net/coderhouse?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}
