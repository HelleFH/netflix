document.addEventListener("DOMContentLoaded", () => {
  // Attach an event listener to the parent container (filmCardContainer)
  const filmCardContainer = document.getElementById("wrapper");
  const modal = document.getElementById("myModal");
  const favoriteFilmIDs = new Set(); // Initialize with your favorite film IDs

  function openModalWithFilmDetails(imageSrc, title, releaseYear, description, playButtonContent, favoriteButtonContent, filmId) {
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalReleaseYear = document.getElementById("modalReleaseYear");
    const modalDescription = document.getElementById("modalDescription");
    const modalPlayButton = document.getElementById("modalPlayButton");
    const modalFavoriteButton = document.getElementById("modalFavoriteButton");

    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalReleaseYear.textContent = releaseYear;
    modalDescription.textContent = description;
    modalPlayButton.innerHTML = playButtonContent;
    modalFavoriteButton.innerHTML = favoriteButtonContent;

    // Set the data-id attribute on the modal elements
    modalFavoriteButton.setAttribute("data-id", filmId);

    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  const clickOrTouch = ("ontouchstart" in window) ? "touchend" : "click";

  filmCardContainer.addEventListener(clickOrTouch, (event) => {
    const target = event.target;

    if (target.tagName === "IMG" && target.closest(".film-card")) {
      const filmCard = target.closest(".film-card");
      const title = filmCard.querySelector("h3").textContent;
      const description = filmCard.querySelector(".film-description").textContent;
      const releaseYear = filmCard.querySelector(".film-release-year").textContent;
      const playButton = filmCard.querySelector(".play-button").innerHTML;
      const favoriteButton = filmCard.querySelector(".favorite-button").innerHTML;
      const imageSrc = target.src;
      const filmId = filmCard.querySelector(".film-image").getAttribute("data-id");

      openModalWithFilmDetails(imageSrc, title, releaseYear, description, playButton, favoriteButton, filmId);
    }

    if (target.classList.contains("favorite-button")) {
      // Your favorite button logic
      const currentState = target.getAttribute("data-state");
      const filmId = target.getAttribute("data-id");

      if (currentState === "unfavorited") {
        // Add the film ID to the list of favorites
        favoriteFilmIDs.add(filmId);
        target.setAttribute("data-state", "favorited");
        target.innerHTML = '<i class="fas fa-check"></i>';
      } else {
        // Remove the film ID from the list of favorites
        favoriteFilmIDs.delete(filmId);
        target.setAttribute("data-state", "unfavorited");
        target.innerHTML = '<i class="fas fa-plus"></i>';
      }

      localStorage.setItem("favoriteFilmIDs", JSON.stringify(Array.from(favoriteFilmIDs)));
    }
  });

  const modalFavoriteButton = document.getElementById("modalFavoriteButton");

  modalFavoriteButton.addEventListener("click", () => {
    const currentState = modalFavoriteButton.getAttribute("data-state");
    const filmId = modalFavoriteButton.getAttribute("data-id");

    if (currentState === "unfavorited") {
      // Add the film ID to the list of favorites
      favoriteFilmIDs.add(filmId);
      modalFavoriteButton.setAttribute("data-state", "favorited");
      modalFavoriteButton.innerHTML = '<i class="fas fa-check"></i>';
    } else {
      // Remove the film ID from the list of favorites
      favoriteFilmIDs.delete(filmId);
      modalFavoriteButton.setAttribute("data-state", "unfavorited");
      modalFavoriteButton.innerHTML = '<i class="fas fa-plus"></i>';
    }

    // Save the updated list of favorite film IDs in local storage
    localStorage.setItem("favoriteFilmIDs", JSON.stringify(Array.from(favoriteFilmIDs)));
  });

  const closeModalButton = document.getElementById("closeModal");
  closeModalButton.addEventListener(clickOrTouch, closeModal);
});
