import { createFilmCard } from './createFilmCard.js';
const selectedCategory = localStorage.getItem('selectedCategory');
const categoryPageHeader = document.querySelector(".category-page-header");


if (selectedCategory) {
  fetch('films.json')
    .then((response) => response.json())
    .then((filmsData) => {
      const filteredFilms = filmsData.filter((film) => film.Category === selectedCategory);

      const filmList = document.getElementById('category-page-films');
      filteredFilms.forEach((film) => {
        // Use the createFilmCard function to create film cards
        const filmCard = createFilmCard(film);
        filmList.appendChild(filmCard);
      });
    })
    .catch((error) => {
      console.error('Error fetching and displaying films:', error);
    });
  categoryPageHeader.textContent = selectedCategory;

} else {
  console.log('No category selected.');
}
