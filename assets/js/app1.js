const productos = [{
        id: 1,
        precio: 90000,
        nombre: 'Audífonos',
        descripcion: 'Audífonos gamer',
        img: "/assets/img/headphones.png",
        cantidad: 1
    },
    {
        id: 2,
        precio: 120000,
        nombre: 'Consola',
        descripcion: 'Consola de videojuegos',
        img: "/assets/img/Video-Game-Console-2-4G-Double-Wireless-Controller-Game-Stick-4K-10000-Games-64-32GB-Retro.jpg_220x220xz.jpg_.webp",
        cantidad: 1
    },
    {
        id: 3,
        precio: 30000,
        nombre: 'Gameboy',
        descripcion: 'Consola Gameboy retro',
        img: "/assets/img/Retro-Portable-Mini-Handheld-Video-Game-Console-8-Bit-3-0-Inch-Color-LCD-Kids-Color.jpg_220x220xz.jpg_.webp",
        cantidad: 1
    },
];

const contenedor = document.querySelector('#contenido-tienda');
const carrito = JSON.parse(localStorage.getItem("Lista")) || [];

const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const carritoBoton = document.querySelector('#carritoo');

const updateCartView = () => {
    modal.innerHTML = "";
    modal.style.display = "block";
    overlay.style.display = "block";

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('header-modal');

    const modalClose = document.createElement('button');
    modalClose.classList.add('Cerrar-modal');
    modalClose.innerText = "❌";

    const modalTitle = document.createElement('div');
    modalTitle.innerHTML = '<h2>Carrito</h2>';
    modalTitle.classList.add('modal-title');

    modalClose.addEventListener('click', () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    });

    const footerModal = document.createElement('div');
    footerModal.classList.add('footer-modal');

    const vaciarCarrito = document.createElement('button');
    vaciarCarrito.classList.add('vaciar-carrito');
    vaciarCarrito.innerText = "Vaciar Carrito";

    let total = 0;
    const valorCompleto = document.createElement('div');
    valorCompleto.classList.add('precio-final');

    vaciarCarrito.addEventListener('click', () => {
        const removers = document.querySelectorAll('.modal-body');
        removers.forEach((remover) => {
            modal.removeChild(remover);
        });

        localStorage.clear();
        carrito.length = 0;
        total = 0;
        valorCompleto.innerHTML = `TOTAL: $${total}`;
    });

    modalHeader.appendChild(modalClose);
    modalHeader.appendChild(modalTitle);
    modal.appendChild(modalHeader);
    footerModal.appendChild(valorCompleto);

    carrito.forEach((element) => {
        const modalbody = document.createElement('div');
        modalbody.classList.add('modal-body');
        modalbody.innerHTML = `
        <div class='producto'>
            <img class="product-img" src="${element.img}">
            <div class='product-info'>
                <h4>${element.nombre}</h4>
            </div>
            <div class='cantidad'>
                <span class="cantidad-btn-decrease" data-id="${element.id}">➖</span>
                <span class="cantidad-input">${element.cantidad}</span>
                <span class="cantidad-btn-increase" data-id="${element.id}">➕</span>
            </div>
            <div class="precio">$${element.precio * element.cantidad}</div>
            <input type="button" value="Borrar" class="borrar-producto-modal" data-id="${element.id}">
        </div>`;

        modal.appendChild(modalbody);

        const cantidadDecreaseBtn = modalbody.querySelector('.cantidad-btn-decrease');
        cantidadDecreaseBtn.addEventListener('click', () => {
            const productId = parseInt(cantidadDecreaseBtn.getAttribute('data-id'));
            decreaseQuantity(productId);
        });

        const cantidadIncreaseBtn = modalbody.querySelector('.cantidad-btn-increase');
        cantidadIncreaseBtn.addEventListener('click', () => {
            const productId = parseInt(cantidadIncreaseBtn.getAttribute('data-id'));
            increaseQuantity(productId);
        });

        const borrarProductoBtn = modalbody.querySelector('.borrar-producto-modal');
        borrarProductoBtn.addEventListener('click', () => {
            const productId = parseInt(borrarProductoBtn.getAttribute('data-id'));
            deleteProduct(productId);
        });

        const precioProducto = element.precio * element.cantidad;
        total += precioProducto;
    });

    valorCompleto.innerHTML = `TOTAL: $${total}`;
    modal.appendChild(valorCompleto);
    modal.appendChild(footerModal);
    footerModal.appendChild(vaciarCarrito);
};

carritoBoton.addEventListener('click', updateCartView);

productos.forEach((producto) => {
    const contenido = document.createElement('div');
    contenido.innerHTML = `<img src="${producto.img}">
<h3>${producto.nombre}</h3>
<p>$${producto.precio}</p>
<p>${producto.descripcion}</p> `;
    contenedor.appendChild(contenido);

    const botoncompra = document.createElement('button');
    botoncompra.innerText = 'Añadir al carrito';
    botoncompra.classList.add('añadir-carrito');
    contenido.appendChild(botoncompra);

    botoncompra.addEventListener('click', () => {
        addToCart(producto);
        localStorage.setItem("Lista", JSON.stringify(carrito));
    });
});

const addToCart = (product) => {
    const existingProduct = carrito.find((item) => item.id === product.id);
    if (existingProduct) {
        existingProduct.cantidad++;
    } else {
        carrito.push({
            id: product.id,
            precio: product.precio,
            nombre: product.nombre,
            descripcion: product.descripcion,
            img: product.img,
            cantidad: 1
        });
    }
};

const decreaseQuantity = (productId) => {
    const product = carrito.find((item) => item.id === productId);
    if (product && product.cantidad > 1) {
        product.cantidad--;
        updateCartView();
        localStorage.setItem("Lista", JSON.stringify(carrito));
    }
};

const increaseQuantity = (productId) => {
    const product = carrito.find((item) => item.id === productId);
    if (product) {
        product.cantidad++;
        updateCartView();
        localStorage.setItem("Lista", JSON.stringify(carrito));
    }
};

const deleteProduct = (productId) => {
    const index = carrito.findIndex((item) => item.id === productId);
    if (index !== -1) {
        carrito.splice(index, 1);
        updateCartView();
        localStorage.setItem("Lista", JSON.stringify(carrito));
    }
};