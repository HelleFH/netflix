
// Add a hover event listener to film cards
const filmCards = document.querySelectorAll('.film-card');

filmCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
      const description = card.querySelector('.film-description');
      const originalDescription = description.textContent;
      const truncated = truncateDescription(originalDescription, 20);
      description.textContent = truncated;
  });

  card.addEventListener('mouseleave', () => {
      const description = card.querySelector('.film-description');
      const originalDescription = description.getAttribute('data-original-description');
      description.textContent = originalDescription;
  });
});
