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
        // console.log(data.drinks);
        drinkName.innerText = data.drinks[0].strDrink;
        document.querySelector(".drinkImg").src = data.drinks[0].strDrinkThumb;
        recipe.innerText = data.drinks[0].strInstructions;
      });
    searchContainer.style.display = "none";
  }
  //   console.log(selectedDrink);
}

const drinkName = document.querySelector(".drinkName");
const recipe = document.querySelector(".recipe");
const btnRandom = document.querySelector(".btnRandom");
btnRandom.addEventListener("click", getRandomDrink);
const ingredients = document.querySelector(".ingredients");
const drinkInfoContainer = document.querySelector(".drinkInfoContainer");

function getRandomDrink() {
  ingredients.innerHTML = "";
  recipe.innerText = "";
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.drinks);
      let drinkData = data.drinks[0];
      console.log(drinkData.strDrinkThumb);

      drinkName.innerHTML = `Today's drink: <br/>` + drinkData.strDrink;
      document.querySelector(".drinkImg").src = drinkData.strDrinkThumb;
      recipe.innerText += drinkData.strInstructions;

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
      drinkInfoContainer.style.display = "flex";
      searchContainer.style.display = "none";
    });
}
