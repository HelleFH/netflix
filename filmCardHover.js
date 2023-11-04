document.addEventListener("DOMContentLoaded", async () => {
    const pageContentElements = document.querySelectorAll('#page-content, #favorites-container');
    const modal = document.getElementById('modal'); // Replace with your modal element

    let selectedFilmCard = null;
    let hoverTimer;

    const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    const showFilmDetailsWithDelay = (filmCard) => {
        if (!isTouchDevice) {
            hoverTimer = setTimeout(() => {
                showFilmDetails(filmCard);
            }, 500); // Adjust the delay time (in milliseconds) as needed
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
            filmCard.style.transform = 'scale(1.2)';
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

    const handleClick = (event) => {
        if (selectedFilmCard && !selectedFilmCard.contains(event.target)) {
            if (!(event.target.tagName === 'BUTTON' && event.target.closest('.modal'))) {
                hideFilmDetails();
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
        }

        pageContent.addEventListener('mouseout', (event) => {
            if (event.relatedTarget && !event.relatedTarget.closest('.film-card')) {
                hideFilmDetails();
            }
        });
    });

    document.addEventListener('click', handleClick);
});
