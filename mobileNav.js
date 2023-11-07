import service from './data.service.js';
const categoryList = document.getElementById('category-list');
categoryList.addEventListener('click', (event) => {
  if (event.target.classList.contains('category-item')) {
    const selectedCategory = event.target.textContent;

    localStorage.setItem('selectedCategory', selectedCategory);

    window.location.href = 'categoryPage.html';
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
  const burgerIcon = document.getElementById('burger-icon');
  const mobileMenu = document.querySelector('.links');

  burgerIcon.addEventListener('click', () => {
    mobileMenu.style.height = mobileMenu.style.height === '100%' ? '0' : '100%';
  });
}

// Call the functions where needed
populateCategories();
handleBurgerMenu();