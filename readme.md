# Segunda Entrega

## Credenciales
**MongoDB:**
Se encuentra en el archivo *config.js*

**Firebase**
Se encuentra en el archivo* ./src/daos/fbConnect.json*

## End Points
En el archivo *main.js*  se encuentra la configuración del puerto.
- /api/productos/
- /api/carritos/

## Formatos
**Producto:**
   ```json
 {
    	'id': (único, asignado al guardar el producto)
    	'producto': string,
    	'precio': number
    }
```
**Carrito:**
   ```json
 {
    	'id': (único, asignado al guardar el carrito),
    	'productos':
    		[ (array de productos) ]
    }
```

## Métodos
#### /get
Lista todos los productos / carritos

#### get/id
Devuelve un producto / carrito específico

#### post
Guarda un producto / carrito.
**Requiere un producto / carrito sin 'id', ya que esta se asigna al momento de guardar.**

#### put/id
Actualiza un producto / carrito.
**Requiere un producto / carrito correctamente formado, incluso con su correspondiente 'id'.**

#### delete/id
Elimina un producto / carrito específico.

## To - Do
- Validar formato de productos / carritos antes de guardar o actualizar.

## Esquema de estructura
![Esquema](https://github.com/renedonaire/backend/blob/Segunda_Entrega/images/Segunda_Entrega.jpg "Esquema")