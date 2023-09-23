import service from "./data.service.js";
import { filmCardTmpl, favoriteListTmpl } from "./templates.js"; 

const app = {};

app.init = async () => {
  const filmCard = await service.getFilms();
  let filmsData = [];
  let favLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];

  function displayFilmsInAll() {
    const viewAllCards = document.getElementById('viewAllCards');
    const favoriteListContainer = document.querySelector('.favorite-list-container');
    favoriteListContainer.style.display = 'none';

    const filmList = document.createElement('div');
    filmList.classList.add('film-list');

    filmsData.forEach((film) => {
      // Create a DOM element from the filmCard template
      const filmCard = createFilmCard(film);
      filmList.appendChild(filmCard);
    });

    viewAllCards.innerHTML = '';
    viewAllCards.appendChild(filmList);
  }

  function createFilmCard(film) {
    // Create a DOM element from the filmCard template
    const filmCard = document.createElement('div');
    filmCard.innerHTML = filmCardTmpl(film);
    
    return filmCard;
  }

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const resultRow = document.getElementById("result-row");


  searchButton.addEventListener("click", function () {
    // Toggle the visibility of the search input
    searchInput.classList.toggle("hidden");

    // If the search input is now visible, focus on it
    if (!searchInput.classList.contains("hidden")) {
      searchInput.focus();
    }
  });


searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (/[\w\d]/.test(searchTerm)) {
    resultRow.innerHTML = "";

    resultContainer.style.display = "block";

    // Filter films based on the search query
    const filteredFilms = filmsData.filter((film) => {
      const filmTitle = film.Title.toLowerCase();
      return filmTitle.includes(searchTerm);
    });

    // Populate the result-row with search results
    filteredFilms.forEach((film) => {
      const filmCard = createFilmCard(film);
      resultRow.appendChild(filmCard);
    });
  } else {
    // Clear the search results if the search term is empty
    resultRow.innerHTML = "";

    // Hide the result container
    resultContainer.style.display = "none";
  }
});
let searchHeader = resultContainer.querySelector("h2");
if (!searchHeader) {
    searchHeader = document.createElement("h2");
    searchHeader.textContent = "Search Results";
    resultContainer.appendChild(searchHeader); // Append to the container
}
console.log(searchHeader); 
  function displayFilmsByCategory() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = ''; 
    const filmsByCategory = {};

    filmsData.forEach((film) => {
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
          // Create a DOM element from the filmCard template
          const filmCard = createFilmCard(film);
        
          // Append the filmCard to filmList
          filmList.appendChild(filmCard);
        });

        const filmRow = document.createElement('div');
        filmRow.classList.add('film-row');
        filmRow.appendChild(categoryHeader);
        filmRow.appendChild(filmList);

        categoriesContainer.appendChild(filmRow);
      }
    }
  }

  function addToFavorites(filmId) {
    filmId = String(filmId);

    if (!favLocalStorage.includes(filmId)) {
      favLocalStorage.push(filmId);

      localStorage.setItem('favorites', JSON.stringify(favLocalStorage));
    }
  }

  document.addEventListener('click', (event) => {
    const favoriteButton = event.target.closest('.favorite-button');
    if (favoriteButton) {
      event.preventDefault();
      const filmId = favoriteButton.getAttribute('data-film-id');
      addToFavorites(filmId);
      renderFavoriteList(); // Call renderFavoriteList after adding to favorites
    }
  });

  const renderFavoriteList = () => {
    const favoriteListContainer = document.querySelector('.favorite-list-container');

    if (favoriteListContainer) {
      favoriteListContainer.innerHTML = '';

      if (favLocalStorage.length !== 0) {
        favLocalStorage.forEach((filmId) => {
          const film = filmsData.find((film) => film.Id == filmId);
          if (film) {
            favoriteListContainer.insertAdjacentHTML('beforeend', favoriteListTmpl(film));
          }
        });
      } else {
        favoriteListContainer.insertAdjacentHTML('beforeend', 'Der er ingen favoritter tilføjet');
      }
    }
  }

  const viewAllLink = document.getElementById('viewAllLink');
  viewAllLink.addEventListener('click', function (event) {
    const viewAllContainer = document.getElementById('viewAllContainer');
    const categoriesContainer = document.getElementById('categories-container');
    const favoriteListContainer = document.querySelector('.favorite-list-container');

    if (viewAllContainer.style.display === 'none') {
      viewAllContainer.style.display = 'grid';
      categoriesContainer.style.display = 'none';
      favoriteListContainer.style.display = 'none';
      viewAllLink.textContent = 'Tilbage til kategorier';
      displayFilmsInAll();
    } else {
      viewAllContainer.style.display = 'none';
      categoriesContainer.style.display = 'flex';
      viewAllLink.textContent = 'Se Alle';
      favoriteListContainer.style.display = 'flex';
    }
  });

  // Function to fetch and display films
  async function fetchAndDisplayFilms() {
    try {
      const response = await fetch('films.json'); 
      filmsData = await response.json();
      displayFilmsByCategory();
      renderFavoriteList();
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  }

  // Initial fetch and display
  fetchAndDisplayFilms();
};


// Initialize the app
app.init();
