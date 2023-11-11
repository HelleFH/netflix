document.addEventListener("DOMContentLoaded", async () => {
    const pageContent = document.getElementById('pageContent');
    let selectedFilmCard = null;
    let hoverTimer;
    const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  
    const showFilmDetailsWithDelay = (filmCard) => {
      if (!isTouchDevice && window.innerWidth > 400) {
        hoverTimer = setTimeout(() => {
          showFilmDetails(filmCard);
        }, 100);
      }
    };
  
    const showFilmDetails = (filmCard) => {
      if (!isTouchDevice && window.innerWidth > 400) {
        
        clearTimeout(hoverTimer);
        if (selectedFilmCard) {
          selectedFilmCard.querySelector('.film-details').style.display = 'none';
          selectedFilmCard.style.transform = 'scale(1)';
        }
        filmCard.querySelector('.film-details').style.display = 'grid';
        filmCard.style.transform = 'scale(1.4)';
        selectedFilmCard = filmCard;
  
        const description = filmCard.querySelector('.film-description');
        const fullDescription = description.textContent;
        const stopIndex = fullDescription.indexOf('.', 20);
        if (stopIndex !== -1) {
          const truncatedDescription = fullDescription.substring(0, stopIndex + 1);
          description.textContent = truncatedDescription;
        }
      }
    };
  
    const hideFilmDetails = () => {
      if (!isTouchDevice && window.innerWidth > 400) {
        clearTimeout(hoverTimer);
        if (selectedFilmCard) {
          selectedFilmCard.querySelector('.film-details').style.display = 'none';
          selectedFilmCard.style.transform = 'scale(1)';
        }
        selectedFilmCard = null;
      }
    };
  
    pageContent.addEventListener('mouseover', (event) => {
      if (event.target.closest('.film-card') && !event.target.closest('.modal')) {
        const filmCard = event.target.closest('.film-card');
        // Check the width of the film card
        const filmCardWidth = filmCard.getBoundingClientRect().width;
        if (filmCardWidth < 400) {
          showFilmDetailsWithDelay(filmCard);
        }
      }
    });
  
    pageContent.addEventListener('mouseout', (event) => {
      if (!event.relatedTarget || (event.relatedTarget && !event.relatedTarget.closest('.film-card'))) {
        hideFilmDetails();
      }
    });
  
  });
  