//obejtos para el carrito jsjs
const productos = [{
            id: 1,
            precio: 2123445,
            nombre: 'Audifonos',
            descripcion: 'audifonos gamer',
            img: "/assets/img/headphones.png",
            cantidad: 1
        },
        {
            id: 2,
            precio: 123231,
            nombre: 'Consola',
            descripcion: 'audifonos no gamer',
            img: "/assets/img/Video-Game-Console-2-4G-Double-Wireless-Controller-Game-Stick-4K-10000-Games-64-32GB-Retro.jpg_220x220xz.jpg_.webp",
            cantidad: 1
        },
        {
            id: 3,
            precio: 349039,
            nombre: 'Gameboy',
            descripcion: 'audifonos ni gamer',
            img: "/assets/img/Retro-Portable-Mini-Handheld-Video-Game-Console-8-Bit-3-0-Inch-Color-LCD-Kids-Color.jpg_220x220xz.jpg_.webp",
            cantidad: 1
        }
    ]
    //recorrer este y hacer push a un nuevo arreglo :V
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
            img: producto.img,
            cantidad: producto.cantidad
        })

    })
});
//hacer el modal para el carrito :D
const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const carritoBoton = document.querySelector('#carritoo');

const displaycarrito = () => {
    modal.innerHTML = "";
    modal.style.display = "block";
    overlay.style.display = "block";
    //modal header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('header-modal');

    const modalClose = document.createElement('button');
    modalClose.classList.add('Cerrar-modal');
    modalClose.innerText = "❌";
    const modalTitle = document.createElement('div');
    modalTitle.innerHTML = '<h2>Carrito</h2>'
    modalTitle.classList.add('modal-title');



    modalClose.addEventListener('click', () => {
        modal.style.display = "none"
        overlay.style.display = "none"
    })

    modalHeader.appendChild(modalClose)
    modalHeader.appendChild(modalTitle);
    modal.appendChild(modalHeader)
        //modalbody-------------------------------------
    carrito.forEach((element) => {
        const modalbody = document.createElement('div');
        modalbody.classList.add('modal-body');
        modalbody.innerHTML = `
                <div class='producto'>
                <img class="product-img" src="${element.img}"></img>
                <div class='product-info'>
                    <h4>${element.nombre}</h4>
                </div>
                <div class='cantidad'>
                    <span class="cantidad-btn-decrease">➖</span>
                    <span class="cantidad-input">${element.cantidad}</span>
                    <span class="cantidad-btn-increase">➕</span>
                </div>
                <div class="precio">$${element.precio * element.cantidad}</div>
                <input type="button" value="Borrar" class="borrar-producto-modal">
                </div>
               
            `;
        modal.appendChild(modalbody)
    });


}

carritoBoton.addEventListener('click', displaycarrito);