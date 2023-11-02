import service from "./data.service.js";
import { filmCardTmpl } from "./templates.js"; 

const app = {};

app.init = async () => {
  
  function loadFavoriteFilmIDs() {
    const storedIDs = localStorage.getItem('favoriteFilmIDs');
    return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
}

const favoriteFilmIDs = loadFavoriteFilmIDs();
  let filmsData = [];
  let favLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];

  async function fetchAndDisplayFilms() {
    try {
      const response = await service.getFilms();
      filmsData = await response.json();
      displayFilmsByCategory();
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  }

  function displayFilmsInAll() {
    const viewAllCards = document.getElementById('viewAllCards');

    const filmList = document.createElement('div');
    filmList.classList.add('film-list');

    filmsData.forEach((film) => {
      const filmCard = createFilmCard(film);
      filmList.appendChild(filmCard);
    });

    viewAllCards.innerHTML = '';
    viewAllCards.appendChild(filmList);


  }
  fetch('films.json')
  .then(response => response.json())
  .then(data => {
      console.log(data); // Log the data to check if it's correctly loaded
      const uniqueCategories = [...new Set(data.map(film => film.Category))];
      console.log(uniqueCategories); // Log the unique categories
      
  const categoryDropdown = document.getElementById('categoryDropdown');

  uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.text = category;
      categoryDropdown.appendChild(option);
  });
  categoryDropdown.addEventListener('change', function () {
    const selectedCategory = categoryDropdown.value;
  
    // Get all category rows
    const categoryRows = document.querySelectorAll('.category-row');
  
    categoryRows.forEach(categoryRow => {
      const categoryHeader = categoryRow.querySelector('h2');
  
      if (categoryHeader.textContent === selectedCategory || selectedCategory === '') {
        // Show the category row if it matches the selected category or no category is selected
        categoryRow.style.display = 'block';
      } else {
        // Hide the category row if it doesn't match the selected category
        categoryRow.style.display = 'none';
      }
    });
  });

  
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const resultRow = document.getElementById("result-row");

  searchButton.addEventListener("click", function () {
    // Toggle the visibility of the search input
    searchInput.classList.toggle("hidden");
  
    // If the search input is now visible, focus on it
    if (!searchInput.classList.contains("hidden")) {
      searchInput.focus();
    } else {
      // If the search input is hidden, clear its value
      searchInput.value = "";
      // Remove the "active" class from the result container to hide search results
      resultContainer.classList.remove("active");
    }
  });

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (/[\w\d]/.test(searchTerm)) {
    resultRow.innerHTML = "";

    resultContainer.style.display = "flex";

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

    resultContainer.style.display = "none";
  }
});
let searchHeader = resultContainer.querySelector("h2");
if (!searchHeader) {
    searchHeader = document.createElement("h2");
    searchHeader.textContent = "Search Results";
    resultContainer.appendChild(searchHeader); 
}
console.log(searchHeader); 
  
    })
  .catch(error => console.error('Error:', error));

function createFilmCard(film) {
    const filmCard = document.createElement('div');
    filmCard.innerHTML = filmCardTmpl(film);
    
    const favoriteButton = filmCard.querySelector('.favorite-button');
    const filmId = film.Id;

    // Check if the film is in favorites and set the button state accordingly
    if (favoriteFilmIDs.has(filmId)) {
        favoriteButton.setAttribute('data-state', 'favorited');
        favoriteButton.innerHTML = '<i class="fas fa-check"></i>';
    } else {
        favoriteButton.setAttribute('data-state', 'unfavorited');
        favoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
    }

    favoriteButton.addEventListener('click', () => {
        console.log('Button clicked');
        const currentState = favoriteButton.getAttribute('data-state');

        if (currentState === 'unfavorited') {
            // Add the film ID to the list of favorites
            favoriteFilmIDs.add(filmId);
            favoriteButton.setAttribute('data-state', 'favorited');
            favoriteButton.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            // Remove the film ID from the list of favorites
            favoriteFilmIDs.delete(filmId);
            favoriteButton.setAttribute('data-state', 'unfavorited');
            favoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
        }

        // Save the updated list of favorite film IDs in local storage
        localStorage.setItem('favoriteFilmIDs', JSON.stringify(Array.from(favoriteFilmIDs)));
    });

    return filmCard;
}

function displayFilmsByCategory() {
  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.innerHTML = '';
  const filmsByCategory = {};

  // Sort the filmsData array by category alphabetically
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

  const categoriesHeader = document.getElementById("categoriesHeader");


viewAllLink.addEventListener("click", function (event) {
  const viewAllContainer = document.getElementById("viewAllContainer");
  const categoriesContainer = document.getElementById("categories-container");
  const rightChevron = document.querySelector (".fa-chevron-right")

  if (viewAllContainer.style.display === "none") {
    viewAllContainer.style.display = "grid";
    categoriesContainer.style.display = "none";
    rightChevron.style.display = "none";
    viewAllLink.innerHTML = '<div id="viewallLinkReturn" ><i class="fas fa-chevron-left" ></i> Tilbage til kategorier</div>';
   
    displayFilmsInAll();

    categoriesHeader.style.display = "none";

  } else {
    viewAllContainer.style.display = "none";
    categoriesContainer.style.display = "grid";
    viewAllLink.innerHTML = 'Alle film a-å';

    categoriesHeader.style.display = "block";

  }
});

  async function fetchAndDisplayFilms() {
    try {
      const response = await fetch('films.json'); 
      filmsData = await response.json();
      displayFilmsByCategory();
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  }

  

  fetchAndDisplayFilms();
};


app.init();

export const listViewButton = document.getElementById('listViewButton');
listViewButton.addEventListener('click', function () {
    listViewButton.classList.add('view-active');
    gridViewButton.classList.remove('view-active');
    const viewAllCards = document.getElementById('viewAllCards');
    viewAllCards.classList.add('list-view');
    viewAllCards.classList.remove('grid-view');
});


export const gridViewButton = document.getElementById('gridViewButton');
gridViewButton.addEventListener('click', function () {
    gridViewButton.classList.add('view-active');
    listViewButton.classList.remove('view-active');
    const viewAllCards = document.getElementById('viewAllCards');
    viewAllCards.classList.remove('list-view');
    viewAllCards.classList.add('grid-view');
});
