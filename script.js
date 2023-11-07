import { createFilmCard } from "./createFilmCard.js";
import { initializeSearch } from "./search.js";
import service from './data.service.js';

const app = {};

app.init = async () => {
  try {
    // Fetch films data using the service object
    const filmsData = await service.getFilms();

    console.log(filmsData); // Log the data to check if it's correctly loaded
    const uniqueCategories = [...new Set(filmsData.map(film => film.Category))];
    console.log(uniqueCategories);

    displayFilmsByCategory(filmsData);

    const categoryDropdown = document.getElementById('categoryDropdown');

    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.text = category;
      categoryDropdown.appendChild(option);
    });

    categoryDropdown.addEventListener('change', function () {
      const selectedCategory = categoryDropdown.value;

      const categoryRows = document.querySelectorAll('.category-row');
      const sortedFilmsContainer = document.getElementById('sorted-films');

      categoryRows.forEach(categoryRow => {
        const categoryHeader = categoryRow.querySelector('h2');

        if (categoryHeader.textContent === selectedCategory || selectedCategory === '') {
          categoryRow.style.display = 'block';
          sortedFilmsContainer.style.display = 'none';
        } else {
          categoryRow.style.display = 'none';
        }
      });

    });

    initializeSearch(filmsData);

  } catch (error) {
    console.error('Error:', error);
  }
};

app.init();

function displayFilmsByCategory(filmsData) {
  const categoriesContainer = document.getElementById('category-sorted-films');
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

const sortDropdown = document.getElementById('sort-dropdown');
const sortedFilmsContainer = document.getElementById('sorted-films');

sortDropdown.addEventListener('change', () => {
  const selectedOption = sortDropdown.value;

  if (selectedOption === 'genres') {
    // Redirect to the same page (you can choose the same or another URL)
    window.location.href = 'index.html';
  } else {
    sortAndDisplayFilms(filmsData, selectedOption);
  }
});

function sortAndDisplayFilms(filmsData, selectedOption) {
  try {
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
    }

    sortedFilmsContainer.innerHTML = ''; // Clear the existing film list
    filmsData.forEach(film => {
      const filmCard = createFilmCard(film);
      sortedFilmsContainer.appendChild(filmCard);
    });
  } catch (error) {
    console.error('Error sorting and displaying films:', error);
  }
}
