import { createFilmCard } from "./components/cards/createFilmCard.js";
import { displayFilmsByCategory, initializeDropdowns} from "./displayFilmsByCategory.js"
import { initializeSearch } from "search.js";
import service from './data.service.js';

const app = {};
let filmsData;

app.init = async () => {
  try {
    // Fetch films data using the service object
    filmsData = await service.getFilms();
    if (!filmsData || filmsData.length === 0) {
      console.error('No films data available.');
      return;
    }

    console.log(filmsData);
    const uniqueCategories = [...new Set(filmsData.map(film => film.Category))];
    console.log(uniqueCategories);

    displayFilmsByCategory(filmsData);


    initializeDropdowns();
    

    initializeSearch(filmsData);
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

app.init();
