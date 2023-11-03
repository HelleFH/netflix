import { filmCardTmpl } from './templates.js';
import { handleFavoriteButtonClick } from './favoriteButton.js';
var clickOrTouch = ("ontouchstart" in window) ? "touchend" : "click";

// Function to open the modal and populate it with film details
async function openFilmModal(filmId) {

  // Fetch the film data from 'films.json' based on the film ID
  try {
      const response = await fetch('films.json');
      if (!response.ok) {
          throw new Error(`Failed to fetch film data: ${response.status}`);
      }
      const filmsData = await response.json();

      const selectedFilm = filmsData.find((film) => film.Id === filmId);

      if (selectedFilm) {
          // Generate modal content using modalTmpl and selectedFilm
          const modalContent = filmCardTmpl(selectedFilm);

          // Create a modal element
          const modal = document.createElement('div');
          modal.classList.add('modal');
          modal.classList.add('show');
          modal.innerHTML = modalContent;

          // Add the modal to the document
          document.body.appendChild(modal);

          // Attach a click event listener to the close-modal-button
          const closeModalButton = modal.querySelector('.close-modal-button');
          closeModalButton.addEventListener(clickOrTouch, () => {
              // Remove the modal when the close button is clicked
              document.body.removeChild(modal);
          });

          // Find and target the favorite button within the modal content
          const modalFavoriteButton = modal.querySelector('.favorite-button');

modalFavoriteButton.addEventListener(clickOrTouch, () => {
  // Handle the favorite button click within the modal
  // You can use selectedFilm.Id to identify the film
  handleFavoriteButtonClick(modalFavoriteButton, selectedFilm.Id);
});
      }
  } catch (error) {
      console.error('Error opening film modal:', error);
  }
}


const pageContent = document.getElementById('page-content');

pageContent.addEventListener(clickOrTouch , (event) => {
  if (event.target.tagName === 'IMG') {
    const filmId = event.target.getAttribute('data-id');

    if (filmId) {
      openFilmModal(parseInt(filmId, 10)); // Convert to a number
    }
  }
});
