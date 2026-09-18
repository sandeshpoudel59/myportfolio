/*
  lightbox.js
  Shared image popup used on index.html (works marquee) and mywork.html
  (full gallery). Any element with class "lightbox-trigger" and a
  "data-full" attribute (or an <img> inside it) will open the full image
  in a centered overlay when clicked.
*/
(function () {
    const overlay = document.getElementById("lightbox-overlay");
    const img = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");

    if (!overlay || !img) return;

    function openLightbox(src) {
        if (!src) return;
        img.src = src;
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        img.src = "";
    }

    document.addEventListener("click", function (e) {
        const trigger = e.target.closest(".lightbox-trigger");
        if (trigger) {
            const inner = trigger.querySelector("img");
            const full = trigger.getAttribute("data-full") || (inner ? inner.src : "");
            openLightbox(full);
        }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLightbox();
    });
})();
