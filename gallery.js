/*
  gallery.js
  Renders the full "My Works" gallery on mywork.html.
  Images are loaded from images.json.

  images.json format:
  [
      "work (1).jpg",
      "work (1).png",
      "work (2).jpg"
  ]

  Clicking a tile opens the full image in the shared lightbox.
*/

(function () {
    const JSON_FILE = "images.json";
    const IMAGE_FOLDER = "images/";

    const container = document.getElementById("gallery-container");
    const emptyMsg = document.getElementById("gallery-empty");

    // Escape HTML attributes safely
    function escapeAttr(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Render all images
    function renderGallery(images) {
        if (!container) return;

        if (!Array.isArray(images) || images.length === 0) {
            if (emptyMsg) {
                emptyMsg.style.display = "block";
            }
            return;
        }

        if (emptyMsg) {
            emptyMsg.style.display = "none";
        }

        const html = images.map((filename) => {
            const imagePath = IMAGE_FOLDER + filename;
            const safeImage = escapeAttr(imagePath);

            return `
                <div class="gallery-item lightbox-trigger" data-full="${safeImage}">
                    <img 
                        src="${safeImage}" 
                        alt="Project"
                        loading="lazy"
                    >
                </div>
            `;
        }).join("");

        // Replace existing content instead of duplicating it
        container.innerHTML = html;
    }

    // Load images from images.json
    function loadImages() {
        fetch(JSON_FILE)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to load ${JSON_FILE}: ${response.status}`
                    );
                }

                return response.json();
            })
            .then((images) => {
                renderGallery(images);
            })
            .catch((error) => {
                console.error("Error loading gallery:", error);

                if (emptyMsg) {
                    emptyMsg.style.display = "block";
                }
            });
    }

    // Start loading
    loadImages();

})();
