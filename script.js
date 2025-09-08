// DOM Elements
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle burger menu
function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close menu
function closeMenu() {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
}

// Event Listeners
burgerMenu.addEventListener('click', toggleMenu);

// Close menu when clicking on navigation links
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!burgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
        closeMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// Prevent body scroll when menu is open
function toggleBodyScroll(isMenuOpen) {
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Enhanced toggle menu with body scroll control
burgerMenu.addEventListener('click', function() {
    const isMenuOpen = navMenu.classList.contains('active');
    toggleBodyScroll(!isMenuOpen);
});

// Enhanced close menu with body scroll control
function enhancedCloseMenu() {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
    toggleBodyScroll(false);
}

// Update all close menu calls to use enhanced version
navLinks.forEach(link => {
    link.addEventListener('click', enhancedCloseMenu);
});

document.addEventListener('click', function(event) {
    if (!burgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
        enhancedCloseMenu();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        enhancedCloseMenu();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Parallax effect for background circles (optional enhancement)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.bg-circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.1 + (index * 0.05);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing animation with looping + colored "Gab"
document.addEventListener("DOMContentLoaded", function () {
  const prefix = "Hello, I am ";
  const name = "Gab";
  const text = prefix + name;
  const typedEl = document.getElementById("typed");

  const typingSpeed = 90;   // ms per character typing
  const erasingSpeed = 60;  // ms per character erasing
  const delayBetween = 1200; // pause before erasing/typing again

  let i = 0;
  let typing = true;

  function typeLoop() {
    if (typing) {
      if (i < text.length) {
        // check if we're typing the "Gab" part
        if (i === prefix.length) {
          // start a colored span
          typedEl.innerHTML += `<span class="highlight">`;
        }
        typedEl.innerHTML += text.charAt(i);
        i++;

        if (i === text.length) {
          // close the span after finishing "Gab"
          typedEl.innerHTML += `</span>`;
        }

        setTimeout(typeLoop, typingSpeed);
      } else {
        typing = false;
        setTimeout(typeLoop, delayBetween);
      }
    } else {
      if (i > 0) {
        // handle erasing with HTML inside
        if (i === text.length) {
          // remove closing span first
          typedEl.innerHTML = typedEl.innerHTML.replace(/<\/span>$/, "");
        }

        i--;
        let currentText = text.substring(0, i);

        if (i <= prefix.length) {
          typedEl.textContent = currentText; // erase normally before "Gab"
        } else {
          typedEl.innerHTML =
            prefix +
            `<span class="highlight">` +
            currentText.substring(prefix.length) +
            `</span>`;
        }

        setTimeout(typeLoop, erasingSpeed);
      } else {
        typing = true;
        setTimeout(typeLoop, delayBetween);
      }
    }
  }

  setTimeout(typeLoop, 500); // small delay before starting
});
