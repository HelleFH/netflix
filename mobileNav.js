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
    const response = await fetch('films.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch film data: ${response.status}`);
    }
    const filmsData = await response.json();

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

populateCategories();
const burgerIcon = document.getElementById('burger-icon');
const mobileMenu = document.querySelector('.links');

burgerIcon.addEventListener('click', () => {
  mobileMenu.style.height = mobileMenu.style.height === '100%' ? '0' : '100%' 
});
