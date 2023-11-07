import { createFilmCard } from "./createFilmCard.js";

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

async function displayFavoriteFilms() {
  const filmsData = await fetchFilmsData();

  const favoritesContainer = document.getElementById('favorites-page-films');

  const favLocalStorage = JSON.parse(localStorage.getItem('favoriteFilmIDs')) || [];

  if (favLocalStorage.length === 0) {
    favoritesContainer.innerHTML = 'You have no favorite films.';
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
