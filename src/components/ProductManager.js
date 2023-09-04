import {promises as fs} from "fs"


export default class ProductManager {
    constructor() {
        this.patch = './productos.txt'
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock,
            id: ProductManager.id
        }
        //console.log(newProduct)
        this.products.push(newProduct)
        
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async() => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta1 = await fs.readFile(this.patch, 'utf8')
        console.log(JSON.parse(respuesta1));
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        let buscar = respuesta3.find(product => product.id === id)
        if(!buscar){
            console.log("Producto no encontrado")
        }else{
            console.log(buscar)
        }
    }

    deleteProductsById = async(id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("el elemento fue eliminado");
    
    }

    updateProduct = async({id, ...producto}) => {
        await this.deleteProductsById(id);
        let prodOld = await this.readProducts()
        let prodModificado = [{...producto, id}, ...prodOld];
        await fs.writeFile(this.patch, JSON.stringify(prodModificado))
        console.log("Producto modificado")
    }


}



//const productos = new ProductManager();

// 1- crear archivo txt y los elementos del array con los datos siguientes descomentar crear y comentar para que no interfiera 

// productos.addProduct("Rojo1", "description1", 1000, "thumbnail1", "npm1", 10);
// productos.addProduct("Azul2", "description2", 2000, "thumbnail2", "npm2", 20);
// productos.addProduct("Verde3", "description3", 3000, "thumbnail3", "npm3", 30);
// productos.addProduct("Blanco4", "description4", 4000, "thumbnail4", "npm4", 40);
// productos.addProduct("Amarillo5", "description5", 5000, "thumbnail5", "npm5", 50);
// productos.addProduct("Naranja6", "description6", 6000, "thumbnail6", "npm6", 60);
// productos.addProduct("Violeta7", "description7", 7000, "thumbnail7", "npm7", 70);
// productos.addProduct("Gris8", "description8", 8000, "thumbnail8", "npm8", 80);
// productos.addProduct("Marron9", "description9", 9000, "thumbnail9", "npm9", 90);
// productos.addProduct("Rosado10", "description10", 11000, "thumbnai20", "npm10", 100);


//2- Lee los archivos que contiene productos.txt en formato de array y los muestra 
//productos.getProducts()