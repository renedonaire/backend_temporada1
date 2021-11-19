# INSTRUCCIONES

## Ruta '/api/productos/' 
### Ajuste nivel de user: folder 'data' - archivo 'userLevel.js'

GET: '/'
Lista todos los productos disponibles (disponible para usuarios y administradores)

GET: '/:id'
Obtiene un producto por su id (disponible para usuarios y administradores)

POST: '/'
Para incorporar productos al listado (disponible sólo para administradores)
El producto debe ser en formato
    { "nombre": string, "descripcion": descripcion, "codigo": string, "url": string, "precio": number, "stock": number }
pues 'id' y 'timestamp' son agregados automáticamente.

PUT: '/:id'
Actualiza un producto por su id (disponible sólo para administradores)
El producto debe ser en formato
    { "nombre": string, "descripcion": descripcion, "codigo": string, "url": string, "precio": number, "stock": number }
pues 'id' y 'timestamp' son agregados automáticamente.

DELETE: '/:id'
Borra un producto por su id (disponible para administradores)