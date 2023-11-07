import { createFilmCard } from "./createFilmCard.js";
import { initializeSearch } from "./search.js";

  function loadFavoriteFilmIDs() {
    const storedIDs = localStorage.getItem('favoriteFilmIDs');
    return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
}

const favoriteFilmIDs = loadFavoriteFilmIDs();


async function fetchFilmsData() {
  try {
    const response = await fetch('films.json');
    return response.json();
  } catch (error) {
    console.error((`Failed to fetch film data: ${response.status}`));
  }
}
const favoritesContainer = document.getElementById('favorites-page-films');

favoritesContainer.addEventListener('click', (event) => {
  if (event.target.closest('.film-card')) {
    // A film card was clicked, handle the click event here
    const filmCard = event.target.closest('.film-card');
    const filmId = filmCard.getAttribute('data-id');

    if (filmId) {
      const favoriteButton = filmCard.querySelector('.favorite-button');
      handleFavoriteButtonClick(favoriteButton, parseInt(filmId, 10));

    }

  }

});
initializeSearch()

async function displayFavoriteFilms() {
  const filmsData = await fetchFilmsData();

  const favoritesContainer = document.getElementById('favorites-page-films');

  const favLocalStorage = JSON.parse(localStorage.getItem('favoriteFilmIDs')) || [];

  if (favLocalStorage.length === 0) {
    favoritesContainer.innerHTML = 'You have no films on your list';
    return;
  }

  favoritesContainer.innerHTML = '';

  favLocalStorage.forEach((filmId) => {
    const film = filmsData.find((film) => film.Id == filmId);
    if (film) {
      const filmCardElement = createFilmCard(film);
      favoritesContainer.appendChild(filmCardElement);
    }

  });
}

window.addEventListener('load', displayFavoriteFilms);
