document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById('pageContent');

  const handleMouseOver = (event) => {
    const filmCard = event.target.closest('.film-card-container');
    if (filmCard) {
      document.querySelectorAll('.film-card').forEach(card => card.classList.remove('first-card'));

      // Determine if the card is the first in its row
      const isFirstInRow = isFirstChildInRow(filmCard);

      // Add first-card class if it's the first in the row
      if (isFirstInRow) {
        filmCard.classList.add('first-card');
      }

      // Add hovered class
      filmCard.classList.add('hovered');
      
      const description = filmCard.querySelector('.film-description');
      const fullDescription = description.textContent;
      const stopIndex = fullDescription.indexOf('.', 20);
      if (stopIndex !== -1) {
        const truncatedDescription = fullDescription.substring(0, stopIndex + 1);
        description.textContent = truncatedDescription;
      }
    }
  };

  const handleMouseOut = (event) => {
    const filmCard = event.target.closest('.film-card-container');
    if (filmCard) {
      filmCard.classList.remove('hovered');
    }
  };document.addEventListener("DOMContentLoaded", () => {
    const pageContent = document.getElementById('pageContent');
    let hoverTimer; // Variable to store the timer ID
  
    const handleMouseOver = (event) => {
      const filmImage = event.target.closest('.film-card-container');
      if (filmImage) {
        const filmCard = filmImage.closest('.film-card-container');
  
        // Remove first-card class from all cards
        document.querySelectorAll('.film-card-container img').forEach(card => card.classList.remove('first-card'));
  
        // Determine if the card is the first in its row
        const isFirstInRow = isFirstChildInRow(filmCard);
  
        // Add first-card class if it's the first in the row
        if (isFirstInRow) {
          filmCard.classList.add('first-card');
        }
  
        // Add hovered class
        filmCard.classList.add('hovered');
  
        // Clear the previous timer (if any) and set a new one
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          filmCard.classList.remove('hovered');
        }, 200); // Adjust the delay as needed
  
        const description = filmCard.querySelector('.film-description');
        const fullDescription = description.textContent;
        const stopIndex = fullDescription.indexOf('.', 20);
        if (stopIndex !== -1) {
          const truncatedDescription = fullDescription.substring(0, stopIndex + 1);
          description.textContent = truncatedDescription;
        }
      }
    };
  
    const handleMouseOut = (event) => {
      const filmCard = event.target.closest('.film-card-container');
      if (filmCard) {
        // Clear the timer when the mouse leaves the card
        clearTimeout(hoverTimer);
        filmCard.classList.remove('hovered');
      }
    };
   
    // Use mouseover event directly on the film card image
    pageContent.addEventListener('mouseover', handleMouseOver);
  
    pageContent.addEventListener('mouseout', handleMouseOut);
  });
  
  // Function to check if a card is the first in its row
  function isFirstChildInRow(card) {
    const leftSiblings = Array.from(card.parentElement.children).slice(0, Array.from(card.parentElement.children).indexOf(card));
    return leftSiblings.length === 0;
  }
  
  

  // Use mouseover event directly on the film card
  pageContent.addEventListener('mouseover', handleMouseOver);

  pageContent.addEventListener('mouseout', handleMouseOut);
});

// Function to check if a card is the first in its row
function isFirstChildInRow(card) {
  const leftSiblings = Array.from(card.parentElement.children).slice(0, Array.from(card.parentElement.children).indexOf(card));
  return leftSiblings.length === 0;
}