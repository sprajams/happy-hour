const searchContainer = document.querySelector(".searchContainer");
const drinkName = document.querySelector(".drinkName");
const recipe = document.querySelector(".recipe");
const ingredients = document.querySelector(".ingredients");
const drinkInfoContainer = document.querySelector(".drinkInfoContainer");

function getSelectedURL() {
  let selectedDrink = document.querySelector(".drinksList").value;
  let url = "";
  if (selectedDrink) {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selectedDrink}`;
    return url;
  }
}

function getDrink(url) {
  ingredients.innerHTML = "";
  recipe.innerText = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //if drink category has multiple drinks, grab a random one
      let numDrinks = data.drinks.length;
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      let randomDrinkNum = getRandomInt(numDrinks);
      let drinkData = data.drinks[randomDrinkNum];

      drinkName.innerHTML = `Today's drink: <br/>` + drinkData.strDrink;
      document.querySelector(".drinkImg").src = drinkData.strDrinkThumb;
      recipe.innerText += drinkData.strInstructions;

      //
      let j = 1;
      let ingredientElements = "";
      while (drinkData["strIngredient" + j]) {
        if (!drinkData["strMeasure" + j]) {
          drinkData["strMeasure" + j] = "";
        }
        ingredientElements += `<li> ${drinkData["strMeasure" + j]} ${
          drinkData["strIngredient" + j]
        } </li>`;
        j++;
      }
      ingredients.innerHTML += ingredientElements;
      drinkInfoContainer.style.display = "flex";
      searchContainer.style.display = "none";
    });
}

const btnSelectDrink = document.querySelector(".btnSelectDrink");
btnSelectDrink.addEventListener("click", getSelectedDrink);
function getSelectedDrink() {
  getDrink(getSelectedURL());
}

const btnRandom = document.querySelector(".btnRandom");
btnRandom.addEventListener("click", getRandomDrink);
function getRandomDrink() {
  getDrink("https://www.thecocktaildb.com/api/json/v1/1/random.php");
}

//   const node = document.createElement("div");
//   const innerNode = document.createElement("div");
//   while (drinkData["strIngredient" + j]) {
//     ingredients.innerHTML +=
//       drinkData["strMeasure" + j] +
//       ` ` +
//       drinkData["strIngredient" + j] +
//       `<br/>`;
//     j++;
//   }
//   node.append(ingredientElements);
//   //   node.append(innerNode);
//   ingredients.append(node);
//   innerNode.append(drinkData["strIngredient" + j]);
