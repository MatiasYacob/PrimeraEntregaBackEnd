const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const port = 8080; 

const manager = new ProductManager('products.json'); // Instancia de la clase ProductManager

// Ruta para obtener productos con un límite opcional
app.get('/products', (req, res) => {
    const { limit } = req.query;
    let productsToSend = manager.getProducts();

    if (limit) {
        const parsedLimit = parseInt(limit);
        if (!isNaN(parsedLimit)) {
            productsToSend = productsToSend.slice(0, parsedLimit);
        }
    }

    res.json(productsToSend);
});
// Ruta para obtener un producto por ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = manager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
