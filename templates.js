export const filmCardTmpl = (film) => `
  <div class="film-card card">
    <span class="close-modal-button">
      <i class="far fa-times-circle fa-lg"></i>
    </span>
    <div class="film-image-container">
      <img src="${film.Image}" class="film-image" alt="${film.Title}" data-id="${film.Id}">
    </div>
    <div class="film-details">
      <h2>${film.Title}</h2>
      <p class="film-release-year">${film.ReleaseYear}</p>
      <div class="film-card-buttons">
        <div class="play-button">
          <i class="fa-solid fa-play fa-sm"></i>
        </div>
        <button class="favorite-button" data-id="${film.Id}" data-state="unfavorited">
          <i class="fas fa-plus"></i>
        </button>
        <button class="info-button">
          <i class="fa-solid fa-circle-info" data-id="${film.Id}"></i>
        </button>
      </div>
      <p class="film-description">${film.Description}</p>
    </div>
  </div>
`;
