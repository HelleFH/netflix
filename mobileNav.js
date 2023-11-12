import service from "./data.service.js";


const navbar = document.querySelector('.navbar');
const scrollOffset = 100; 

window.addEventListener('scroll', () => {
  if (window.pageYOffset > scrollOffset) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});
const categoryList = document.getElementById('categoryList');
categoryList.addEventListener('click', (event) => {
  if (event.target.classList.contains('category-item')) {
    const selectedCategory = event.target.textContent;

    localStorage.setItem('selectedCategory', selectedCategory);

    window.location.href = './categoryPage.html';
  }
});


async function populateCategories() {
  try {
    const filmsData = await service.getFilms();

    const categories = [...new Set(filmsData.map((film) => film.Category))];

    categories.forEach((category) => {
      const categoryItem = document.createElement('li');
      categoryItem.classList.add('category-item');
      categoryItem.textContent = category;
      categoryList.appendChild(categoryItem);
    });
  } catch (error) {
    console.error('Error fetching and populating film categories:', error);
  }
}

// Function to handle burger menu icon click
function handleBurgerMenu() {
  const burgerIcon = document.getElementById('burgerIcon');
  const mobileMenu = document.querySelector('.links');

  burgerIcon.addEventListener('click', () => {
    mobileMenu.style.height = mobileMenu.style.height === '100%' ? '0' : '100%';
  });
}

// Call the functions where needed
populateCategories();
handleBurgerMenu();