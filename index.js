console.log("hi mama");
const searchContainer = document.querySelector(".searchContainer");
const btnSelectDrink = document.querySelector(".btnSelectDrink");
btnSelectDrink.addEventListener("click", getSelectedDrink);

function getSelectedDrink() {
  let selectedDrink = document.querySelector(".drinksList").value;
  if (selectedDrink) {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selectedDrink}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.drinks);
        drinkName.innerText = data.drinks[0].strDrink;
        document.querySelector("img").src = data.drinks[0].strDrinkThumb;
        recipe.innerText = data.drinks[0].strInstructions;
      });
  }
  console.log(selectedDrink);
}

const drinkName = document.querySelector(".drinkName");
const recipe = document.querySelector(".recipe");
const btnRandom = document.querySelector(".btnRandom");
btnRandom.addEventListener("click", getRandomDrink);

function getRandomDrink() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.drinks);
      drinkName.innerText = data.drinks[0].strDrink;
      document.querySelector("img").src = data.drinks[0].strDrinkThumb;
      recipe.innerText = data.drinks[0].strInstructions;
    });
  searchContainer.style.display = "none";
}

// let i = 0;
// function getDrink() {
//     fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.drinks);
//         console.log(data.drinks.length);
//         if (i < data.drinks.length) {
//           drinkName.innerText = data.drinks[i].strDrink;
//           document.querySelector("img").src = data.drinks[i].strDrinkThumb;
//           recipe.innerText = data.drinks[i].strInstructions;
//           i++;
//         } else {
//           i = 0;
//         }
//       });
//   }
