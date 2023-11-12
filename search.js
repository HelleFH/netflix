// Import the necessary modules
import service from "./data.service.js";
import { createFilmCard } from "./createFilmCard.js";

const app = {};
let filmsData;

app.init = async () => {
  try {
    // Fetch films data using the service object
    filmsData = await service.getFilms();
    if (!filmsData || filmsData.length === 0) {
      console.error('No films data available.');
      return;
    }
  } catch (error) {
    console.error('Error fetching films data:', error);
  }
};

// Function to initialize the search
export async function initializeSearch(filmsData) {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const resultRow = document.getElementById("searchResultFilms");
  const categoryContent = document.getElementById('searchableContent');

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

      try {
        const filteredFilms = filmsData.filter((film) => {
          const filmTitle = film.Title.toLowerCase();
          return filmTitle.includes(searchTerm);
        });

        filteredFilms.forEach((film) => {
          const filmCard = createFilmCard(film);
          resultRow.appendChild(filmCard);
        });
      } catch (error) {
        console.error('Error filtering films:', error);
      }
    } else {
      resultRow.innerHTML = "";
      resultRow.style.display = "none";
      categoryContent.classList.remove('hidden');
    }
  });
}
