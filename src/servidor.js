import express, { response } from "express";
import ProductManager from "./components/ProductManager.js";

const servidorWeb = express();
servidorWeb.use(express.urlencoded({ extended: true}));

const productos = new ProductManager();
const readProducts = productos.readProducts();


servidorWeb.get('/products', async (req, res) => {

    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts);
    let todosLosProductos = await readProducts
    let productLimit = todosLosProductos.slice(0, limit);    
    res.send(productLimit);
})

servidorWeb.get('/products/:id', async (req, res) =>{
    let id = parseInt(req.params.id);
    let todosLosProductos = await readProducts;
    let productById = todosLosProductos.find(product => product.id === id);
    res.send(productById);
});

const PORT = 8080;
const server = servidorWeb.listen(PORT, ()=>{
    console.log(`Express por Local Host ${server.address().port} `)
});
server.on("error", (error) => console.log(`Error del servidor ${error}`))

//npm run servidor
//localhost:8080/products                   para ver todos los productos
//localhost:8080/products/5                 para ver los productos por id
//localhost:8080/products/?limit=4          para ver una canidad de productos por limite

