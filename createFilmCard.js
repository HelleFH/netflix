import { filmCardTmpl } from "templates.js";

// Load favorite film IDs once
const favoriteFilmIDs = loadFavoriteFilmIDs();

function loadFavoriteFilmIDs() {
  const storedIDs = localStorage.getItem('favoriteFilmIDs');
  return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
}

export function createFilmCard(film) {
  const filmCard = document.createElement('div');
  filmCard.innerHTML = filmCardTmpl(film);

  const favoriteButton = filmCard.querySelector('.favorite-button');
  const filmId = film.Id;

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
      favoriteFilmIDs.add(filmId);
      favoriteButton.setAttribute('data-state', 'favorited');
      favoriteButton.innerHTML = '<i class="fas fa-check"></i>';
    } else {
      favoriteFilmIDs.delete(filmId);
      favoriteButton.setAttribute('data-state', 'unfavorited');
      favoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
    }

    localStorage.setItem('favoriteFilmIDs', JSON.stringify(Array.from(favoriteFilmIDs)));
  });

  return filmCard;
}