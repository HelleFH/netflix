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
      const filmCardContainer = document.getElementById("individual-page-films");
      const filmCardHTML = filmCardTmpl(filmData);

      // Populate the film card container with the generated HTML
      filmCardContainer.innerHTML = filmCardHTML;

      // Attach a click event listener to the favorite button on the individual film page
      const favoriteButton = filmCardContainer.querySelector('.favorite-button');

      // Call the handleFavoriteButtonClick function when the button is clicked

// Determine the initial state of the button
if (favoriteFilmIDs.has(filmData.Id)) {
  favoriteButton.setAttribute('data-state', 'favorited');
  favoriteButton.innerHTML = '<i class="fas fa-check"></i>';
} else {
  favoriteButton.setAttribute('data-state', 'unfavorited');
  favoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
}

favoriteButton.addEventListener(("ontouchstart" in window) ? "touchend" : "click", (event) => {
  event.stopPropagation(); // Prevent event propagation
  handleFavoriteButtonClick(favoriteButton, filmData.Id);
});

    }
  } else {
    console.log("No selected film ID found in local storage.");
    // Handle the case where no film ID is found in local storage
  }
});
