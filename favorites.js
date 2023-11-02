import { filmCardTmpl } from "./templates.js";

function loadFavoriteFilmIDs() {
    const storedIDs = localStorage.getItem('favoriteFilmIDs');
    return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
}

const favoriteFilmIDs = loadFavoriteFilmIDs();
  let filmsData = [];
  let favLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];

function createFilmCard(film) {
    const filmCard = document.createElement('div');
    filmCard.innerHTML = filmCardTmpl(film);
    
    const favoriteButton = filmCard.querySelector('.favorite-button');
    const filmId = film.Id;

    // Check if the film is in favorites and set the button state accordingly
    if (favoriteFilmIDs.has(filmId)) {
        favoriteButton.setAttribute('data-state', 'favorited');
        favoriteButton.innerHTML = '<i class="fas fa-check"></i>';
    } else {
        favoriteButton.setAttribute('data-state', 'unfavorited');
        favoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
    }

    favoriteButton.addEventListener('click', () => {
        console.log('Button clicked');
        const currentState = favoriteButton.getAttribute('data-state');

        if (currentState === 'unfavorited') {
            // Add the film ID to the list of favorites
            favoriteFilmIDs.add(filmId);
            favoriteButton.setAttribute('data-state', 'favorited');
            favoriteButton.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            // Remove the film ID from the list of favorites
            favoriteFilmIDs.delete(filmId);
            favoriteButton.setAttribute('data-state', 'unfavorited');
            favoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
        }

        // Save the updated list of favorite film IDs in local storage
        localStorage.setItem('favoriteFilmIDs', JSON.stringify(Array.from(favoriteFilmIDs)));
    });

    return filmCard;
}

async function fetchFilmsData() {
  try {
    const response = await fetch('films.json');
    return response.json();
  } catch (error) {
    console.error('Error fetching films:', error);
  }
}

async function displayFavoriteFilms() {
  const filmsData = await fetchFilmsData();

  const favoritesContainer = document.getElementById('favorites-container');

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
