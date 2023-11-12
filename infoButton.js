function handleInfoButtonClick(event) {
    const infoButton = event.target;
  
    if (infoButton.classList.contains('fa-circle-info')) {
      const filmId = infoButton.getAttribute('data-id');
  
      // Save the film ID in local storage
      localStorage.setItem('selectedFilmId', filmId);
  
      // Navigate to the individual film page using the film ID
      window.location.href = `./individualFilmPage.html`; // Change the path to match your setup
    }
  }
  
  document.addEventListener('click', handleInfoButtonClick);
  