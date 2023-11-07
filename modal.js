import { filmCardTmpl } from "./templates.js";
import { handleFavoriteButtonClick } from "./favoriteButton.js";

function loadFavoriteFilmIDs() {
  const storedIDs = localStorage.getItem('favoriteFilmIDs');
  return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
}

const favoriteFilmIDs = loadFavoriteFilmIDs();

async function openFilmModal(filmId) {
  try {
    const response = await fetch('films.json');
    if (!response.ok) {
      throw Error(`Failed to fetch film data: ${response.status}`);
    }
    const filmsData = await response.json();

    const selectedFilm = filmsData.find((film) => film.Id === filmId);

    if (selectedFilm) {
      // Generate modal content using modalTmpl and selectedFilm
      const modalContent = filmCardTmpl(selectedFilm);

      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.classList.add('show');
      modal.innerHTML = modalContent;

      document.body.appendChild(modal);

      const closeModalButton = modal.querySelector('.close-modal-button');
      closeModalButton.addEventListener(clickOrTouch, () => {
        document.body.removeChild(modal);
      
        // Check if the "search-result-films" container is displayed
        const searchResultFilms = document.getElementById('search-result-films');
        if (window.getComputedStyle(searchResultFilms).display === 'grid') {
          // If it's displayed as grid, do nothing (won't reload)
        } else {
          location.reload(); // Reload the page for other modals
        }
      });
      
      
      
      

      const modalFavoriteButton = modal.querySelector('.favorite-button');

      if (favoriteFilmIDs.has(selectedFilm.Id)) {
        modalFavoriteButton.setAttribute('data-state', 'favorited');
        modalFavoriteButton.innerHTML = '<i class="fas fa-check"></i>';
      } else {
        modalFavoriteButton.setAttribute('data-state', 'unfavorited');
        modalFavoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
      }

      modalFavoriteButton.addEventListener(clickOrTouch, () => {
        handleFavoriteButtonClick(modalFavoriteButton, selectedFilm.Id);
      });
    }
  } catch (error) {
    console.error('Error opening film modal:', error);
  }
}

const pageContent = document.getElementById('page-content');
const clickOrTouch = ("ontouchstart" in window) ? "touchend" : "click";

pageContent.addEventListener(clickOrTouch, (event) => {
  if (event.target.tagName === 'IMG') {
    const filmId = event.target.getAttribute('data-id');

    if (filmId) {
      openFilmModal(parseInt(filmId, 10));
    }
  }
});
