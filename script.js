document.addEventListener("DOMContentLoaded", function() {

    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Efecto de cambiar el fondo de la barra de navegación al hacer scroll
    window.addEventListener("scroll", function() {
        const mainNav = document.getElementById("mainNav");
        if (window.scrollY > 100) {
            mainNav.classList.add("navbar-shrink");
        } else {
            mainNav.classList.remove("navbar-shrink");
        }
    });

    // Efecto de desplazamiento suave en los enlaces de la barra de navegación
    document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])').forEach(function(anchor) {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 54,
                    behavior: "smooth"
                });
            }
        });
    });

    // Cerrar el menú de la barra de navegación en dispositivos móviles
    document.querySelectorAll('.js-scroll-trigger').forEach(function(element) {
        element.addEventListener("click", function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Configurar ScrollSpy
    const body = document.body;
    body.setAttribute('data-bs-spy', 'scroll');
    body.setAttribute('data-bs-target', '#mainNav');
    body.setAttribute('data-bs-offset', '56');

    // Animación de las barras de progreso
    function animateProgressBars() {
        document.querySelectorAll('.progress-bar').forEach(function(bar) {
            const percentage = bar.getAttribute('aria-valuenow');
            bar.style.width = '0%';
            setTimeout(function() {
                bar.style.transition = 'width 1s ease';
                bar.style.width = percentage + '%';
            }, 100);
        });
    }

    // Ejecutar la animación de las barras de progreso cuando sea visible
    let skillsOffset = document.getElementById('habilidades').offsetTop;
    let skillsHeight = document.getElementById('habilidades').offsetHeight;
    let animated = false;

    window.addEventListener("scroll", function() {
        const scroll = window.scrollY;
        if (!animated && scroll > skillsOffset - window.innerHeight + skillsHeight / 2) {
            animateProgressBars();
            animated = true;
        }
    });

    // Efecto hover en las tarjetas de proyecto
    document.querySelectorAll('.project-card').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            card.querySelector('.card-img-top').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', function() {
            card.querySelector('.card-img-top').style.transform = 'scale(1)';
        });
    });

    // Validación del formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        if (nombre.length < 2) {
            alert('Por favor, introduce un nombre válido.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, introduce un email válido.');
            return;
        }

        if (mensaje.length < 10) {
            alert('Por favor, introduce un mensaje más largo.');
            return;
        }

        alert('Gracias por tu mensaje, ' + nombre + '. Te contactaremos pronto.');
        this.reset();
    });

    // Función de validación de email
    function isValidEmail(email) {
        const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
});
