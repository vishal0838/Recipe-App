const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetailContent = document.querySelector('.recipe-detail-content');

// Functon to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes..<h2>";


    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
    
        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src ="${meal.strMealThumb}">
                <h3>${meal.strMeal}<h3>
                <p><span>${meal.strArea}<span> Dish<p>
                <p>Belongs to <span>${meal.strCategory}<span> category<p>`
                 
    
            const button = document.createElement('button'); 
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
    
            // Adding event listener to button 
            button.addEventListener('click', () =>{
                openRecipePopup(meal);
            });
    
            recipeContainer.appendChild(recipeDiv)
        });

    }
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fething Recipes...<h2>";

    }

    // console.log(response);
    

}

// Function to fetch ingredents and measurement
const fetchIngredients = (meal) => {
    let ingredentList = "";
    for (let i = 1; i<=28; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredentList += `<li>${measure} ${ingredient}</li>`
            
        }
        else{
            break;
        }
    }
    return ingredentList;


}


const openRecipePopup =(meal) => {
    recipeDetailContent.innerHTML = `
    <h2 class=""recipeName">${meal.strMeal}<h2>
    <h3>Ingredents:<h3>
    <ul class="ingredientList">${fetchIngredients(meal)}<ul>
    <div class="recipeInstructions">
        <h3>Instructions: </h3>
        <p >${meal.strInstructions}</p>
        
    </div>

    `

   
    recipeDetailContent.parentElement.style.display = "block";
     

};

recipeCloseBtn.addEventListener('click' ,() => {
    recipeDetailContent.parentElement.style.display = "none";
});



searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    let searchInput = searchBox.value.trim(); 
    //Removes the leading spaces 
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.<h/2>`
    }

    fetchRecipes(searchInput);
    // console.log('button was pressed');
}) 