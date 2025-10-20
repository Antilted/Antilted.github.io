/* script.js
   Handles 3 different auto-scrolling 3D carousels with drag/swipe and modal info.
*/

(() => {
  // Utilities
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Modal
  const modal = $("#info-modal");
  const modalClose = $("#modal-close");
  const modalTitle = $("#modal-title");
  const modalYear = $("#modal-year");
  const modalDesc = $("#modal-desc");
  const modalMainImage = $("#modal-main-image");
  const modalThumbs = $("#modal-thumbs");

  modalClose.addEventListener("click", () => closeModal());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function openModalFromItem(item) {
    const title = item.dataset.title || "Untitled";
    const year = item.dataset.year || "";
    const desc = item.dataset.desc || "";
    let extras = [];
    try {
      extras = JSON.parse(item.dataset.extra || "[]");
    } catch (e) {
      extras = [];
    }

    modalTitle.textContent = title;
    modalYear.textContent = year;
    modalDesc.textContent = desc;

    modalMainImage.src = extras[0] || item.querySelector("img").src;
    modalMainImage.alt = title;

    // generate thumbs
    modalThumbs.innerHTML = "";
    extras.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.addEventListener("click", () => {
        modalMainImage.src = src;
      });
      modalThumbs.appendChild(img);
    });

    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
  }

  // Generic interactive carousel behavior (drag + autoplay)
  class CarouselBase {
    constructor(el) {
      this.el = el;
      this.items = Array.from(el.querySelectorAll(".item"));
      this.speed = parseFloat(el.dataset.speed) || 0.02;
      this.offset = 0; // current scroll offset (float)
      this.velocity = this.speed; // autoplay velocity
      this.dragging = false;
      this.lastX = 0;
      this.raf = null;

      this.bindEvents();
      this.setupClickHandlers();
      this.start();
    }
    bindEvents() {
      this.el.addEventListener("pointerdown", (e) => this.onPointerDown(e));
      window.addEventListener("pointerup", (e) => this.onPointerUp(e));
      window.addEventListener("pointermove", (e) => this.onPointerMove(e));
      // pause on hover
      this.el.addEventListener("mouseenter", () => this.pauseAutoplay());
      this.el.addEventListener("mouseleave", () => this.resumeAutoplay());
    }
    onPointerDown(e) {
      this.dragging = true;
      this.lastX = e.clientX;
      this.el.style.cursor = "grabbing";
      e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId);
    }
    onPointerUp(e) {
      this.dragging = false;
      this.el.style.cursor = "grab";
      // small momentum after release:
      this.velocity *= 0.98;
    }
    onPointerMove(e) {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      this.lastX = e.clientX;
      // convert dx to offset change
      this.offset += dx * 0.6;
      // convert drag to velocity (for smoother feel)
      this.velocity = dx * 0.02;
    }
    setupClickHandlers() {
      // open modal when clicking an item (non-drag click)
      this.items.forEach((item) => {
        let pointerDownAt = 0;
        item.addEventListener("pointerdown", (e) => {
          pointerDownAt = performance.now();
        });
        item.addEventListener("pointerup", (e) => {
          const elapsed = performance.now() - pointerDownAt;
          if (elapsed < 200 && Math.abs(this.velocity) < 0.8) {
            openModalFromItem(item);
          }
        });
      });
    }
    pauseAutoplay() {
      this.paused = true;
    }
    resumeAutoplay() {
      this.paused = false;
    }
    start() {
      this.paused = false;
      this.raf = requestAnimationFrame(() => this.tick());
    }
    stop() {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
    tick() {
      if (!this.paused && !this.dragging) {
        this.offset += this.velocity;
      } else if (!this.paused && this.dragging) {
        // when dragging, velocity changes are handled in pointermove
      }
      // friction
      this.velocity *= 0.995;
      this.render();
      this.raf = requestAnimationFrame(() => this.tick());
    }
    render() {
      // to implement in subclass
    }
  }

  // CAROUSEL 1: circular 3D layout (rotate around Y)
  class Carousel3D extends CarouselBase {
    constructor(el) {
      super(el);
      this.radius = Math.min(el.clientWidth, 1000) / 2.5;
      window.addEventListener("resize", () => {
        this.radius = Math.min(this.el.clientWidth, 1000) / 2.5;
      });
      // center items absolutely
      this.items.forEach((it) => {
        it.style.position = "absolute";
        it.style.left = "50%";
        it.style.top = "50%";
        it.style.transform = "translate(-50%,-50%)";
      });
    }
    render() {
      const len = this.items.length;
      const angleStep = 360 / len;
      const baseAngle = (this.offset / 2) % 360;
      this.items.forEach((it, i) => {
        const angle = (i * angleStep + baseAngle) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = Math.sin(rad) * this.radius;
        const z = Math.cos(rad) * (this.radius * 0.7);
        const scale = 1 + 0.6 * (1 - z / this.radius);
        it.style.transform = `translate3d(${x}px, -50%, ${-z}px) scale(${scale})`;
        it.style.zIndex = Math.round(2000 - z);
        it.style.opacity = 0.6 + (scale - 1) * 0.8;
        it.style.transition = this.dragging ? "none" : "";
        it.style.cursor = "grab";
        // tilt slightly based on x to enhance 3D
        it.style.transform += ` rotateY(${angle * 0.15}deg)`;
      });
    }
  }

  // CAROUSEL 2: coverflow (center item bigger, sides rotated)
  class CarouselCoverflow extends CarouselBase {
    constructor(el) {
      super(el);
      this.center = el.clientWidth / 2;
      this.items.forEach((it) => (it.style.display = "inline-block"));
      window.addEventListener(
        "resize",
        () => (this.center = this.el.clientWidth / 2)
      );
    }
    render() {
      // compute positions along x from offset
      const itemW = this.items[0].getBoundingClientRect().width + 36;
      const centerIndexFloat =
        -this.offset / itemW + (this.items.length - 1) / 2;
      this.items.forEach((it, idx) => {
        const pos = idx - centerIndexFloat;
        const x = pos * itemW;
        const absPos = Math.abs(pos);
        const scale = Math.max(0.7, 1 - absPos * 0.12);
        const rot = pos * -18;
        const z = -Math.max(0, absPos * 120);
        it.style.transform = `translate3d(${x}px, -50%, ${z}px) scale(${scale}) rotateY(${rot}deg)`;
        it.style.position = "absolute";
        it.style.left = "50%";
        it.style.top = "50%";
        it.style.zIndex = Math.round(1000 - absPos * 100);
        it.style.opacity = Math.max(0.35, 1 - absPos * 0.2);
        it.style.transition = this.dragging
          ? "none"
          : "transform 360ms cubic-bezier(.2,.9,.3,1)";
      });
    }
  }

  // CAROUSEL 3: stacked cards with parallax (depth stack)
  class CarouselStack extends CarouselBase {
    constructor(el) {
      super(el);
      this.items.forEach((it) => {
        it.style.position = "absolute";
        it.style.left = "50%";
        it.style.top = "50%";
      });
      this.baseSpacing = 70;
    }
    render() {
      const len = this.items.length;
      // offset in indices
      const center = (this.offset / this.baseSpacing) % len;
      // build stack
      this.items.forEach((it, i) => {
        const idx = i;
        // compute distance from center
        const dist = (idx - center + len) % len;
        // normalize to small range
        const d = dist > len / 2 ? dist - len : dist;
        const translateY = d * 28;
        const translateZ = -Math.abs(d) * 120;
        const scale = 1 - Math.min(0.45, Math.abs(d) * 0.06);
        const rot = d * 6;
        it.style.transform = `translate3d(-50%, calc(-50% + ${translateY}px), ${translateZ}px) scale(${scale}) rotate(${rot}deg)`;
        it.style.zIndex = Math.round(1000 - Math.abs(d) * 100);
        it.style.opacity = Math.max(0.25, 1 - Math.abs(d) * 0.2);
        it.style.transition = this.dragging
          ? "none"
          : "transform 320ms cubic-bezier(.2,.9,.3,1)";
      });
    }
  }

  // Initialize carousels
  const c1 = new Carousel3D($("#carousel-1"));
  const c2 = new CarouselCoverflow($("#carousel-2"));
  const c3 = new CarouselStack($("#carousel-3"));

  // Add click-to-open is already done in CarouselBase.setupClickHandlers

  // small keyboard accessibility: Esc to close modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Example: let each carousel have a slightly different base autoplay speed
  c1.velocity = 0.06;
  c2.velocity = 0.035;
  c3.velocity = -0.045; // negative to spin other direction
})();
