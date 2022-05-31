const express = require('express');
const app = express();
const prodRouter = require('./src/routes/productos.js');
const cartRouter = require('./src/routes/carrito.js')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', prodRouter);
app.use('/api/carrito', cartRouter);

app.listen(8080, () => {
    console.log('Server on port 8080');
})
