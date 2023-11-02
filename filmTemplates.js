export const filmCardTmpl = (film) => `
<div class="film-card card">
    <div class="film-image-container">
        <img src="${film.Image}" alt="${film.Title}" data-id="${film.Id}">
    </div>
    <h3>${film.Title}</h3>
    <div class="film-details">
        <div class="film-card-buttons">
        
            <div class="play-button"><i class="fa-solid fa-play fa-sm"></i></div>
            <span class="favorite-button"><i class="fas fa-plus"></i></span>
<!-- "Remove from favorites" Font Awesome icon (initially hidden) -->
<span id="favoriteTick_${film.Id}" class="favorite-tick hidden"><i class="fas fa-check"></i></span>
        </div>
        <p>${film.Description}</p>
    </div>
</div>
`;


export const favoriteCardTmpl = (film) => `

<div class="film-image-container">
<img src="${film.Image}" alt="${film.Title}" data-id="${film.Id}">
</div>
<h3>${film.Title}</h3>


<div class="film-details">
<div class="film-card-buttons">

<div class="play-button"><i class="fa-solid fa-play fa-sm"></i></div>
<div class="remove-favorite-button" title="Fjern fra din liste" data-film-id="${film.Id}"><i class="fa-solid fa-minus fa-sm"></i></div>
</div>

<p>${film.Description}</p>
</div>

`;
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
