import { createFilmCard } from "createFilmCard.js";
import service from './data.service.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the film ID from local storage
  const selectedFilmId = parseInt(localStorage.getItem("selectedFilmId"), 10);

  if (selectedFilmId) {
    const filmData = await service.getFilms();

    const selectedFilm = filmData.find((film) => film.Id === selectedFilmId);

    if (selectedFilm) {
      // Use the createFilmCard function to generate the film card
      const filmCardContainer = document.getElementById("individualPageFilms");
      const filmCardElement = createFilmCard(selectedFilm);

      // Append the film card to the container
      filmCardContainer.appendChild(filmCardElement);

      // Attach a click event listener to the favorite button on the individual film page
    }
  } else {
    console.log("No selected film ID found in local storage.");
    // Handle the case where no film ID is found in local storage
  }
});
