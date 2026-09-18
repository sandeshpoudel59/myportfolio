/*
  gallery.js
  Renders the full "My Works" gallery on mywork.html — every project as
  an image-only tile (no title/description/link). Clicking a tile opens
  the full image in the shared lightbox (see lightbox.js).

  Data source priority:
  1. Browser localStorage (key: "portfolioProjects") — set by upload.html
  2. projects.json file sitting next to index.html — used as a fallback.
*/
(function () {
    const STORAGE_KEY = "portfolioProjects";
    const container = document.getElementById("gallery-container");
    const emptyMsg = document.getElementById("gallery-empty");

    function renderGallery(projects) {
        if (!container) return;

        if (!Array.isArray(projects) || projects.length === 0) {
            if (emptyMsg) emptyMsg.style.display = "block";
            return;
        }

        if (emptyMsg) emptyMsg.style.display = "none";

        const html = projects.map((project) => {
            const image = project.image ? project.image : "logo.png";
            const safeImage = escapeAttr(image);
            return `
                <div class="gallery-item lightbox-trigger" data-full="${safeImage}">
                    <img src="${safeImage}" alt="Project">
                </div>
            `;
        }).join("");

        container.insertAdjacentHTML("beforeend", html);
    }

    function escapeAttr(str) {
        return String(str).replace(/"/g, "&quot;");
    }

    function loadFromLocalStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : null;
        } catch (e) {
            return null;
        }
    }

    function loadFromJsonFile() {
        fetch("projects.json")
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => renderGallery(data))
            .catch(() => {
                // No local server / no projects.json available — leave the
                // "coming soon" placeholder visible.
            });
    }

    const localProjects = loadFromLocalStorage();
    if (localProjects && localProjects.length > 0) {
        renderGallery(localProjects);
    } else {
        loadFromJsonFile();
    }
})();
