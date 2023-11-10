import { createFilmCard } from "/components/cards/createFilmCard.js";
import service from '../../Data/data.service.js';
import { initializeSearch } from "/components/search/search.js";

async function displayFavoriteFilms() {
  try {
    // Fetch films data using the service object
    const filmsData = await service.getFilms();

    if (!filmsData || filmsData.length === 0) {
      console.error('No films data available.');
      return;
    }

    const favoritesContainer = document.getElementById('favoritesPageFilms');
    const favLocalStorage = JSON.parse(localStorage.getItem('favoriteFilmIDs')) || [];

    if (favLocalStorage.length === 0) {
      favoritesContainer.innerHTML = 'Your list is empty';
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

    // Pass filmsData to initializeSearch
    initializeSearch(filmsData);

  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

window.addEventListener('load', async () => {
  await displayFavoriteFilms();
});
