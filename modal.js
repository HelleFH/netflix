import service from "./data.service.js";
import { createFilmCard } from "./createFilmCard.js";

const filmsData = await service.getFilms();

async function openFilmModal(filmId) {
  const selectedFilm = filmsData.find((film) => film.Id === filmId);

  if (selectedFilm) {
    // Create film card for the modal using the existing logic
    const modalFilmCard = createFilmCard(selectedFilm);

    // Create modal and append the film card
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('show');
    modal.appendChild(modalFilmCard);

    document.body.appendChild(modal);
    const clickOrTouch = ("ontouchstart" in window) ? "touchend" : "click";

    const closeModalButton = modal.querySelector('.close-modal-button');
    closeModalButton.addEventListener(clickOrTouch, () => {
      modal.removeChild(modalFilmCard);
      document.body.removeChild(modal);
    });
  }
}

const pageContent = document.getElementById('pageContent');
const clickOrTouch = ("ontouchstart" in window) ? "touchend" : "click";
pageContent.addEventListener(touchstartEvent, (event) => {
  if (event.target.tagName === 'IMG') {
    const filmId = event.target.getAttribute('data-id');

    if (filmId) {
      // Start a timer for long touch
      const longTouchTimer = setTimeout(() => {
        // Long touch action (open modal, for example)
        openFilmModal(parseInt(filmId, 10));
      }, 500); // Adjust the duration as needed

      // Listen for touchend event to clear the timer
      const touchEndHandler = () => {
        clearTimeout(longTouchTimer);
        // Remove the touchend event listener
        document.removeEventListener(touchendEvent, touchEndHandler);
      };

      // Add the touchend event listener
      document.addEventListener(touchendEvent, touchEndHandler);
    }
  }
});