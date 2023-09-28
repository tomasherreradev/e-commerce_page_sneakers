document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
  });
  
  function iniciarApp() {
    mostrarGaleria();
    incrementarInput();
    menuMobile();
  }
  
  function mostrarGaleria() {
    const galeria = document.querySelector('#images__items');
    generarGaleria(galeria);
  }
  
  function incrementarInput() {
    const input = document.querySelector('#input-amount');
    const inputSum = document.querySelector('#input-sum');
    const inputMin = document.querySelector('#input-min');
  
    inputSum.addEventListener('click', () => {
      input.value++;
    });
  
    inputMin.addEventListener('click', () => {
      if (input.value > 0) {
        input.value--;
      }
    });
  }
  
  function menuMobile() {
    const menuBtn = document.querySelector('#menu-icon');
    const menuContainer = document.createElement('ASIDE');
    menuContainer.classList.add('mobile_navi');
    menuContainer.innerHTML = `
      <div class="mobile-links">
        <a href="#" class="link">Collections</a>
        <a href="#" class="link">Men</a>
        <a href="#" class="link">Women</a>
        <a href="#" class="link">About</a>
        <a href="#" class="link">Contact</a>
      </div>
    `;
  
    const toggleMenu = (e) => {
      e.stopPropagation();
      menuContainer.classList.toggle('open');
    };
  
    const closeMenu = (e) => {
      const isClickInsideMenu = menuContainer.contains(e.target);
      if (!isClickInsideMenu && menuContainer.classList.contains('open')) {
        menuContainer.classList.remove('open');
      }
    };
  
    menuBtn.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenu);
    document.querySelector('body').appendChild(menuContainer);
  }
  
  function mostrarImagen(id) {
    const modalAnterior = document.querySelector('.contenedor-modal');
    if (modalAnterior) {
      modalAnterior.remove();
    }
  
    const contenedorModal = document.createElement('DIV');
    contenedorModal.classList.add('contenedor-modal');
    contenedorModal.innerHTML = `
      <img class="img_modal_grande border-radius" src="/images/image-product-${id}.jpg" alt="producto" data-id=${id}>
      <div class="buttons-container">
        <span class="modal__min"></span>
        <span class="modal__max"></span>
      </div>
    `;
  
    const modalFood = document.createElement('DIV');
    modalFood.classList.add('modal__items', 'center');
    generarGaleria(modalFood);
  
    const cerrarModal = document.createElement('P');
    cerrarModal.classList.add('cerrar-modal');
    cerrarModal.textContent = 'x';
    cerrarModal.addEventListener('click', ocultarModal);
  
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.appendChild(modalFood);
    modal.appendChild(cerrarModal);
  
    contenedorModal.appendChild(modal);
    contenedorModal.appendChild(modalFood);
    contenedorModal.appendChild(cerrarModal);
  
    document.body.appendChild(contenedorModal);
    document.body.classList.add('not-scroll');
  
    document.querySelector('.modal__min').addEventListener('click', imgAnterior);
    document.querySelector('.modal__max').addEventListener('click', imgSiguiente);
  }
  
  function generarGaleria(parent, clase = 'default-class') {
    for (let i = 1; i < 5; i++) {
      const contenedorImg = document.createElement('DIV');
      contenedorImg.classList.add('contenedor-img');
  
      const imagen = document.createElement('IMG');
      imagen.setAttribute('loading', 'lazy');
      imagen.setAttribute('width', '200');
      imagen.setAttribute('height', '300');
      imagen.setAttribute('src', `/images/image-product-${i}-thumbnail.jpg`);
      imagen.setAttribute('alt', 'img');
      imagen.classList.add('border-radius');
  
      contenedorImg.appendChild(imagen);
      parent.appendChild(contenedorImg);
  
      imagen.addEventListener('click', () => mostrarImagen(i));
    }
  }
  
  function ocultarModal() {
    const contenedorModal = document.querySelector('.contenedor-modal');
    if (contenedorModal) {
      contenedorModal.remove();
      document.body.classList.remove('not-scroll');
    }
  }
  
  function cambiarImagen(direccion) {
    const contenedorModal = document.querySelector('.contenedor-modal');
    if (contenedorModal) {
      const img = document.querySelector('.img_modal_grande');
      let id = parseInt(img.getAttribute('data-id'));
  
      if (direccion === 'anterior') {
        id = Math.max(id - 1, 1);
      } else {
        id = Math.min(id + 1, 4);
      }
  
      img.setAttribute('src', `/images/image-product-${id}.jpg`);
      img.setAttribute('data-id', id);
  
      const modalFood = document.querySelector('.modal__items');
      if (modalFood) {
        modalFood.innerHTML = '';
        generarGaleria(modalFood, 'selected');
      }
    }
  }
  
  function imgAnterior() {
    cambiarImagen('anterior');
  }
  
  function imgSiguiente() {
    cambiarImagen('siguiente');
  }
  