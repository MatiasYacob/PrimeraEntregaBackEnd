const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.loadProductsFromDisk();
    }

    // Cargar productos desde el archivo al inicializar la instancia
    loadProductsFromDisk() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    // Guardar productos en el archivo
    saveProductsToDisk() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }

    addProduct(producto) {
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }
    
        // Verificar si ya existe un producto con el mismo nombre
        if (this.products.some((p) => p.title === producto.title)) {
            console.log("El producto ya existe.");
            return;
        }
    
        // Asignar un id autoincrementable
        producto.id = this.getNextProductId();
    
        this.products.push(producto);
        this.saveProductsToDisk();
        console.log("Producto agregado exitosamente.");
    }
    

    updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            // Mantener el mismo ID
            updatedProduct.id = id;
            this.products[productIndex] = updatedProduct;
            this.saveProductsToDisk();
            return updatedProduct;
        } else {
            return null; // Producto no encontrado
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProductsToDisk();
            return true; // Producto eliminado con éxito
        } else {
            return false; // Producto no encontrado
        }
    }

    getNextProductId() {
        if (this.products.length === 0) {
            return 1;
        } else {
            const maxId = Math.max(...this.products.map(product => product.id));
            return maxId + 1;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const producto = this.products.find((p) => p.id === id);
        return producto || null;
    }
}

// Creacion de una instancia de la clase "ProductManager"
const manager = new ProductManager('products.json');

// Llamando al metodo "getProducts" recien creada la instancia
console.log(manager.getProducts());
/*
// PROCESO DE TESTING:

// Creacion de una instancia de la clase "ProductManager"
const manager = new ProductManager('products.json');

// Llamando al metodo "getProducts" recien creada la instancia
console.log(manager.getProducts());

// Declaracion de un producto con los campos solicitados en Testing
const producto1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
};

// Llamando al metodo "addProduct"
manager.addProduct(producto1);

// Llamando al metodo "getProducts" nuevamente, ahora deberia mostrar el producto recien agregado
console.log(manager.getProducts());

// Ejemplo de actualizar un producto por ID
const updatedProduct = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 240,
};

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado
const productoEncontrado = manager.getProductById(1);
if (productoEncontrado) {
    console.log("Producto Encontrado: " + JSON.stringify(productoEncontrado));
}


// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto
manager.updateProduct(1, updatedProduct);

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto
const eliminacionExitosa = manager.deleteProduct(1); // Intenta eliminar el producto con ID 1

if (eliminacionExitosa) {
    console.log("Producto eliminado con exito.");
} else {
    console.log("No se pudo eliminar el producto.");
}

// Verificar que el producto se haya eliminado
console.log(manager.getProducts()); */
module.exports = ProductManager;
