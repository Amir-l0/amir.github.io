document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    const iconElement = menuIcon.querySelector('i');

    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);

    // Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }, { passive: true });

    // Menu Toggle Function
    function toggleMenu() {
        const isOpen = navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        if (isOpen) {
            iconElement.classList.remove('fa-bars');
            iconElement.classList.add('fa-times');
            
            // تغییر رنگ آیکون به تیره چون منو سفید است
            menuIcon.style.color = '#1e293b'; 
            
            // BUG FIX: اطمینان از اینکه دکمه بالاتر از همه چیز است تا بتوان منو را بست
            menuIcon.parentElement.style.zIndex = '3005'; 
        } else {
            iconElement.classList.remove('fa-times');
            iconElement.classList.add('fa-bars');
            
            // برگرداندن به حالت پیش فرض
            menuIcon.style.color = ''; 
            menuIcon.parentElement.style.zIndex = ''; 
        }
    }

    menuIcon.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) toggleMenu();
        });
    });
});
