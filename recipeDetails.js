let theData;
let currentServings = 0;
let arrAmount = [];

//פונקציה להצגת פרטי המתכון הנבחר
function recipeDetailsShow(id) {

  //ניקוי הדיב
  elementsDiv.innerHTML = "";

  //קבלת פרטי המתכון מהשרת
  fetch("https://api.spoonacular.com/recipes/" + id + "/information?apiKey=c334e8eb6e784f90ab845d38fd6a014a")
    .then(response => response.json())
    .then(data => {
      console.log(data);

      theData = data;

      //כותרת המתכון
      const titleOfRecipe = document.createElement("h2");
      titleOfRecipe.innerHTML = data.title;
      elementsDiv.appendChild(titleOfRecipe);

      //תמונה ראשית
      const mainImage = document.createElement("img");
      mainImage.src = data.image;
      mainImage.id = "bigImage";
      elementsDiv.appendChild(mainImage);

      //הוספת כפתור לב למועדפים
      const heartButton = document.createElement("p");
      heartButton.id = "heartButtonID";
      heartButton.innerHTML = "&#128151;";
      elementsDiv.appendChild(heartButton);

      //פונקציה שתפעל הזמן לחיצה על כפתור הלב
      heartButton.onclick = function () {
        var storedArrayString = localStorage.getItem("arrFavoriteID");

        if (storedArrayString === null) {
          arrFavoriteID = [];
        } else {
          arrFavoriteID = JSON.parse(storedArrayString);
        }

        arrFavoriteID.push(data);
        console.log(arrFavoriteID);

        var arrayString = JSON.stringify(arrFavoriteID);
        localStorage.setItem("arrFavoriteID", arrayString);

        add_to_favorite(data);
      };

      //זמן הכנה
      const preparationTime = document.createElement("p");
      preparationTime.id = "preparationTimeID";
      preparationTime.innerHTML = "Preparation time (minutes): " + data.readyInMinutes;
      elementsDiv.appendChild(preparationTime);

      //דיב של כמות הסועדים
      const divOfServings = document.createElement("div");
      divOfServings.id = "divOfServingsID";
      elementsDiv.appendChild(divOfServings);

      //כפתור הפחתה של כמות סועדים
      const minusServingsButton = document.createElement("button");
      minusServingsButton.id = "minusServingsButtonID";
      minusServingsButton.textContent = "-";
      divOfServings.appendChild(minusServingsButton);

      //טקסט של כמות הסועדים
      const servings = document.createElement("p");
      currentServings = data.servings;
      servings.innerHTML = "servings: " + currentServings;
      divOfServings.appendChild(servings);

      //כפתור הוספה של כמות סועדים
      const plusServingsButton = document.createElement("button");
      plusServingsButton.id = "plusServingsButtonID";
      plusServingsButton.textContent = "+";
      divOfServings.appendChild(plusServingsButton);

      //האזנה לאירוע לחיצה של כפתור הוספת סועדים
      plusServingsButton.addEventListener("click", function () {
        currentServings = plusServingsFun(currentServings);
        servings.innerHTML = "servings: " + currentServings;
      });
      //האזנה לאירוע לחיצה של כפתור הפחתת סועדים
      minusServingsButton.addEventListener("click", function () {
        currentServings = minusServingsFun(currentServings);
        servings.innerHTML = "servings: " + currentServings;
      });

      //יצירת דיב עבור הרכיבים
      const divOfIngredients = document.createElement("div");
      divOfIngredients.id = "divOfIngredientsID";

      //יצירת הטקסט של הרכיבים
      const Ingredients = document.createElement("p");
      Ingredients.id = "IngredientsID";
      Ingredients.innerHTML = "<b> Ingredients: </b> <br>";

      //הדפסה של הרכיבים בלואלה
      data.extendedIngredients.forEach(result => {
        Ingredients.innerHTML += result.amount + " " + result.unit + " " + result.originalName + "<br>";
      })
      divOfIngredients.appendChild(Ingredients);
      elementsDiv.appendChild(divOfIngredients);

      //פונקציה להוספת כמות הסועדים בלחיצה על הכפתור
      function plusServingsFun(servings) {
        servings += 1;
        updateIngredients(servings);
        return servings;
      }

      //פונקציה להפחתת הטקסט של סועדים
      function minusServingsFun(servings) {
        if (servings > 1) {
          servings -= 1;
          updateIngredients(servings);
        }
        else {
          alert("At least one diner is required for the recipe");
        }
        return servings;
      }


      //פונקציה לעדכון כמות הרכיבים בהתאם לסועדים
      function updateIngredients(servings) {
        const ingredientsEl = document.getElementById("IngredientsID");
        ingredientsEl.innerHTML = "Ingredients: <br>";

        arrAmount = [];
        //הדפסה מחדש של הרכיבים המעודכנים
        theData.extendedIngredients.forEach(result => {
          const newAmount = (result.amount / data.servings) * servings;
          if (Number.isInteger(newAmount))
            ingredientsEl.innerHTML += newAmount + " " + result.unit + " " + result.originalName + "<br>";
          else {
            ingredientsEl.innerHTML += newAmount.toFixed(3) + " " + result.unit + " " + result.originalName + "<br>";
          }
          arrAmount.push(newAmount);
        });
      }


      // בקשה לשרת עבור רמת הטעם של המתכון
      fetch("https://api.spoonacular.com/recipes/" + id + "/tasteWidget.json?apiKey=c334e8eb6e784f90ab845d38fd6a014a")
        .then(response => response.json())
        .then(data => {
          console.log(data);


          const textOfTaste = document.createElement("div");
          for (let key in data) {

            let tasteText = "";

            if (data.hasOwnProperty(key)) {
              if (data[key] === 0) {
                tasteText = `${key}: ${"none"}`;
              }
              else if (data[key] <= 25) {
                tasteText = `${key}: ${" 🔥  "}`;
              }
              else if (data[key] <= 50) {
                tasteText = `${key}: ${"🔥🔥 "}`;
              }
              else if (data[key] <= 75) {
                tasteText = `${key}: ${" 🔥🔥🔥 "}`;
              }
              else if (data[key] <= 100) {
                tasteText = `${key}: ${" 🔥🔥🔥🔥 "}`;
              }

              textOfTaste.innerHTML += tasteText + "<br>";


            }
          }
          elementsDiv.appendChild(textOfTaste);

          //כפתור שפותח את הוראות הכנה
          const InstructionsButton = document.createElement("button");
          InstructionsButton.textContent = "Directions";
          elementsDiv.appendChild(InstructionsButton);
          InstructionsButton.id = "InstructionsButtonID";
          InstructionsButton.addEventListener("click", function () {
            const instructionsWindow = window.open(theData.spoonacularSourceUrl, "_blank");
          });

        })
        .catch(error => {
          alert("error: " + error);
        });

      //יצירת כפתור עבור הוספה לרשימת קניות
      const add_to_shoping_list_button = document.createElement("button");
      add_to_shoping_list_button.id = "add_to_shoping_list_id";
      add_to_shoping_list_button.innerText = "Add to shoping list";
      elementsDiv.appendChild(add_to_shoping_list_button);

      //פונקציה להוספת רשימת הקניות
      add_to_shoping_list_button.onclick = function () {
        add_to_shoping_list_Fun(theData, arrAmount);
      };

      const lineBreak1 = document.createElement("br");
      elementsDiv.appendChild(lineBreak1);

      //רמת הבריאות של המתכון
      const healthScore = document.createElement("p");
      if (data.healthScore == 0) {
        healthScore.innerHTML = "health Score: 0";
      }
      else if (data.healthScore <= 25) {
        healthScore.innerHTML = "health Score: 🔥";
      }
      else if (data.healthScore <= 50) {
        healthScore.innerHTML = "health Score: 🔥🔥";
      }
      else if (data.healthScore <= 75) {
        healthScore.innerHTML = "health Score: 🔥🔥🔥";
      }
      else if (data.healthScore <= 100) {
        healthScore.innerHTML = "health Score: 🔥🔥🔥🔥";
      }

      elementsDiv.appendChild(healthScore);

    })
    .catch(error => {
      alert("error " + error);
    });

}
