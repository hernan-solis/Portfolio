document.addEventListener("DOMContentLoaded", function () {
  // Inicializar AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  // Cambiar el fondo de la barra de navegación al hacer scroll
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
    window.addEventListener("scroll", function () {
      mainNav.classList.toggle("navbar-shrink", window.scrollY > 100);
    });
  }

  // Desplazamiento suave para los enlaces
  const scrollTriggers = document.querySelectorAll(
    'a.js-scroll-trigger[href*="#"]:not([href="#"])'
  );
  scrollTriggers.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevenir el comportamiento por defecto (salto del hash)
      const target = document.querySelector(this.hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 54, // Ajustar según la altura de la barra de navegación
          behavior: "smooth",
        });
      }
    });
  });

  // Cerrar el menú de navegación en dispositivos móviles después de hacer clic
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse) {
    scrollTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        navbarCollapse.classList.remove("show");
      });
    });
  }

  // Configurar ScrollSpy
  const body = document.body;
  if (body) {
    body.setAttribute("data-bs-spy", "scroll");
    body.setAttribute("data-bs-target", "#mainNav");
    body.setAttribute("data-bs-offset", "56");
  }

  // Animación de las barras de progreso
  function animateProgressBars() {
    document.querySelectorAll(".progress-bar").forEach(function (bar) {
      const percentage = bar.getAttribute("aria-valuenow");
      bar.style.width = "0%";
      setTimeout(function () {
        bar.style.transition = "width 1s ease";
        bar.style.width = percentage + "%";
      }, 100);
    });
  }

  // Ejecutar la animación de las barras de progreso cuando sea visible
  const habilidades = document.getElementById("habilidades");
  if (habilidades) {
    const skillsOffset = habilidades.offsetTop;
    const skillsHeight = habilidades.offsetHeight;
    let animated = false;

    window.addEventListener("scroll", function () {
      if (
        !animated &&
        window.scrollY > skillsOffset - window.innerHeight + skillsHeight / 2
      ) {
        animateProgressBars();
        animated = true;
      }
    });
  }

  // Efecto hover en las tarjetas de proyecto
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(function (card) {
    const cardImage = card.querySelector(".card-img-top");
    if (cardImage) {
      card.addEventListener("mouseenter", function () {
        cardImage.style.transform = "scale(1.1)";
      });
      card.addEventListener("mouseleave", function () {
        cardImage.style.transform = "scale(1)";
      });
    }
  });

  // Validación del formulario de contacto
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      if (nombre.length < 2) {
        alert("Por favor, introduce un nombre válido.");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Por favor, introduce un email válido.");
        return;
      }

      if (mensaje.length < 10) {
        alert("Por favor, introduce un mensaje más largo.");
        return;
      }

      // Crear los datos del formulario
      const formData = {
        Nombre: nombre,
        Email: email,
        Mensaje: mensaje,
      };

      // Enviar los datos usando fetch
      fetch("https://formspree.io/f/mjkgbngy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            alert(
              `Gracias por tu mensaje, ${nombre}. Te contactaremos pronto.`
            );
            contactForm.reset(); // Limpiar el formulario
          } else {
            alert(
              "Hubo un error al enviar el formulario. Por favor, intenta nuevamente."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "Hubo un error al enviar el formulario. Por favor, intenta nuevamente."
          );
        });
    });
  }

  // Función de validación de email
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  }

});
