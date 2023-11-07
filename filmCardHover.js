document.addEventListener("DOMContentLoaded", async () => {
    const pageContentElements = document.querySelectorAll('#page-content, #favorites-page-films');

    let selectedFilmCard = null;
    let hoverTimer;

    const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    const showFilmDetailsWithDelay = (filmCard) => {
        if (!isTouchDevice) {
            hoverTimer = setTimeout(() => {
                showFilmDetails(filmCard);
            }, 100); // Reduce the delay to 300 milliseconds (0.3 seconds)
        }
    };

    const showFilmDetails = (filmCard) => {
        if (!isTouchDevice) {
            clearTimeout(hoverTimer);

            if (selectedFilmCard) {
                selectedFilmCard.querySelector('.film-details').style.display = 'none';
                selectedFilmCard.style.transform = 'scale(1)';
            }

            filmCard.querySelector('.film-details').style.display = 'block';
            filmCard.querySelector('.film-image-container img').style.display = '';

            filmCard.style.transform = 'scale(1.5)';
            selectedFilmCard = filmCard;

            const description = filmCard.querySelector('.film-description');
            const fullDescription = description.textContent;

            const stopIndex = fullDescription.indexOf('.', 20);

            if (stopIndex !== -1) {
                const truncatedDescription = fullDescription.substring(0, stopIndex + 1);
                description.textContent = truncatedDescription;
            }
        }
    };

    const hideFilmDetails = () => {
        if (!isTouchDevice) {
            clearTimeout(hoverTimer);

            if (selectedFilmCard) {
                selectedFilmCard.querySelector('.film-details').style.display = 'none';
                selectedFilmCard.style.transform = 'scale(1)';
                selectedFilmCard = null;
            }
        }
    };

    pageContentElements.forEach((pageContent) => {
        if (!isTouchDevice) {
            pageContent.addEventListener('mouseover', (event) => {
                if (event.target.closest('.film-card')) {
                    const filmCard = event.target.closest('.film-card');
                    showFilmDetailsWithDelay(filmCard);
                }
            });

            pageContent.addEventListener('mouseout', (event) => {
                if (event.relatedTarget && !event.relatedTarget.closest('.film-card')) {
                    hideFilmDetails();
                }
            });
        }
    });

    document.addEventListener('click', handleClick);
});
