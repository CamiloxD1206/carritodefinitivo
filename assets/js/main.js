const contenedor = document.querySelector('#contenido-tienda');
const carrito = [];
productos.forEach((producto) => {
    const contenido = document.createElement('div')
    contenido.innerHTML = `<img src="${producto.img}">
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    <p>${producto.descripcion}</p> `;

    contenedor.appendChild(contenido);
    const botoncompra = document.createElement('button');
    botoncompra.innerText = 'Añadir al carrito';
    botoncompra.classList.add('añadir-carrito')
    contenido.appendChild(botoncompra);
    botoncompra.addEventListener('click', () => {
        carrito.push({
            id: producto.id,
            precio: producto.precio,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            img: producto.img
        })
        console.log(carrito)
    })
});