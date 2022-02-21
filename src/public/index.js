const socket = io()

// Formulario de ingreso de productos
let form = document.getElementById('productForm')
const handleSubmit = (e,form,route)=>{
    e.preventDefault()
    let formData = new FormData(form)
    fetch(route,{
        method:'POST',
        body:formData
    }).then(r=>r.json()).then(json=>console.log(json))
    socket.emit('sendProduct')
    form.reset()
}

form.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/'))

socket.on('productLog',data=>{
    console.log(data)

    let products = data.payload
    let productsTemplate = document.getElementById('productsTemplate')
    fetch('templates/products.ejs').then(r=>{
        return r.text()
    }).then(template =>{
        const html = ejs.render(template,{products:products})
        productsTemplate.innerHTML = html
    })

})