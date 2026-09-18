/*
  work.js
  Fetches image filenames from images.json and displays them
  in the same two-row scrolling marquee as before.
*/

(function () {
    const JSON_FILE = "images.json";
    const IMAGE_FOLDER = "images/";

    const marquee = document.getElementById("work-marquee");
    const row1 = document.getElementById("marquee-row1");
    const row2 = document.getElementById("marquee-row2");
    const emptyMsg = document.getElementById("work-empty");
    const viewAllBtn = document.querySelector(".work-viewall");

    // Escape HTML attributes safely
    function escapeAttr(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Create image HTML
    function buildItems(images) {
        return images.map((filename) => {
            const imagePath = IMAGE_FOLDER + filename;
            const safeImage = escapeAttr(imagePath);

            return `
                <div class="marquee-item lightbox-trigger" data-full="${safeImage}">
                    <img src="${safeImage}" alt="Project" loading="lazy">
                </div>
            `;
        }).join("");
    }

    // Render the two marquee rows
    function renderMarquee(images) {
        if (!row1 || !row2) return;

        if (!Array.isArray(images) || images.length === 0) {
            if (marquee) marquee.style.display = "none";
            if (viewAllBtn) viewAllBtn.style.display = "none";
            if (emptyMsg) emptyMsg.style.display = "block";
            return;
        }

        if (emptyMsg) emptyMsg.style.display = "none";
        if (marquee) marquee.style.display = "flex";
        if (viewAllBtn) viewAllBtn.style.display = "block";

        // Split images into two rows
        const rowA = [];
        const rowB = [];

        images.forEach((image, index) => {
            if (index % 2 === 0) {
                rowA.push(image);
            } else {
                rowB.push(image);
            }
        });

        // Make sure both rows have content
        const finalA = rowA.length ? rowA : images;
        const finalB = rowB.length ? rowB : images;

        /*
          Duplicate the images so the CSS marquee can
          loop continuously without a visible gap.
        */
        row1.innerHTML =
            buildItems(finalA) +
            buildItems(finalA);

        row2.innerHTML =
            buildItems(finalB) +
            buildItems(finalB);
    }

    // Fetch images.json
    function loadImages() {
        fetch(JSON_FILE)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load images.json");
                }

                return response.json();
            })
            .then((images) => {
                renderMarquee(images);
            })
            .catch((error) => {
                console.error("Error loading images:", error);

                if (marquee) marquee.style.display = "none";
                if (viewAllBtn) viewAllBtn.style.display = "none";
                if (emptyMsg) emptyMsg.style.display = "block";
            });
    }

    // Start
    loadImages();

})();