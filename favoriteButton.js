export function handleFavoriteButtonClick(favoriteButton, filmId) {

    function loadFavoriteFilmIDs() {
        const storedIDs = localStorage.getItem('favoriteFilmIDs');
        return storedIDs ? new Set(JSON.parse(storedIDs)) : new Set();
    }
    
    const favoriteFilmIDs = loadFavoriteFilmIDs();
  
    if (favoriteButton.getAttribute('data-state') === 'unfavorited') {
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
  }
  