document.addEventListener("DOMContentLoaded", () => {
    const parentElement = document.getElementById("pageContent"); // Replace with the appropriate parent element's ID

    parentElement.addEventListener("input", function (event) {
        const isMobile = window.innerWidth <= 768;
        const target = event.target;
        
        if (isMobile && target.classList.contains("film-description")) {
            const fullDescription = target.textContent;
            const words = fullDescription.split(" ");
            const truncatedText = words.slice(0, 20).join(" "); // Display the first 20 words
            target.textContent = truncatedText;
        }
    });
});
