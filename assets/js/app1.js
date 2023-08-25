const productos = [{
        id: 1,
        precio: 90000,
        nombre: 'Audífonos',
        descripcion: 'Audífonos gamer',
        img: "assets/img/headphones.png",
        cantidad: 1
    },
    {
        id: 2,
        precio: 120000,
        nombre: 'Consola',
        descripcion: 'Consola de videojuegos',
        img: "assets/img/Video-Game-Console-2-4G-Double-Wireless-Controller-Game-Stick-4K-10000-Games-64-32GB-Retro.jpg_220x220xz.jpg_.webp",
        cantidad: 1
    },
    {
        id: 3,
        precio: 30000,
        nombre: 'Gameboy',
        descripcion: 'Consola Gameboy retro',
        img: "assets/img/Retro-Portable-Mini-Handheld-Video-Game-Console-8-Bit-3-0-Inch-Color-LCD-Kids-Color.jpg_220x220xz.jpg_.webp",
        cantidad: 1
    },
];

const contenedor = document.querySelector('#contenido-tienda');
const carrito = JSON.parse(localStorage.getItem("Lista")) || [];

const superposicion = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const botonCarrito = document.querySelector('#carritoo');

const actualizarVistaCarrito = () => {
    modal.innerHTML = "";
    modal.style.display = "block";
    superposicion.style.display = "block";

    const encabezadoModal = document.createElement('div');
    encabezadoModal.classList.add('header-modal');

    const cerrarModal = document.createElement('button');
    cerrarModal.classList.add('Cerrar-modal');
    cerrarModal.innerText = "❌";

    const tituloModal = document.createElement('div');
    tituloModal.innerHTML = '<h2>Carrito</h2>';
    tituloModal.classList.add('modal-title');

    cerrarModal.addEventListener('click', () => {
        modal.style.display = "none";
        superposicion.style.display = "none";
    });

    const pieModal = document.createElement('div');
    pieModal.classList.add('footer-modal');

    const vaciarCarrito = document.createElement('button');
    vaciarCarrito.classList.add('vaciar-carrito');
    vaciarCarrito.innerText = "Vaciar Carrito";

    let total = 0;
    const valorTotal = document.createElement('div');
    valorTotal.classList.add('precio-final');

    vaciarCarrito.addEventListener('click', () => {
        const elementosModal = document.querySelectorAll('.modal-body');
        elementosModal.forEach((elemento) => {
            modal.removeChild(elemento);
        });

        localStorage.clear();
        carrito.length = 0;
        total = 0;
        valorTotal.innerHTML = `TOTAL: $${total}`;
    });

    encabezadoModal.appendChild(cerrarModal);
    encabezadoModal.appendChild(tituloModal);
    modal.appendChild(encabezadoModal);
    pieModal.appendChild(valorTotal);

    carrito.forEach((elemento) => {
        const cuerpoModal = document.createElement('div');
        cuerpoModal.classList.add('modal-body');
        cuerpoModal.innerHTML = `
        <div class='producto'>
            <img class="product-img" src="${elemento.img}">
            <div class='product-info'>
                <h4>${elemento.nombre}</h4>
            </div>
            <div class='cantidad'>
                <span class="cantidad-btn-disminuir" data-id="${elemento.id}">➖</span>
                <span class="cantidad-input">${elemento.cantidad}</span>
                <span class="cantidad-btn-incrementar" data-id="${elemento.id}">➕</span>
            </div>
            <div class="precio">$${elemento.precio * elemento.cantidad}</div>
            <input type="button" value="Borrar" class="borrar-producto-modal" data-id="${elemento.id}">
        </div>`;

        modal.appendChild(cuerpoModal);

        const btnDisminuirCantidad = cuerpoModal.querySelector('.cantidad-btn-disminuir');
        btnDisminuirCantidad.addEventListener('click', () => {
            const idProducto = parseInt(btnDisminuirCantidad.getAttribute('data-id'));
            disminuirCantidad(idProducto);
        });

        const btnIncrementarCantidad = cuerpoModal.querySelector('.cantidad-btn-incrementar');
        btnIncrementarCantidad.addEventListener('click', () => {
            const idProducto = parseInt(btnIncrementarCantidad.getAttribute('data-id'));
            incrementarCantidad(idProducto);
        });

        const btnBorrarProducto = cuerpoModal.querySelector('.borrar-producto-modal');
        btnBorrarProducto.addEventListener('click', () => {
            const idProducto = parseInt(btnBorrarProducto.getAttribute('data-id'));
            eliminarProducto(idProducto);
        });

        const precioProducto = elemento.precio * elemento.cantidad;
        total += precioProducto;
    });

    valorTotal.innerHTML = `TOTAL: $${total}`;
    modal.appendChild(valorTotal);
    modal.appendChild(pieModal);
    pieModal.appendChild(vaciarCarrito);
};

botonCarrito.addEventListener('click', actualizarVistaCarrito);

productos.forEach((producto) => {
    const contenido = document.createElement('div');
    contenido.innerHTML = `<img src="${producto.img}">
<h3>${producto.nombre}</h3>
<p>$${producto.precio}</p>
<p>${producto.descripcion}</p> `;
    contenedor.appendChild(contenido);

    const botonCompra = document.createElement('button');
    botonCompra.innerText = 'Añadir al carrito';
    botonCompra.classList.add('añadir-carrito');
    contenido.appendChild(botonCompra);

    botonCompra.addEventListener('click', () => {
        agregarAlCarrito(producto);
        localStorage.setItem("Lista", JSON.stringify(carrito));
    });
});

const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            precio: producto.precio,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            img: producto.img,
            cantidad: 1
        });
    }
};

const disminuirCantidad = (idProducto) => {
    const producto = carrito.find((item) => item.id === idProducto);
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        actualizarVistaCarrito();
        localStorage.setItem("Lista", JSON.stringify(carrito));
    }
};

const incrementarCantidad = (idProducto) => {
    const producto = carrito.find((item) => item.id === idProducto);
    if (producto) {
        producto.cantidad++;
        actualizarVistaCarrito();
        localStorage.setItem("Lista", JSON.stringify(carrito));
    }
};

const eliminarProducto = (idProducto) => {
    const indice = carrito.findIndex((item) => item.id === idProducto);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        actualizarVistaCarrito();
        localStorage.setItem("Lista", JSON.stringify(carrito));
    }
};