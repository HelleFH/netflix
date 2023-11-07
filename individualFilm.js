import { filmCardTmpl } from "./templates.js";
import { handleFavoriteButtonClick } from "./favoriteButton.js";
import service from './data.service.js';
import { initializeSearch } from "./search.js";

const app = {};
initializeSearch()
document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the film ID from local storage
  const selectedFilmId = parseInt(localStorage.getItem("selectedFilmId"), 10);

  if (selectedFilmId) {
    const selectedFilm = await app.init(selectedFilmId);

    if (selectedFilm) {
      // Import the film card template and populate it with the film data
      const filmCardContainer = document.getElementById("individual-page-films");
      const filmCardHTML = filmCardTmpl(selectedFilm);

      // Populate the film card container with the generated HTML
      filmCardContainer.innerHTML = filmCardHTML;

      // Find the favorite button within the film card container
      const favoriteButton = filmCardContainer.querySelector('.favorite-button');

      // Determine the initial state of the favorite button
      if (favoriteFilmIDs.has(selectedFilm.Id)) {
        favoriteButton.setAttribute('data-state', 'favorited');
        favoriteButton.innerHTML = '<i class="fas fa-check"></i>';
      } else {
        favoriteButton.setAttribute('data-state', 'unfavorited');
        favoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
      }

      // Attach a click event listener to the favorite button
      favoriteButton.addEventListener(("ontouchstart" in window) ? "touchend" : "click", (event) => {
        event.stopPropagation(); // Prevent event propagation
        handleFavoriteButtonClick(favoriteButton, selectedFilm.Id);
      });
    }
  } else {
    console.log("No selected film ID found in local storage.");
    // Handle the case where no film ID is found in local storage
  }
});

function loadFavoriteFilmIDs() {
  const storedIDs = localStorage.getItem('favoriteFilmIDs');
  return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
}

const favoriteFilmIDs = loadFavoriteFilmIDs();

app.init = async (filmId) => {
  try {
    // Fetch films data using the service object
    const filmsData = await service.getFilms();

    // Find the film with the matching ID
    const selectedFilm = filmsData.find((film) => film.Id === filmId);

    return selectedFilm;
  } catch (error) {
    console.error('Error fetching film data:', error);
    return null;
  }
}
