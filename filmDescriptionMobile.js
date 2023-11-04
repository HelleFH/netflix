document.addEventListener("DOMContentLoaded", async () => {
    const isMobile = window.innerWidth <= 768; // Adjust the screen width breakpoint as needed
    const filmDescriptionElements = document.querySelectorAll('.film-description');

    if (isMobile) {
        filmDescriptionElements.forEach((descriptionElement) => {
            const fullDescription = descriptionElement.textContent;
            const words = fullDescription.split(' ');
            const truncatedText = words.slice(0, 20).join(' '); // Display the first 20 words

            descriptionElement.textContent = truncatedText;
        });
    }
});
