import { createFilmCard } from "/components/cards/createFilmCard.js";
import service from '../../Data/data.service.js';
import { initializeSearch } from "/components/search/search.js";

document.addEventListener('DOMContentLoaded', async () => {
  const selectedCategory = localStorage.getItem('selectedCategory');
  const categoryPageHeader = document.querySelector('.category-page-header');

  initializeSearch();

  if (selectedCategory) {
    try {
      const filmsData = await service.getFilms();
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
});
