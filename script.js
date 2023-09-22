
const service = {};


service.getFilms = async () => {
    try {
            
        const response = await fetch('films.json')
        const films = await response.json();
        return films;
    
    
    
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }

}


let filmsData = [];
let favLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];

function createFilmCard(film) {
    const filmCard = document.createElement('div');
    filmCard.classList.add('film-card');
    filmCard.innerHTML = `
        <div class="film-image">
            <img src="${film.Image}" alt="${film.Title}" data-id="${film.Id}">
        </div>
        <h3>${film.Title}</h3>

    
        <div class="film-details">

        <div class="film-card-buttons">
            <div class="play-button"><i class="fa-solid fa-play"></i></div>
            <div class="favorite-button" data-film-id="${film.Id}"><i class="fa-solid fa-plus"></i></div>
        </div>

            <p>${film.Description}</p>

        </div>
    `;
    return filmCard;
}

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
                const filmCard = createFilmCard(film);
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

    renderFavoriteList();
}

document.addEventListener('click', (event) => {
    const favoriteButton = event.target.closest('.favorite-button');
    if (favoriteButton) {
        event.preventDefault(); 
        const filmId = favoriteButton.getAttribute('data-film-id');
        addToFavorites(filmId);
    }
});

const favoriteListTmpl = (film) => `

<div class="favorite-card">
<div class="film-image">
<img src="${film.Image}" alt="${film.Title}" data-id="${film.Id}">
</div>
<h3>${film.Title}</h3>


<div class="film-details">

<div class="play-button"><i class="fa-solid fa-play"></i></div>
<p>${film.Description}</p>
</div>

</div>
`;

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

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayFilms();
    renderFavoriteList(); 
});

function displayFilmsInAll() {
    const viewAllCards = document.getElementById('viewAllCards');
    
    const favoriteListContainer = document.querySelector('.favorite-list-container');
    favoriteListContainer.style.display = 'none';

    const filmList = document.createElement('div');
    filmList.classList.add('film-list');

    filmsData.forEach((film) => {
        const filmCard = createFilmCard(film);
        filmList.appendChild(filmCard);
    });

    viewAllCards.innerHTML = '';
    viewAllCards.appendChild(filmList);
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
        viewAllLink.textContent = 'Back to Categories';
        displayFilmsInAll(); 
    } else {
        viewAllContainer.style.display = 'none';
        categoriesContainer.style.display = 'flex';
        viewAllLink.textContent = 'View All';
        favoriteListContainer.style.display = 'flex';
    }
});
const listViewButton = document.getElementById('listViewButton');
listViewButton.addEventListener('click', function () {
    listViewButton.classList.add('view-active');
    gridViewButton.classList.remove('view-active');
    const viewAllCards = document.getElementById('viewAllCards');
    viewAllCards.classList.add('list-view');
    viewAllCards.classList.remove('grid-view');
});


const gridViewButton = document.getElementById('gridViewButton');
gridViewButton.addEventListener('click', function () {
    gridViewButton.classList.add('view-active');
    listViewButton.classList.remove('view-active');
    const viewAllCards = document.getElementById('viewAllCards');
    viewAllCards.classList.remove('list-view');
    viewAllCards.classList.add('grid-view');
});




fetchAndDisplayFilms();





