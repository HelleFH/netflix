import { createFilmCard } from "./createFilmCard.js";
import service from './data.service.js';
import { initializeSearch } from "./search.js";

document.addEventListener('DOMContentLoaded', async () => {
  let filmsData; // Declare filmsData in the scope of the event listener

  try {
    // Fetch films data using the service object
    filmsData = await service.getFilms();
    if (!filmsData || filmsData.length === 0) {
      console.error('No films data available.');
      return;
    }
  } catch (error) {
    console.error('Error fetching films data:', error);
  }

  const selectedCategory = localStorage.getItem('selectedCategory');
  const categoryPageHeader = document.querySelector('.category-page-header');

  if (selectedCategory) {
    try {
      const filteredFilms = filmsData.filter((film) => film.Category === selectedCategory);

      const filmList = document.getElementById('categoryPageFilms');
      filteredFilms.forEach((film) => {
        // Use the createFilmCard function to create film cards
        const filmCard = createFilmCard(film);
        filmList.appendChild(filmCard);
      });

      categoryPageHeader.textContent = selectedCategory;
    } catch (error) {
      console.error('Error fetching and displaying films:', error);
    }
  } else {
    console.log('No category selected.');
  }

  initializeSearch(filmsData);
});
