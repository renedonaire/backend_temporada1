class Usuario {
    constructor(nombre, apellido, libros, mascotas) { 
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(user) {
        return user.nombre + ' ' + user.apellido
    }

    addMascota(user, mascota) {
        user.mascotas.push(mascota)
    }

    countMascotas(user) {
        return user.mascotas.length
    }

    addBook(user, libro, autor) {
        user.libros.push([{"libro":libro, "autor":autor}])
    }

    getBookNames(user) {
        return user.libros.libro
    }
}

const usuario1 = new Usuario("rene", "donaire", [], [])
console.log(usuario1)
