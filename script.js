// Definir los textos asociados a cada botón
var textos = {
    // Contenido para "MÁS EFICIENCIA" (Misión, enfocada en resultado)
    'texto1': 'Impulsamos la modernización de su gestión municipal con soluciones digitales que transforman datos en decisiones inteligentes. Nuestro enfoque facilita el control y la optimización de procesos, permitiéndole actuar con rapidez y precisión en la implementación de políticas públicas que mejoran la eficiencia.',
    // Contenido para "MÁS TRANSPARENCIA" (Visión, enfocada en resultado)
    'texto2': 'Nuestra visión es establecer un estándar de excelencia en la gestión pública a través de herramientas tecnológicas avanzadas que no solo optimizan los procesos administrativos, sino que también impulsan la transparencia total y la participación ciudadana. Así, nos comprometemos a mejorar la calidad de vida con servicios públicos más claros y accesibles.',
    // Contenido para "DATOS INTELIGENTES" (Valores, enfocados en resultado)
    'texto3': 'La innovación, la transparencia y la eficiencia son nuestros pilares para transformar la gestión municipal. Nos centramos en convertir sus datos en información útil e inteligente que optimice la toma de decisiones, garantizando el bienestar cotidiano de la comunidad basado en hechos concretos.'
};

function mostrarTexto(idTexto) {
  // Obtener la referencia al área de texto
  var areaTexto = document.getElementById('areaTexto');

  // Mostrar el texto correspondiente al botón clickeado
  areaTexto.textContent = textos[idTexto];

  // Desactivar la clase 'seleccionado' de todos los botones
  var botones = document.querySelectorAll('button');
  botones.forEach(function (boton) {
      boton.classList.remove('seleccionado');
  });

  // Activar la clase 'seleccionado' en el botón clickeado
  document.querySelector(`button[onclick="mostrarTexto('${idTexto}')"]`).classList.add('seleccionado');
}

// Obtén el elemento del contenedor
var container = document.querySelector('.hero .container');

// Almacena el valor original de la opacidad (asumiendo 0.5 como base, aunque el css lo controla)
var originalOpacity = 0.5;

// Almacena la última posición de desplazamiento
var lastScrollTop = window.scrollY;

// Agrega un evento de desplazamiento
window.addEventListener('scroll', function() {
    // Calcula la dirección del scroll
    var currentScrollTop = window.scrollY;
    var scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
    
    // Actualiza la última posición de desplazamiento
    lastScrollTop = currentScrollTop;

    // Se modificó para aplicar el efecto solo al hero-content (el fondo oscuro del texto)
    var heroContent = document.querySelector('.hero-content'); 
    
    if (heroContent) {
        // Ajusta la opacidad en función de la dirección del scroll
        if (scrollDirection === 'down') {
            heroContent.style.backgroundColor = 'rgba(24, 24, 27, 0)';
        } else {
            // Utilizamos el currentScrollTop para simular el cambio de opacidad al subir
            var opacity = Math.min(originalOpacity, originalOpacity + (currentScrollTop / 400));
            heroContent.style.backgroundColor = 'rgba(24, 24, 27, ' + opacity + ')';
        }
    }
});

//Popup
document.addEventListener("DOMContentLoaded", function() {
    var popupContainer = document.getElementById("popup-container");
    var closePopupButton = document.getElementById("close-popup");
    var inscripcionLink = document.getElementById("enlace-inscripcion");

    // Abre el popup al cargar la página
    setTimeout(function() {
        if (popupContainer) {
            popupContainer.style.display = "block";
        }
    }, 1000);

    // Cierra el popup al hacer clic en el botón de cerrar
    if (closePopupButton) {
        closePopupButton.addEventListener("click", function() {
            if (popupContainer) {
                popupContainer.style.display = "none";
            }
        });
    }

    // Cierra el popup y lleva a la sección al hacer clic en "Inscríbete"
    if (inscripcionLink) {
        inscripcionLink.addEventListener("click", function(event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            if (popupContainer) {
                popupContainer.style.display = "none";
            }

            // Obtiene el destino del enlace y desplaza la ventana a esa sección
            var targetId = this.getAttribute("href").substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth" // Desplazamiento suave
                });
            }
        });
    }
});

  // Selecciona los elementos del DOM
  const _toggle = document.querySelector('.menu-toggle');
  const _items = document.querySelector('nav ul');

  // Función para manejar el clic en el toggle
  _toggle.onclick = () => {
    _items.classList.toggle("open");
    _toggle.classList.toggle("close");
  };

  // Función para cerrar el menú al hacer clic en cualquier opción del menú
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      _items.classList.remove('open');
      _toggle.classList.remove('close');
    });
  });
  
  // INICIO: LÓGICA DEL CARRUSEL DE IMÁGENES
document.addEventListener('DOMContentLoaded', () => {
    const carruselTrack = document.querySelector('.carrusel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carrusel-indicators');
    
    // Si no encontramos los elementos del carrusel, salimos de la función
    if (!carruselTrack) return;

    const slides = Array.from(carruselTrack.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoSlideInterval;

    // 1. Posicionar todas las imágenes (opcional si ya se hizo con CSS, pero bueno para asegurar)
    const setSlidePosition = (slide, index) => {
        // En este caso, lo controlaremos solo con el 'transform' del track
    };

    // 2. Crear indicadores (puntos)
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoSlide();
        });
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = Array.from(indicatorsContainer.children);

    // 3. Función principal de movimiento
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0 || targetIndex >= totalSlides) return;
        
        // Mover el track
        const moveAmount = targetIndex * slideWidth;
        carruselTrack.style.transform = `translateX(-${moveAmount}px)`;
        currentSlide = targetIndex;

        // Actualizar indicadores
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[currentSlide].classList.add('active');
    };

    // 4. Controles de navegación
    prevBtn.addEventListener('click', () => {
        let targetIndex = currentSlide - 1;
        if (targetIndex < 0) {
            targetIndex = totalSlides - 1; // Loop al final
        }
        moveToSlide(targetIndex);
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        let targetIndex = currentSlide + 1;
        if (targetIndex >= totalSlides) {
            targetIndex = 0; // Loop al inicio
        }
        moveToSlide(targetIndex);
        resetAutoSlide();
    });

    // 5. Autodeslizamiento
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            let targetIndex = currentSlide + 1;
            if (targetIndex >= totalSlides) {
                targetIndex = 0;
            }
            moveToSlide(targetIndex);
        }, 5000); // Cambia de imagen cada 5 segundos (5000 milisegundos)
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Inicializar el carrusel
    startAutoSlide();

    // Recalcular el tamaño de la diapositiva al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        // Obtenemos el nuevo ancho de la primera imagen
        const newSlideWidth = slides[0].getBoundingClientRect().width; 
        
        // Movemos a la diapositiva actual con el nuevo ancho
        const moveAmount = currentSlide * newSlideWidth;
        carruselTrack.style.transform = `translateX(-${moveAmount}px)`;
    });
});
// FIN: LÓGICA DEL CARRUSEL DE IMÁGENES