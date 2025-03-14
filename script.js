document.getElementById('contact-form').addEventListener('submit', function(event) {
    sendWhatsApp(event);
});

function sendWhatsApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !message) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    if (message.length > 500) {
        alert('Mensagem muito longa. Por favor, reduza para menos de 500 caracteres.');
        return;
    }
    
    const phone = '5519998278650';
    const text = `Olá me chamo ${name}, ${message}`;
    const formattedMessage = encodeURIComponent(text);
    
    const url = `https://whatsa.me/${phone}/?t=${formattedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    document.getElementById('contact-form').reset();
}

document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    updateThemeIcon();
} else {
    document.body.classList.toggle('light-theme', !prefersDarkScheme.matches);
    updateThemeIcon();
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    
    updateThemeIcon();
});

function updateThemeIcon() {
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
}

function createSimpleParticles() {
    const particlesContainer = document.querySelector('.particles');
}

window.addEventListener('load', function() {
    createSimpleParticles();
    
    window.addEventListener('scroll', highlightCurrentSection);
});

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.menu-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (currentSectionId) {
        const activeLink = document.querySelector(`.menu-link[href="#${currentSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}