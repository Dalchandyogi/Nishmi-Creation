/* ========================================
   NISHMI CREATIONS - RESPONSIVE NAVIGATION
   ======================================== */

/* Hamburger Menu Toggle Functionality */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

/**
 * Toggle hamburger menu open/close state
 * Applies animation and visibility classes
 */
function toggleMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

/**
 * Close menu when a link is clicked
 * Allows navigation without manually closing menu
 */
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Close menu then scroll to section
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      closeMenu();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const offset = window.innerWidth <= 768 ? 70 : 95;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 350); // wait for menu slide-up animation to finish
    }
  });
});

// Add click event to hamburger button
hamburger.addEventListener("click", toggleMenu);

// Close menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Show full-screen loader when clicking product category cards
const pageLoader = document.getElementById("page-loader");
const productLinks = document.querySelectorAll(".product-link");

function showLoader() {
  if (pageLoader) {
    pageLoader.classList.add("active");
  }
}

productLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href) {
      e.preventDefault();
      showLoader();
      setTimeout(() => {
        window.location.href = href;
      }, 150);
    }
  });
});

// Close menu when clicking outside of it
document.addEventListener("click", (event) => {
  const isClickInsideNav = navMenu.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains("active")) {
    closeMenu();
  }
});

// Close menu when pressing Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("active")) {
    closeMenu();
  }
});

/* ========================================
   SCROLL SPY - ACTIVE NAVIGATION HIGHLIGHT
   ======================================== */

/**
 * Update active navigation link based on scroll position
 * Highlights which section the user is currently viewing
 */
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ========================================
   RESPONSIVE UTILITY FUNCTIONS
   ======================================== */

/**
 * Detect if device is mobile based on screen width
 * @returns {boolean} True if screen width <= 767px
 */
function isMobileDevice() {
  return window.innerWidth <= 767;
}

/**
 * Debounce function for resize events
 * Prevents excessive function calls during window resize
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Handle responsive behavior on window resize
 */
const handleResize = debounce(() => {
  // Close menu if resizing to desktop
  if (!isMobileDevice() && navMenu.classList.contains("active")) {
    closeMenu();
  }
}, 250);

window.addEventListener("resize", handleResize);

/* ========================================
   INITIALIZATION
   ======================================== */

// Ensure menu is in correct state on page load
window.addEventListener("load", () => {
  if (!isMobileDevice()) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});