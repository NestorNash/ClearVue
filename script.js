// ClearVue Landing Page — minimal JavaScript

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const reveals = document.querySelectorAll(".reveal");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Mobile navigation
navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add("visible"), delay);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((item) => revealObserver.observe(item));

// Before / after comparison
const range = document.getElementById("comparison-range");
const before = document.getElementById("comparison-before");
const divider = document.getElementById("comparison-divider");

function updateComparison(value) {
  before.style.width = `${value}%`;
  divider.style.left = `${value}%`;
}

range?.addEventListener("input", (event) => updateComparison(event.target.value));
updateComparison(range?.value || 50);

// Gentle mouse parallax on product areas
const parallaxTargets = document.querySelectorAll(".hero-product, .showcase-product");

parallaxTargets.forEach((target) => {
  target.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.setProperty("--mx", `${x * 8}px`);
    target.style.setProperty("--my", `${y * 8}px`);
    target.style.transform = `translate3d(${x * 5}px, ${y * 5}px, 0)`;
  });

  target.addEventListener("pointerleave", () => {
    target.style.transform = "";
  });
});
