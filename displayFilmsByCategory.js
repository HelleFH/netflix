import { createFilmCard } from "createFilmCard.js";
import service from "data.service.js";

const filmsData = await service.getFilms();

console.log(filmsData); // Log the data to check if it's correctly loaded
const uniqueCategories = [...new Set(filmsData.map(film => film.Category))];
console.log(uniqueCategories);

export function displayFilmsByCategory(filmsData) {
  const categoriesContainer = document.getElementById('categorySortedFilms');
  categoriesContainer.innerHTML = '';
  const filmsByCategory = {};

  const sortedFilmsData = filmsData.slice().sort((a, b) => a.Category.localeCompare(b.Category));

  sortedFilmsData.forEach((film) => {
    const category = film.Category;

    if (!filmsByCategory[category]) {
      filmsByCategory[category] = [];
    }

    filmsByCategory[category].push(film);
  });

  for (const category in filmsByCategory) {
    if (filmsByCategory.hasOwnProperty(category)) {
      const filmsInCategory = filmsByCategory[category];

      const categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category;
      const filmList = document.createElement('div');
      filmList.classList.add('film-list');

      filmsInCategory.forEach((film) => {
        const filmCard = createFilmCard(film);

        filmList.appendChild(filmCard);
      });

      const filmRow = document.createElement('div');
      filmRow.classList.add('category-row');
      filmRow.appendChild(categoryHeader);
      filmRow.appendChild(filmList);
      categoriesContainer.appendChild(filmRow);
    }
  }
}


export function sortAndDisplayFilms(filmsData, selectedOption) {
  try {
    const sortedFilmsContainer = document.getElementById('sortedFilms');
    const categoryRows = document.querySelectorAll('.category-row');
    categoryRows.forEach(categoryHeader => {
      categoryHeader.style.display = 'none';
      sortedFilmsContainer.style.display = 'grid';
    });

    if (selectedOption === 'title-asc') {
      filmsData.sort((a, b) => a.Title.localeCompare(b.Title, 'sv'));
    } else if (selectedOption === 'title-desc') {
      filmsData.sort((a, b) => b.Title.localeCompare(a.Title, 'sv'));
    } else if (selectedOption === 'release-date') {
      filmsData.sort((a, b) => a.ReleaseYear - b.ReleaseYear);
    } else if (selectedOption === 'genres') {

      window.location.reload();
      return; 
    }

    sortedFilmsContainer.innerHTML = ''; 
    filmsData.forEach(film => {
      const filmCard = createFilmCard(film);
      sortedFilmsContainer.appendChild(filmCard);
    });
  } catch (error) {
    console.error('Error sorting and displaying films:', error);
  }
}
export function initializeDropdowns() {
  const categoryDropdown = document.getElementById('categoryDropdown');
  const sortDropdown = document.getElementById('sortDropdown');

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categoryDropdown.appendChild(option);
  });

  categoryDropdown.addEventListener('change', () => {
    const selectedCategory = categoryDropdown.value;
    const filteredFilms = filmsData.filter((film) => selectedCategory === '' || film.Category === selectedCategory);
    clearFilms();
    displayFilmsByCategory(filteredFilms);
  });

  sortDropdown.addEventListener('change', () => {
    const selectedOption = sortDropdown.value;
    const selectedCategory = categoryDropdown.value;
    const filteredFilms = filmsData.filter((film) => selectedCategory === '' || film.Category === selectedCategory);
    clearFilms();
    sortAndDisplayFilms(filteredFilms, selectedOption);
  });

  function clearFilms() {
    const sortedFilmsContainer = document.getElementById('sortedFilms');
    sortedFilmsContainer.innerHTML = '';
  }
}





  