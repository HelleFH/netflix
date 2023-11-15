export function handleFilmCardClick(event) {
  const filmCard = event.target.closest('.film-card-container img');

  if (filmCard) {
    const filmId = filmCard.getAttribute('data-id');

    // Save the film ID in local storage
    localStorage.setItem('selectedFilmId', filmId);

    if (!isTouchDevice()) {
      // Navigate to the individual film page using the film ID
      window.location.href = `./individualFilmPage.html`; // Change the path to match your setup
    }
  }
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

document.getElementById('pageContent').addEventListener('click', handleFilmCardClick);
