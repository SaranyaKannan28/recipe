document.addEventListener('DOMContentLoaded', function () {
    displayRecipes();
});

// Function to determine time of day
function getPartOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
}

// Function to determine the current season
function getSeason() {
    const month = new Date().getMonth(); // 0 = January, 11 = December
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
}

// Function to check if an image exists
function checkImageExists(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
}

// Recipe Data
const recipes = {
    morning: [
        { id: 'pancakes', title: 'Pancakes', image: 'images/pancakes.jpg', link: 'pancakes.html' },
        { id: 'omelette', title: 'Omelette', image: 'images/omelette.jpg', link: 'omelette.html' },
    ],
    afternoon: [
        { id: 'grilled-cheese', title: 'Grilled Cheese Sandwich', image: 'images/grilled-cheese.jpg', link: 'grilled-cheese.html' },
        { id: 'caesar-salad', title: 'Caesar Salad', image: 'images/caesar-salad.jpg', link: 'caesar-salad.html' },
    ],
    evening: [
        { id: 'spaghetti', title: 'Spaghetti Bolognese', image: 'images/spaghetti-bolognese.jpg', link: 'spaghetti.html' },
        { id: 'chocolate-cake', title: 'Chocolate Cake', image: 'images/chocolate-cake.jpg', link: 'chocolate-cake.html' },
    ]
};

const seasonalRecipes = {
    spring: [
        { id: 'strawberry-smoothie', title: 'Strawberry Smoothie', image: 'images/strawberry-smoothie.jpg', link: 'strawberry-smoothie.html' },
        { id: 'spring-salad', title: 'Spring Salad', image: 'images/spring-salad.jpg', link: 'spring-salad.html' },
    ],
    summer: [
        { id: 'iced-tea', title: 'Iced Tea', image: 'images/iced-tea.jpg', link: 'iced-tea.html' },
        { id: 'grilled-vegetables', title: 'Grilled Vegetables', image: 'images/grilled-vegetables.jpg', link: 'grilled-vegetables.html' },
    ],
    fall: [
        { id: 'pumpkin-soup', title: 'Pumpkin Soup', image: 'images/pumpkin-soup.jpg', link: 'pumpkin-soup.html' },
        { id: 'apple-pie', title: 'Apple Pie', image: 'images/apple-pie.jpg', link: 'apple-pie.html' },
    ],
    winter: [
        { id: 'hot-chocolate', title: 'Hot Chocolate', image: 'images/hot-chocolate.jpg', link: 'hot-chocolate.html' },
        { id: 'beef-stew', title: 'Beef Stew', image: 'images/beef-stew.jpg', link: 'beef-stew.html' },
    ]
};

// Function to display recipes
function displayRecipes() {
    const partOfDay = getPartOfDay();
    const season = getSeason();

    const recipeOfTheDay = selectRecipeOfTheDay();
    const remainingRecipes = getRemainingRecipes(partOfDay, season, recipeOfTheDay);

    displayRecipeOfTheDay(recipeOfTheDay);
    displayTrendingRecipes(remainingRecipes);
}

// Function to select Recipe of the Day
function selectRecipeOfTheDay() {
    const partOfDay = getPartOfDay();
    const season = getSeason();
    const allRecipes = [...recipes[partOfDay], ...seasonalRecipes[season]];

    const randomIndex = Math.floor(Math.random() * allRecipes.length);
    return allRecipes[randomIndex];
}

// Function to get remaining recipes
function getRemainingRecipes(partOfDay, season, recipeOfTheDay) {
    const allRecipes = [...recipes[partOfDay], ...seasonalRecipes[season]];
    return allRecipes.filter(recipe => recipe.id !== recipeOfTheDay.id);
}

// Function to display Recipe of the Day
function displayRecipeOfTheDay(recipe) {
    const recipeCard = document.getElementById('recipeOfTheDayCard');
    if (!recipeCard) {
        console.error("Error: #recipeOfTheDayCard not found!");
        return;
    }

    recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" onerror="this.src='images/default.jpg'">
        <h3>${recipe.title}</h3>
        <p>This recipe is trending today, don't miss out!</p>
        <a href="${recipe.link}">Try This Recipe</a>
    `;
}

// Function to display Trending Recipes
function displayTrendingRecipes(recipesList) {
    const carousel = document.getElementById('recipeCarousel');
    if (!carousel) {
        console.error("Error: #recipeCarousel not found!");
        return;
    }

    carousel.innerHTML = '';

    recipesList.forEach(recipe => {
        checkImageExists(recipe.image, (exists) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${exists ? recipe.image : 'images/default.jpg'}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <a href="${recipe.link}">See Recipe</a>
            `;
            carousel.appendChild(recipeCard);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded successfully.");
});

// Search function for filtering recipes dynamically
document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded successfully.");
});

// Search function for filtering recipes dynamically
function searchRecipes() {
    let input = document.getElementById("header-search-input").value.toLowerCase();
    let recipes = document.querySelectorAll(".recipe, .category"); // Search both recipes & categories

    let matchFound = false;

    recipes.forEach(recipe => {
        let recipeName = recipe.querySelector("h3, h4")?.innerText.toLowerCase() || "";

        if (recipeName.includes(input)) {
            recipe.style.display = "block";  // Show matching recipes/categories
            matchFound = true;
        } else {
            recipe.style.display = "none";   // Hide non-matching recipes/categories
        }
    });

    if (!matchFound) {
        console.warn("No matching recipes found.");
    }
}

// Scroll to a specific recipe when clicked
function searchRecipe(recipeName) {
    let formattedName = recipeName.toLowerCase().replace(/\s+/g, "-");

    let recipeElement = document.getElementById(formattedName);
    if (recipeElement) {
        recipeElement.scrollIntoView({ behavior: "smooth" });
    } else {
        alert(`Recipe "${recipeName}" not found.`);
    }
}

// "Start Cooking" Button Scroll Function
document.getElementById("startCookingBtn")?.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("startCookingSection").scrollIntoView({ behavior: "smooth" });
});
