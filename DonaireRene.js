class Usuario {
    constructor(nombre, apellido, libros, mascotas) { 
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return this.nombre + ' ' + this.apellido
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(libro, autor) {
        this.libros.push({"libro":libro, "autor":autor})
    }

    getBookNames() {
        return this.libros.map(e => e.libro)
    }
}


const usuario1 = new Usuario("rene", "donaire", [], ["perro", "gato"])

console.log(usuario1)
console.log(usuario1.getFullName())

usuario1.addMascota("pez")
console.log(usuario1.mascotas)

console.log(usuario1.countMascotas())

usuario1.addBook("Mi primer libro", "Autor 1")
usuario1.addBook("Segundo libro", "Autor 2")
console.log(usuario1.getBookNames())
