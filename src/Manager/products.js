const fs = require('fs'); //Importo fileSystem para manejar archivos

// direccion donde se van a guardar los productos
const pathToProducts = __dirname+'/../files/products.json'

// Clase productManager para crear los metodos de manejo de productos
class ProductManager{

    // Obtener todos los productos
    get = async () =>{
        if(fs.existsSync(pathToProducts)){
            try {
                let data = await fs.promises.readFile(pathToProducts,'utf-8')
                let products = JSON.parse(data)
                return {status:'success',payload:products}
            } catch (error) {
                return {status:'error',error:error}
            }
        }
        else {
            return {status:'success',payload:[]}
        }
    }

    //Obetener producto por ID
    getById = async (id) => {
        if(!id) return {status: 'error', error:'Id needed'}
        if(fs.existsSync(pathToProducts)){
            try {
                let data = await fs.promises.readFile(pathToProducts,'utf-8')
                let products = JSON.parse(data)
                if(id > products.length) return {status:'error',error:'Invalid ID'}
                let product = products.find(product => product.id == id )
                return {status:'success',payload:product}
            } catch (error) {
                return {status:'error', error:error}
            }
        }
        else {
            return {status:'success',payload:[]}
        }
    }

    // Agregar producto y asignarle un ID
    add = async (product) => {
        if(fs.existsSync(pathToProducts)){
            try {
                let data = await fs.promises.readFile(pathToProducts,'utf-8')
                let products = JSON.parse(data)
                if(products.length == 0){
                    product.id = 1
                    products.push(product)
                    await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))
                    return {status:'success', message:'PRODUCT SUCCESSFULLY ADDED'}
                }
                else {
                    product.id = products[products.length-1].id+1
                    products.push(product)
                    await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))
                    return {status:'success', message:'PRODUCT SUCCESSFULLY ADDED'}
                }
            } 
            catch (error) {
                return {status:'error', error:error}
            }
        }
        else {
            try {
                product.id = 1
                await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2))
                return {status:'success', message:'PRODUCT SUCCESSFULLY ADDED'}
            } 
            catch (error) {
                return {status:'error', error:error}
            }
        }
    }

    // Actualiza un producto segun ID
    updateById = async (id, updatedProduct) => {
        if(!id) return {status: 'error', error:'Id needed'}
        if(fs.existsSync(pathToProducts)){
            try {
               let data = await fs.promises.readFile(pathToProducts,'utf-8')
               let products = JSON.parse(data)
               if(id > products.length) return {status:'error',error:'Invalid ID'}
               let newProducts = products.map((product)=>{
                   if(product.id == id) {
                       updatedProduct.thumbnail = product.thumbnail
                       updatedProduct.id = id
                       return updatedProduct
                   } 
                   else {
                       return product
                   }
               })
               await fs.promises.writeFile(pathToProducts,JSON.stringify(newProducts,null,2)) 
               return {status:'success', message:'PRODUCT UPDATED'}
            } 
            catch (error) {
                return {status:'error', error:error}
            }
        }
    }

    // Elimina un producto segun ID
    deleteById = async (id) => {
        if(!id) return {status: 'error', error:'Id needed'}
        if(fs.existsSync(pathToProducts)) {
            try {
                let data = await fs.promises.readFile(pathToProducts,'utf-8')
                let products = JSON.parse(data)
                if(id > products.length) return {status:'error',error:'Invalid ID'}
                let newProducts = products.filter(product => product.id != id)
                newProducts.map(product=>{
                    product.title = product.title
                    product.price = product.price
                    product.thumbnail = product.thumbnail
                    product.id = newProducts.indexOf(product)+1
                })
                await fs.promises.writeFile(pathToProducts,JSON.stringify(newProducts,null,2))
                return{status:'success'}
            } 
            catch (error) {
                return {status:'error', error:error}
            }
        }
    }
}


module.exports = ProductManager