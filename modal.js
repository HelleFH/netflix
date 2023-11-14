import service from "./data.service.js";
import { createFilmCard } from "./createFilmCard.js";

const filmsData = await service.getFilms();
const isTouchDevice = "ontouchstart" in window;

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

    const touchstartEvent = isTouchDevice ? "touchstart" : "click";
    const touchendEvent = isTouchDevice ? "touchend" : "click";

    const closeModalButton = modal.querySelector('.close-modal-button');
    closeModalButton.addEventListener(touchendEvent, () => {
      modal.removeChild(modalFilmCard);
      document.body.removeChild(modal);
    });
  }
}

const pageContent = document.getElementById('pageContent');
const touchstartEvent = isTouchDevice ? "touchstart" : "click";
const touchendEvent = isTouchDevice ? "touchend" : "click";

let touchStartTime = 0;

pageContent.addEventListener(touchstartEvent, (event) => {
  if (event.target.tagName === 'IMG') {
    touchStartTime = new Date().getTime();
  }
});

pageContent.addEventListener(touchendEvent, (event) => {
  if (event.target.tagName === 'IMG') {
    const touchEndTime = new Date().getTime();
    const touchDuration = touchEndTime - touchStartTime;

    const filmId = event.target.getAttribute('data-id');
    if (filmId && touchDuration > 200) { // Adjust the duration as needed
      openFilmModal(parseInt(filmId, 10));
    }
  }
});
