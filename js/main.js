 // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');

    mobileMenu.addEventListener('click', () => {
      navUl.classList.toggle('active');
      mobileMenu.innerHTML = navUl.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Dropdown functionality - FIXED
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a:first-child');
      
      // For desktop - show on hover
      if (window.innerWidth > 768) {
        dropdown.addEventListener('mouseenter', () => {
          dropdown.classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', () => {
          dropdown.classList.remove('active');
        });
      } else {
        // For mobile - toggle on click
        link.addEventListener('click', (e) => {
          e.preventDefault();
          dropdown.classList.toggle('active');
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });

    // Smooth scrolling for anchor links
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

    // Intersection Observer for animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1
    });

    fadeElements.forEach(el => {
      observer.observe(el);
    });
    // Simple typing animation with responsive handling
function initTypingAnimation() {
    const heading = document.querySelector('.services-text h2');
    const text = heading.textContent;
    const paragraph = document.querySelector('.services-text p');
    
    // Clear heading and prepare for typing
    heading.innerHTML = '';
    paragraph.style.opacity = '0';
    
    // Type the heading
    let i = 0;
    const typeHeading = setInterval(() => {
        if (i < text.length) {
            heading.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typeHeading);
            // Fade in paragraph after heading completes
            setTimeout(() => {
                paragraph.style.transition = 'opacity 1.5s ease-in-out';
                paragraph.style.opacity = '1';
            }, 500);
        }
    }, 100);
}

// Handle responsive layout
function handleResponsive() {
    const width = window.innerWidth;
    const container = document.querySelector('.services-container');
    const grid = document.querySelector('.services-grid');
    
    if (width <= 768) {
        container.style.flexDirection = 'column';
        grid.style.gridTemplateColumns = '1fr';
    } else {
        container.style.flexDirection = 'row';
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    initTypingAnimation();
    handleResponsive();
});

// Update on resize
window.addEventListener('resize', handleResponsive);