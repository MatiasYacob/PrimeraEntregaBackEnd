//Imports

import express from 'express';
import productRouter from './src/routes/product.router.js';
import cartRouter from './src/routes/cart.router.js';

//Constantes
const app = express();
const port = 8080;


//Mpiddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.get('/', (req, res) => {
    res.json({
        mensaje: "Bienvenpido"
    })
})


app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)




app.listen(port, () => console.log(`Servpidor Express corriendo en el puerto ${port}`));