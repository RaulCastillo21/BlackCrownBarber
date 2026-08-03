/* =============================================================
   Black Crown Barber Club — comportamiento
   Sin librerías. Todo lo que hay aquí es opcional: si el JS
   falla, la web sigue siendo navegable y reservable.
   ============================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ---------- Cabecera: fondo sólido al hacer scroll ---------- */
  var header = document.getElementById("header");
  var fab = document.getElementById("fab");
  var ornament = document.querySelector(".hero__ornament");

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    if (fab) fab.classList.toggle("is-visible", y > 420);
    if (ornament && !reduceMotion) ornament.style.setProperty("--rot", y * 0.25 + "deg");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  /* ---------- Aparición progresiva al hacer scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach(function (el) { observer.observe(el); });
  }


  /* ---------- Carruseles (servicios y opiniones) ----------
     En móvil, cada carrusel es una franja con scroll-snap: se desliza
     con el dedo o con las flechas, y la tarjeta activa se distingue
     porque las vecinas se difuminan (ver --dist en el CSS). A partir
     de 760px el CSS lo convierte en una parrilla normal y este script
     no tiene nada que hacer (las flechas y los puntos quedan ocultos). */
  document.querySelectorAll(".carousel").forEach(function (root) {
    var track = root.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel__slide"));
    var prevBtn = root.querySelector(".carousel__arrow--prev");
    var nextBtn = root.querySelector(".carousel__arrow--next");
    var dotsWrap = root.querySelector(".carousel__dots");
    if (!track || !slides.length) return;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", "Ir a la tarjeta " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    var current = 0;
    var ticking = false;

    function update() {
      ticking = false;
      var trackRect = track.getBoundingClientRect();
      var center = trackRect.left + trackRect.width / 2;
      var half = trackRect.width / 2 || 1;
      var nearest = 0;
      var nearestDist = Infinity;

      slides.forEach(function (slide, i) {
        var r = slide.getBoundingClientRect();
        var dist = Math.abs((r.left + r.width / 2) - center);
        slide.style.setProperty("--dist", Math.min(dist / half, 1).toFixed(3));
        if (dist < nearestDist) { nearestDist = dist; nearest = i; }
      });

      if (nearest !== current) {
        current = nearest;
        dots.forEach(function (d, i) { d.classList.toggle("is-active", i === current); });
      }
    }

    function onTrackScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    function goTo(i) {
      var slide = slides[(i + slides.length) % slides.length];
      slide.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1); });
    track.addEventListener("scroll", onTrackScroll, { passive: true });
    window.addEventListener("resize", onTrackScroll);

    dots[0].classList.add("is-active");
    update();
  });

})();
