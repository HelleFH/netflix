import { filmCardTmpl } from "./templates.js";
import { handleFavoriteButtonClick } from "./favoriteButton.js";

async function fetchFilmData(filmId) {
  try {
    const response = await fetch('films.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch film data: ${response.status}`);
    }
    const filmData = await response.json();

    // Find the film with the matching ID
    const selectedFilm = filmData.find((film) => film.Id === filmId);

    return selectedFilm;
  } catch (error) {
    console.error('Error fetching film data:', error);
    return null;
  }
}

function loadFavoriteFilmIDs() {
  const storedIDs = localStorage.getItem('favoriteFilmIDs');
  return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
}

const favoriteFilmIDs = loadFavoriteFilmIDs();

document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the film ID from local storage
  const selectedFilmId = parseInt(localStorage.getItem("selectedFilmId"), 10);

  if (selectedFilmId) {
    const filmData = await fetchFilmData(selectedFilmId);

    if (filmData) {
      // Import the film card template and populate it with the film data
      const filmCardContainer = document.getElementById("individual-film-container");
      const filmCardHTML = filmCardTmpl(filmData);

      // Populate the film card container with the generated HTML
      filmCardContainer.innerHTML = filmCardHTML;

      // Attach a click event listener to the favorite button on the individual film page
      const favoriteButton = filmCardContainer.querySelector('.favorite-button');
      const clickOrTouch = ("ontouchstart" in window) ? "touchend" : "click";

      favoriteButton.addEventListener('clickOrTouch', (event) => {
        event.stopPropagation(); // Prevent event propagation
        handleFavoriteButtonClick(favoriteButton, filmData.Id);
      });
    }
  } else {
    console.log("No selected film ID found in local storage.");
    // Handle the case where no film ID is found in local storage
  }
});
