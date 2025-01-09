$(document).ready(function() {
   
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    $(window).scroll(function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });
    
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

   
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

   
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

    
    function animateProgressBars() {
        $('.progress-bar').each(function() {
            var bar = $(this);
            var percentage = bar.attr('aria-valuenow');
            bar.css('width', '0%').animate({
                width: percentage + '%'
            }, 1000);
        });
    }

    
    var skillsOffset = $('#habilidades').offset().top;
    var skillsHeight = $('#habilidades').height();
    var animated = false;

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (!animated && scroll > skillsOffset - window.innerHeight + skillsHeight / 2) {
            animateProgressBars();
            animated = true;
        }
    });

   
    $('.project-card').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
        }
    );

    
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
       
        var nombre = $('#nombre').val();
        var email = $('#email').val();
        var mensaje = $('#mensaje').val();
        
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

    function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
});