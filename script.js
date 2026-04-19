const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#siteNav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const reveals = document.querySelectorAll(".reveal");
const progressBar = document.querySelector(".scroll-progress");
const interactiveCards = document.querySelectorAll(".interactive-card");
const submitButton = document.querySelector(".submit-button");
const countTargets = document.querySelectorAll("[data-count]");
const projectImageButtons = document.querySelectorAll(".project-image");
const imageModal = document.querySelector("#imageModal");
const imageModalPreview = document.querySelector("#imageModalPreview");
const imageModalCaption = document.querySelector("#imageModalCaption");
const imageModalClose = imageModal?.querySelector(".image-modal-close");
const hoverPreviewEnabled = window.matchMedia("(hover: hover) and (pointer: fine)");
let activeImageTrigger = null;
let hoverPreviewTimer = null;

const closeMenu = () => {
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
};

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 16);
};

const syncProgress = () => {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

syncHeader();
syncProgress();

window.addEventListener("scroll", () => {
  syncHeader();
  syncProgress();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

reveals.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const currentId = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-20% 0px -35% 0px",
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

interactiveCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--pointer-x", `${x}%`);
    card.style.setProperty("--pointer-y", `${y}%`);
  });
});

const openImageModal = (trigger) => {
  if (!imageModal || !imageModalPreview || !imageModalCaption) return;

  const image = trigger.querySelector("img");
  if (!image) return;

  activeImageTrigger = trigger;
  imageModalPreview.src = image.currentSrc || image.src;
  imageModalPreview.alt = image.alt;
  imageModalCaption.textContent = image.alt;
  imageModal.classList.add("is-open");
  imageModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  imageModalClose?.focus();
};

const closeImageModal = () => {
  if (!imageModal || !imageModalPreview || !imageModalCaption) return;

  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  imageModalPreview.src = "";
  imageModalPreview.alt = "";
  imageModalCaption.textContent = "";
  activeImageTrigger?.focus();
  activeImageTrigger = null;
};

projectImageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openImageModal(button);
  });

  button.addEventListener("pointerenter", () => {
    if (!hoverPreviewEnabled.matches || imageModal?.classList.contains("is-open")) return;

    window.clearTimeout(hoverPreviewTimer);
    hoverPreviewTimer = window.setTimeout(() => {
      openImageModal(button);
    }, 180);
  });

  button.addEventListener("pointerleave", () => {
    window.clearTimeout(hoverPreviewTimer);
  });
});

imageModal?.querySelectorAll("[data-close-modal]").forEach((control) => {
  control.addEventListener("click", closeImageModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal?.classList.contains("is-open")) {
    closeImageModal();
  }
});

const animateCount = (target) => {
  const finalValue = Number(target.dataset.count);
  if (!Number.isFinite(finalValue)) return;

  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * finalValue);
    target.textContent = `${Math.max(current, 1)}+`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      target.textContent = `${finalValue}+`;
    }
  };

  requestAnimationFrame(step);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.7 }
);

countTargets.forEach((target) => countObserver.observe(target));

if (submitButton) {
  const form = submitButton.closest("form");
  form?.addEventListener("submit", () => {
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
  });
}
