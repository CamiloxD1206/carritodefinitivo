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

    const modalTitle = document.createElement('div');
    modalTitle.innerHTML = '<h3>Carrito</h3>'
    modalTitle.classList.add('modal-title');

    const modalClose = document.createElement('button');
    modalClose.classList.add('Cerrar-modal');
    modalClose.innerText = "Cerrar";

    modalClose.addEventListener('click', () => {
        modal.style.display = "none"
        overlay.style.display = "none"
    })

    modalHeader.appendChild(modalClose)
    modalHeader.appendChild(modalTitle);
    modal.appendChild(modalHeader)
    console.log(modalHeader)
}

carritoBoton.addEventListener('click', displaycarrito);