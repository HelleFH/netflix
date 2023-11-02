import { filmCardTmpl } from "./templates.js"; 

async function fetchFilmData(filmId) {
    try {
        const response = await fetch('films.json'); // Check the URL
        console.log("Response status:", response.status); // Debug statement
        if (!response.ok) {
            throw new Error(`Failed to fetch film data: ${response.status}`);
        }
        const filmData = await response.json();
        console.log("Fetched Film Data:", filmData); // Debug statement

        // Find the film with the matching ID
        const selectedFilm = filmData.find((film) => {
            console.log("Film ID in JSON data:", film.Id, typeof film.Id);
            console.log("Selected Film ID:", filmId, typeof filmId);
            return film.Id === filmId;
        });

        return selectedFilm;
    } catch (error) {
        console.error('Error fetching film data:', error);
        return null;
    }
}
  document.addEventListener("DOMContentLoaded", async () => {
    // Retrieve the film ID from local storage
    const selectedFilmId = parseInt(localStorage.getItem("selectedFilmId"), 10);

    if (selectedFilmId) {
        console.log("Selected Film ID:", selectedFilmId);
        // Fetch the film data based on the selectedFilmId
        const filmData = await fetchFilmData(selectedFilmId);

        if (filmData) {
            console.log("Film Data:", filmData); // Log the fetched film data
            // Import the film card template and populate it with the film data
            const filmCardContainer = document.getElementById("main-content-container");

            // Assuming you have a film card template imported as 'filmCardTmpl'
            const filmCardHTML = filmCardTmpl(filmData);
            console.log("Generated Film Card HTML:", filmCardHTML); // Log the generated HTML

            // Populate the film card container with the generated HTML
            filmCardContainer.innerHTML = filmCardHTML;
        }
    } else {
        console.log("No selected film ID found in local storage.");
        // Handle the case where no film ID is found in local storage
    }
});