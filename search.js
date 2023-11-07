import { createFilmCard } from "./createFilmCard.js";

export function initializeSearch(filmsData) {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const resultRow = document.getElementById("search-result-films");
  const categoryContent = document.getElementById('categories-content');

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

      const filteredFilms = filmsData.filter((film) => {
        const filmTitle = film.Title.toLowerCase();
        return filmTitle.includes(searchTerm);
      });

      filteredFilms.forEach((film) => {
        const filmCard = createFilmCard(film);
        resultRow.appendChild(filmCard);
      });
    } else {
      resultRow.innerHTML = "";
      resultRow.style.display = "none";
      categoryContent.classList.remove('hidden');
    }
  });
}
