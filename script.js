const profileModal = document.getElementById("profileModal");
const projectPrompt = document.getElementById("projectPrompt");
const loadingScreen = document.getElementById("loadingScreen");
const introSection = document.getElementById("introSection");
const viewProfileBtn = document.getElementById("viewProfileBtn");
let lastFocusedElement = null;
let projectLink = "";

window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.pointerEvents = "none";
    introSection.style.opacity = "1";
    introSection.style.pointerEvents = "auto";
  }, 2000);
});

viewProfileBtn.addEventListener("click", () => {
  openModal();
});

function openModal() {
  lastFocusedElement = document.activeElement;
  profileModal.classList.remove("hidden");
  profileModal.classList.add("flex");
  profileModal.focus();
  document.body.style.overflow = "hidden";
  trapFocus(profileModal);
}
function closeModal() {
  profileModal.classList.add("hidden");
  profileModal.classList.remove("flex");
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    if (e.key === "Escape") {
      if (!projectPrompt.classList.contains("flex")) {
        closeModal();
      } else {
        closeProjectPrompt();
      }
    }
  });
}

const quotes = [
  "Code it. Build it. Share it. Repeat.",
  "Always in dev mode 🚀",
  "Turning coffee into code ☕",
  "Just one more feature...",
  "From keyboard to the world 🌐",
];
let quoteIndex = 0;
let charIndex = 0;
const typewriter = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");

function typeQuote() {
  if (charIndex < quotes[quoteIndex].length) {
    typewriter.textContent += quotes[quoteIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeQuote, 80);
  } else {
    setTimeout(() => {
      typewriter.textContent = "";
      charIndex = 0;
      quoteIndex = (quoteIndex + 1) % quotes.length;
      typeQuote();
    }, 2800);
  }
}
setInterval(() => {
  cursor.style.visibility =
    cursor.style.visibility === "hidden" ? "visible" : "hidden";
}, 500);
typeQuote();

function showProjectPrompt(url) {
  projectLink = url;
  projectPrompt.classList.remove("hidden");
  projectPrompt.classList.add("flex");
  projectPrompt.focus();
  document.body.style.overflow = "hidden";
  trapFocus(projectPrompt);
}
function closeProjectPrompt() {
  projectPrompt.classList.add("hidden");
  projectPrompt.classList.remove("flex");
  document.body.style.overflow = "";
}
function confirmViewProject() {
  window.open(projectLink, "_blank", "noopener,noreferrer");
  closeProjectPrompt();
}
particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#66e0ff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#66e0ff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.7,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
