const searchInput = document.getElementById("searchInput");

const showAll = document.getElementById("showAll");
const foodContainer = document.querySelector(".food-container");

let nameOfMeal = '';
// listening the search btn click event;
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (searchInput.value !== "") {
    fetchMeals(searchInput.value, 6);
    nameOfMeal = searchInput.value;
  } else {
    alert("Write the name of the meal.");
  }
});

function fetchMeals(searchItem, length) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals) {
        if (data.meals.length > 6) {
          displayMeals(data.meals.slice(0, length));
          showAll.disabled = false;
        } else {
          displayMeals(data.meals);
          showAll.disabled = true;
        }
      } else {
        alert("The meal didn't found");
        foodContainer.innerHTML = "";
      }
    })
    .catch((err) => {
      alert(err.message);
      console.log(err.message);
      showAll.disabled = true;
    });
}

fetchMeals("chicken", 6);


function displayMeals(meals) {
  foodContainer.innerHTML = "";
  meals.forEach((meal) => {
    foodContainer.innerHTML += `
        <article class="border border-slate-800 flex w-full rounded-md h-44 md:h-48 lg:h-52">
        <div class="w-2/5">
          <img class="w-full h-full" src="${meal.strMealThumb}" alt="" />
        </div>
        <div class="w-3/5  h-full flex flex-col justify-evenly px-2 py-2 lg:py-6">
          <h2 class="text-xl lg:text-2xl font-bold">${meal.strMeal}</h2>
          <p class="my-2 md:my-2 text-sm md:text-sm lg:text-lg w-11/12">
            There are many variations of passages of available, but the
            majority have suffered
          </p>
          <!-- Button trigger modal -->
          <a class="text-orange-600 underline cursor-pointer font-semibold" 
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onclick="openDetails('${meal.idMeal}')"
          >View Details</a>
      </article>
        `;
  });
}

showAll.addEventListener('click', function(){
    fetchMeals(nameOfMeal);;
})

function openDetails(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => setModal(data.meals[0]));
}

function setModal(meal){
    const mealTitle = document.getElementById('staticBackdropLabel');
    const mealImg = document.getElementById('modal-img');
    const mealCategory = document.getElementById('category');
    const mealArea = document.getElementById('area');
    const mealInstructions = document.getElementById('instructions');
    const youtubeLink = document.getElementById('youtubeLink');

    mealTitle.innerText = meal.strMeal;
    mealImg.src = meal.strMealThumb;
    mealCategory.innerText = meal.strCategory;
    mealArea.innerText = meal.strArea;
    mealInstructions.innerText = meal.strInstructions;
    youtubeLink.innerText = meal.strYoutube;
    youtubeLink.href = meal.strYoutube;

}