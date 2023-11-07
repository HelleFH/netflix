// Import the necessary modules
import { createFilmCard } from "./createFilmCard.js";
import service from './data.service.js';

// Function to initialize the search
export function initializeSearch() {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const resultRow = document.getElementById("search-result-films");
  const categoryContent = document.getElementById('searchable-content');

  searchButton.addEventListener("click", function () {
    searchInput.classList.toggle("hidden");

    if (!searchInput.classList.contains("hidden")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
      resultRow.style.display = "none";
      categoryContent.classList.remove('hidden');
    }
  });

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (/[\w\d]/.test(searchTerm)) {
      resultRow.innerHTML = "";
      resultRow.style.display = "grid";
      categoryContent.classList.add('hidden');

      service.getFilms().then(filmsData => {
        const filteredFilms = filmsData.filter((film) => {
          const filmTitle = film.Title.toLowerCase();
          return filmTitle.includes(searchTerm);
        });

        filteredFilms.forEach((film) => {
          const filmCard = createFilmCard(film);
          resultRow.appendChild(filmCard);
        });
      }).catch(error => {
        console.error('Error fetching film data:', error);
      });
    } else {
      resultRow.innerHTML = "";
      resultRow.style.display = "none";
      categoryContent.classList.remove('hidden');
    }
  });
}
