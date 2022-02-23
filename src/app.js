const express = require('express');
const { Server } = require('socket.io');
const productRouter = require('./routes/products')
const ProductManager = require('./Manager/products')
const LogManager = require('./Manager/log')

const productService = new ProductManager()
const logService = new LogManager()

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{console.log(`Listening on ${PORT}`)});
const io = new Server(server)

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'))

app.use('/',productRouter)


io.on('connection', async socket=>{
    console.log('new user')

    let log = await (await logService.get()).payload
    let products = await productService.get()
    io.emit('productLog',products)
    io.emit('log',log)

    socket.on('sendProduct', async data=>{
        let products = await productService.get()
        io.emit('productLog',products)
    })

    socket.on('message',async data=>{
        console.log(data)
        await logService.add(data)
        .then(r=>console.log(r))
    })
})
