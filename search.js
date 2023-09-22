document.addEventListener("DOMContentLoaded", function () {
    // Define an array to store the films
    let filmsData = [];

    let searchActive = false; // Variable to track whether search is active or not

    // Function to reset the view
    function resetView() {
        const searchInput = document.getElementById("search-input");
        searchInput.value = ""; // Clear the search input

        // Show all films and categories
        const filmCards = document.getElementsByClassName('film-card');
        for (let i = 0; i < filmCards.length; i++) {
            filmCards[i].style.display = "";
        }

        const categoryContainers = document.querySelectorAll('#categories-container h2');
        categoryContainers.forEach(container => {
            container.style.display = 'flex';
        });
    }

    function searchFilms() {
        // Declare variables
        var input, filter, filmCards, filmTitle, i, txtValue;
        input = document.getElementById('search-input');
        filter = input.value.toLowerCase();
        filmCards = document.getElementsByClassName('film-card');

        // Loop through all film cards and hide those that don't match the search query
        for (i = 0; i < filmCards.length; i++) {
            filmTitle = filmCards[i].querySelector('h3');
            txtValue = filmTitle.textContent || filmTitle.innerText;

            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                filmCards[i].style.display = "";
            } else {
                filmCards[i].style.display = "none";
            }
        }

        // Hide categories without matching films when search is active
        if (searchActive) {
            const categoryContainers = document.querySelectorAll('#categories-container h2');
            categoryContainers.forEach(container => {
                const filmsInCategory = container.querySelectorAll('.film-card');
                const visibleFilmsInCategory = Array.from(filmsInCategory).filter(film => film.style.display !== 'none');
                if (visibleFilmsInCategory.length === 0) {
                    container.style.display = 'none'; // Hide category container if no films in that category are visible
                } else {
                    container.style.display = 'flex';
                }
            });
        }
    }

    // Function to toggle search state and update view
    function toggleSearchState() {
        searchActive = !searchActive;
        const searchInput = document.getElementById('search-input');
        const categoriesContainer = document.getElementById('categories-container'); // Get the categories container
    
        // Clear the search input and hide categories when search is deactivated
        if (!searchActive) {
            searchInput.value = "";
            resetView(); // Call the resetView function to reset the view
            categoriesContainer.classList.remove('active'); // Remove the active class
        } else {
            categoriesContainer.classList.add('active'); // Add the active class when search is active
        }
    }
    // Attach the searchFilms function to the input field's input event
    var searchInputField = document.getElementById('search-input');
    searchInputField.addEventListener('input', searchFilms);

    // Toggle the search input field when the search button is clicked
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    searchButton.addEventListener("click", () => {
        searchInput.classList.toggle("hidden");
        searchInput.focus(); // Focus on the search input when it's shown
        toggleSearchState(); // Toggle search state when the search button is clicked
    });

    // Rest of your code...
});
