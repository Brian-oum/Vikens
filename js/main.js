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


// Minimal responsive background script
function initResponsiveBackground() {
    const bgImage = document.querySelector('.section-bg img');
    if (!bgImage) return;

    function updateBackground() {
        const width = window.innerWidth;
        
        if (width < 768) {
            // Mobile
            bgImage.style.filter = 'blur(1px) brightness(0.7)';
            bgImage.style.transform = 'scale(1.15)';
            bgImage.style.objectPosition = 'top center';
        } else if (width < 1024) {
            // Tablet
            bgImage.style.filter = 'blur(2px) brightness(0.8)';
            bgImage.style.transform = 'scale(1.08)';
            bgImage.style.objectPosition = 'center center';
        } else {
            // Desktop
            bgImage.style.filter = 'blur(3px) brightness(0.85)';
            bgImage.style.transform = 'scale(1.05)';
            bgImage.style.objectPosition = 'center center';
        }
    }

    // Set initial styles
    bgImage.style.transition = 'all 0.5s ease';
    bgImage.style.objectFit = 'cover';
    bgImage.style.width = '100%';
    bgImage.style.height = '100%';
    
    // Initial update
    updateBackground();
    
    // Update on resize
    window.addEventListener('resize', updateBackground);
}

// Initialize
document.addEventListener('DOMContentLoaded', initResponsiveBackground);
// Update on resize
window.addEventListener('resize', handleResponsive);

 class ShapeAnimator {
      constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.shapes = [];
        this.maxShapes = 15;
        this.init();
      }

      init() {
        this.createShapes();
        this.startAnimation();
        this.handleResize();
      }

      createShapes() {
        const shapeTypes = ['circle', 'square', 'triangle', 'hexagon'];
        const colors = ['blue', 'purple', 'green', 'orange', 'pink'];
        
        for (let i = 0; i < this.maxShapes; i++) {
          const shape = document.createElement('div');
          const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          shape.className = `shape ${type} ${color} glow`;
          
          // Random size between 20px and 80px
          const size = Math.random() * 60 + 20;
          
          // Set random position
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          
          // Set random animation properties
          const duration = Math.random() * 10 + 10; // 10-20 seconds
          const delay = Math.random() * 5; // 0-5 seconds delay
          
          shape.style.cssText = `
            width: ${size}px;
            height: ${type === 'triangle' ? 0 : size}px;
            left: ${left}%;
            top: ${top}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.5 + 0.3};
          `;

          // Special styling for triangles
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
        // Add different animation types randomly
        this.shapes.forEach(shape => {
          const animations = ['float', 'pulse', 'spin'];
          const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
          
          if (randomAnimation === 'spin') {
            shape.style.animation = `spin ${Math.random() * 20 + 10}s linear infinite`;
          } else if (randomAnimation === 'pulse') {
            shape.style.animation = `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`;
          }
          // Default is 'float' which is already in CSS
        });
      }

      handleResize() {
        window.addEventListener('resize', () => {
          // Recalculate positions on resize if needed
          this.shapes.forEach(shape => {
            // Add any responsive behavior here
          });
        });
      }

      // Method to add more shapes dynamically
      addShape() {
        if (this.shapes.length < this.maxShapes) {
          this.createShapes();
        }
      }

      // Method to remove all shapes
      clearShapes() {
        this.shapes.forEach(shape => shape.remove());
        this.shapes = [];
      }
    }

    // Initialize the shape animator when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      const shapeAnimator = new ShapeAnimator('animatedShapes');
      
      // Optional: Add interactivity
      const modernServicesSection = document.querySelector('.modern-services');
      
      modernServicesSection.addEventListener('mouseenter', function() {
        // Speed up animations on hover
        shapeAnimator.shapes.forEach(shape => {
          shape.style.animationDuration = '3s';
        });
      });
      
      modernServicesSection.addEventListener('mouseleave', function() {
        // Reset animation speeds
        shapeAnimator.shapes.forEach(shape => {
          const duration = Math.random() * 10 + 10;
          shape.style.animationDuration = `${duration}s`;
        });
      });
    });