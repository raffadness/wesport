// DOM Elements
const preloader = document.querySelector(".preloader");
const customCursor = document.querySelector(".custom-cursor");
const cursorTrail = document.querySelector(".cursor-trail");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const mainHeader = document.querySelector(".main-header");
const progressBar = document.querySelector(".progress-bar");
const backToTop = document.querySelector(".back-to-top");
const revealElements = document.querySelectorAll(".reveal-element");
const currentYear = document.getElementById("current-year");

// Set current year
currentYear.textContent = new Date().getFullYear();

// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1500);
});

// Custom cursor
if (window.matchMedia("(hover: hover)").matches) {
  let mouseX = 0;
  let mouseY = 0;
  let trailX = 0;
  let trailY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor position immediately
    customCursor.style.left = `${mouseX}px`;
    customCursor.style.top = `${mouseY}px`;
  });

  // Animate cursor trail with smooth following effect
  function animateCursorTrail() {
    // Calculate distance between cursor and trail
    const dx = mouseX - trailX;
    const dy = mouseY - trailY;

    // Move trail towards cursor with easing
    trailX += dx * 0.2;
    trailY += dy * 0.2;

    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;

    requestAnimationFrame(animateCursorTrail);
  }

  animateCursorTrail();

  document.addEventListener("mousedown", () => {
    customCursor.classList.add("active");
    cursorTrail.classList.add("active");
  });

  document.addEventListener("mouseup", () => {
    customCursor.classList.remove("active");
    cursorTrail.classList.remove("active");
  });

  const cursorTargets = document.querySelectorAll("a, button");
  cursorTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      customCursor.classList.add("active");
      cursorTrail.classList.add("active");
    });

    target.addEventListener("mouseleave", () => {
      customCursor.classList.remove("active");
      cursorTrail.classList.remove("active");
    });
  });
}

// Mobile navigation
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  mainNav.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    mainNav.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

// Scroll events
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // Header background on scroll
  if (scrollPosition > 50) {
    mainHeader.classList.add("scrolled");
  } else {
    mainHeader.classList.remove("scrolled");
  }

  // Progress bar
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollPosition / windowHeight) * 100;
  progressBar.style.width = `${scrolled}%`;

  // Back to top button visibility
  if (scrollPosition > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }

  // Active nav link on scroll
  updateActiveNavLink();

  // Reveal elements on scroll
  revealOnScroll();
});

// Back to top button
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Reveal elements on scroll
function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.85) {
      element.classList.add("revealed");
    }
  });
}

// Parallax effect for hero section
const heroImage = document.querySelector(".hero-image");
const heroShapes = document.querySelectorAll(".hero-shape");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  if (heroImage) {
    heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
  }

  heroShapes.forEach((shape, index) => {
    const speed = 0.1 + index * 0.05;
    shape.style.transform = `translateY(${scrollPosition * speed}px)`;
  });
});

// Initialize
revealOnScroll();
updateActiveNavLink();
