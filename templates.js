export const filmCardTmpl = (film) => `
<div class="film-card">

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
</div>
`
;

export const favoriteListTmpl = (film) => `

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
