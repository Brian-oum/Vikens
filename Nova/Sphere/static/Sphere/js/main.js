// ================= HEADER SCROLL & HIDE =================
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // Add background when scrolling
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Hide/show header on scroll - FIXED for mobile
  if (currentScroll > lastScrollY && currentScroll > 100) {
    // Scrolling down -> hide
    header.classList.add('hidden');
  } else {
    // Scrolling up -> show
    header.classList.remove('hidden');
  }

  lastScrollY = currentScroll;
});

// ================= MOBILE MENU =================
const mobileMenu = document.querySelector('.mobile-menu');
const navUl = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
  navUl.classList.toggle('active');
  mobileMenu.innerHTML = navUl.classList.contains('active') ?
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// ================= DROPDOWN FUNCTIONALITY =================
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const link = dropdown.querySelector('a:first-child');

  if (window.innerWidth > 768) {
    // Desktop hover
    dropdown.addEventListener('mouseenter', () => dropdown.classList.add('active'));
    dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('active'));
  } else {
    // Mobile click
    link.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });
  }
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
  }
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }

    // Close mobile menu if open
    if (navUl.classList.contains('active')) {
      navUl.classList.remove('active');
      mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// ================= INTERSECTION OBSERVER =================
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ================= TYPING ANIMATION =================
function initTypingAnimation() {
  const heading = document.querySelector('.services-text h2');
  if (!heading) return;

  const text = heading.textContent;
  const paragraph = document.querySelector('.services-text p');

  heading.innerHTML = '';
  if (paragraph) paragraph.style.opacity = '0';

  let i = 0;
  const typeHeading = setInterval(() => {
    if (i < text.length) {
      heading.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typeHeading);
      if (paragraph) {
        setTimeout(() => {
          paragraph.style.transition = 'opacity 1.5s ease-in-out';
          paragraph.style.opacity = '1';
        }, 500);
      }
    }
  }, 100);
}

// ================= RESPONSIVE HANDLER =================
function handleResponsive() {
  const container = document.querySelector('.services-container');
  const grid = document.querySelector('.services-grid');

  if (!container || !grid) return;

  const width = window.innerWidth;
  if (width <= 768) {
    container.style.flexDirection = 'column';
    grid.style.gridTemplateColumns = '1fr';
  } else {
    container.style.flexDirection = 'row';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  }
}

// ================= RESPONSIVE BACKGROUND =================
function initResponsiveBackground() {
  const bgImage = document.querySelector('.section-bg img');
  if (!bgImage) return;

  function updateBackground() {
    const width = window.innerWidth;

    if (width < 768) {
      bgImage.style.filter = 'blur(1px) brightness(0.7)';
      bgImage.style.transform = 'scale(1.15)';
      bgImage.style.objectPosition = 'top center';
    } else if (width < 1024) {
      bgImage.style.filter = 'blur(2px) brightness(0.8)';
      bgImage.style.transform = 'scale(1.08)';
      bgImage.style.objectPosition = 'center center';
    } else {
      bgImage.style.filter = 'blur(3px) brightness(0.85)';
      bgImage.style.transform = 'scale(1.05)';
      bgImage.style.objectPosition = 'center center';
    }
  }

  bgImage.style.transition = 'all 0.5s ease';
  bgImage.style.objectFit = 'cover';
  bgImage.style.width = '100%';
  bgImage.style.height = '100%';

  updateBackground();
  window.addEventListener('resize', updateBackground);
}

// ================= SHAPE ANIMATOR =================
class ShapeAnimator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.shapes = [];
    this.maxShapes = 15;
    if (this.container) this.init();
  }

  init() {
    this.createShapes();
    this.startAnimation();
  }

  createShapes() {
    const shapeTypes = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = ['blue', 'purple', 'green', 'orange', 'pink'];

    for (let i = 0; i < this.maxShapes; i++) {
      const shape = document.createElement('div');
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      shape.className = `shape ${type} ${color} glow`;

      const size = Math.random() * 60 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      shape.style.cssText = `
        width: ${size}px;
        height: ${type === 'triangle' ? 0 : size}px;
        left: ${left}%;
        top: ${top}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${Math.random() * 0.5 + 0.3};
      `;

      if (type === 'triangle') {
        shape.style.borderLeftWidth = `${size/2}px`;
        shape.style.borderRightWidth = `${size/2}px`;
        shape.style.borderBottomWidth = `${size}px`;
        shape.style.borderBottomColor = `rgba(255, 255, 255, 0.3)`;
      }

      this.container.appendChild(shape);
      this.shapes.push(shape);
    }
  }

  startAnimation() {
    this.shapes.forEach(shape => {
      const animations = ['float', 'pulse', 'spin'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

      if (randomAnimation === 'spin') {
        shape.style.animation = `spin ${Math.random() * 20 + 10}s linear infinite`;
      } else if (randomAnimation === 'pulse') {
        shape.style.animation = `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`;
      }
    });
  }
}

// ================= INITIALIZE =================
window.addEventListener('load', () => {
  initTypingAnimation();
  handleResponsive();
  initResponsiveBackground();

  const shapeAnimator = new ShapeAnimator('animatedShapes');

  const modernServicesSection = document.querySelector('.modern-services');
  if (modernServicesSection) {
    modernServicesSection.addEventListener('mouseenter', () => {
      shapeAnimator.shapes.forEach(shape => {
        shape.style.animationDuration = '3s';
      });
    });

    modernServicesSection.addEventListener('mouseleave', () => {
      shapeAnimator.shapes.forEach(shape => {
        const duration = Math.random() * 10 + 10;
        shape.style.animationDuration = `${duration}s`;
      });
    });
  }
});

window.addEventListener('resize', handleResponsive);


// Simple counting animation
function startCountAnimation() {
    const numbers = document.querySelectorAll('.stats strong');
    
    numbers.forEach(number => {
        const finalValue = parseInt(number.textContent);
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                number.textContent = finalValue + '+';
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

// Start when page loads
window.addEventListener('load', startCountAnimation);