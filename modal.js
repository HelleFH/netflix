import service from "data.service.js";
import { createFilmCard } from "createFilmCard.js";

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
      document.body.removeChild(modal);
      location.reload();
    });
  }
}

// Assuming clickOrTouch is defined somewhere in your code
const pageContent = document.getElementById('pageContent');
const clickOrTouch = ("ontouchstart" in window) ? "touchend" : "click";

pageContent.addEventListener(clickOrTouch, (event) => {
  if (event.target.tagName === 'IMG') {
    const filmId = event.target.getAttribute('data-id');

    if (filmId) {
      openFilmModal(parseInt(filmId, 10));
    }
  }
});
