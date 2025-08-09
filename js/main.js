document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const header = document.querySelector('.header');
    
    // ==================== Burger Menu ====================
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // ==================== Swiper Slider ====================
    if (typeof Swiper !== 'undefined') {
        const deliverySlider = new Swiper('.delivery-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // ==================== Modal Window ====================
    const modal = document.getElementById('callback-modal');
    
    if (modal) {
        const openModalButtons = document.querySelectorAll('.callback-btn, .open-form');
        const closeModalButton = modal.querySelector('.modal__close');
        const modalForm = modal.querySelector('form');
        
        // Open modal
        if (openModalButtons.length) {
            openModalButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    modal.classList.add('active');
                    body.classList.add('no-scroll');
                });
            });
        }
        
        // Close modal
        if (closeModalButton) {
            closeModalButton.addEventListener('click', function() {
                modal.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        }
        
        // Close when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
        
        // Form submission
        if (modalForm) {
            modalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here would be AJAX request to server
                console.log('Form submitted', {
                    name: this.querySelector('[type="text"]').value,
                    phone: this.querySelector('[type="tel"]').value,
                    message: this.querySelector('textarea')?.value
                });
                
                // Show success message
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                
                // Reset and close
                this.reset();
                modal.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        }
    }

    // ==================== Smooth Scroll ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#!') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Sticky Header ====================
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});