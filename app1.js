const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

// Function to get recipes
const fetchRecipes = async (query) => {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        if (!response.meals) {
            recipeContainer.innerHTML = "<p>No recipes found. Try another search!</p>";
            return;
        }

        recipeContainer.innerHTML = response.meals
            .map(meal => `
                <div class="recipe">
                    <h3>${meal.strMeal}</h3>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
                    <p><strong>Category:</strong> ${meal.strCategory}</p>
                    <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 100)}...</p>
                </div>
            `)
            .join('');
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
};

searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Corrected typo
    const searchInput = searchBox.value.trim(); // Removes leading spaces
    if (searchInput) {
        fetchRecipes(searchInput);
    } else {
        recipeContainer.innerHTML = "<p>Please enter a search term.</p>";
    }
});
