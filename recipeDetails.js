let theData;
let currentServings = 0;
let arrAmount = [];

//פונקציה להצגת פרטי המתכון הנבחר
function recipeDetailsShow(id) {



  //ניקוי הדיב
  elementsDiv.innerHTML = "";


  arrAmount = [];

  //קבלת פרטי המתכון מהשרת
  fetch("https://api.spoonacular.com/recipes/" + id + "/information?apiKey=419fb3df3c5f4d138b3e6f45a313845a")
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

      //פונקציה שתפעל בלחיצה על כפתור הלב
      heartButton.onclick = function () {

        //קבלת מערך המועדפים מהאחסון המקומי
        var storedArrayString = localStorage.getItem("arrOfFavorites");
        if (storedArrayString === null) {
          arrOfFavorites = [];
        } else {
          arrOfFavorites = JSON.parse(storedArrayString);
        }

        arrOfFavorites.push(data);
        console.log(arrOfFavorites);

        //הכנסת המערך לאחסון המקומי
        var arrayString = JSON.stringify(arrOfFavorites);
        localStorage.setItem("arrOfFavorites", arrayString);

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
        currentServings = currentServings += 1;
        updateIngredients(currentServings);
        servings.innerHTML = "Servings: " + currentServings;
      });

      //האזנה לאירוע לחיצה של כפתור הפחתת סועדים
      minusServingsButton.addEventListener("click", function () {
        if (currentServings > 1) {
          currentServings -= 1;
          updateIngredients(currentServings);
        }
        else {
          alert("At least one diner is required for the recipe!");
        }
        servings.innerHTML = "Servings: " + currentServings;
      });

      //יצירת דיב עבור הרכיבים
      const divOfIngredients = document.createElement("div");
      divOfIngredients.id = "divOfIngredientsID";

      //יצירת הטקסט של הרכיבים
      const Ingredients = document.createElement("p");
      Ingredients.id = "IngredientsID";
      Ingredients.innerHTML = "<b> Ingredients: </b> <br>";

      //הדפסה של הרכיבים בלולאה
      data.extendedIngredients.forEach(result => {
        Ingredients.innerHTML += result.amount + " " + result.unit + " " + result.originalName + "<br>";
      })
      divOfIngredients.appendChild(Ingredients);
      elementsDiv.appendChild(divOfIngredients);

      //פונקציה לעדכון כמות הרכיבים בהתאם לסועדים
      function updateIngredients(currentServings) {

        Ingredients.innerHTML = "<b> Ingredients: </b> <br>";

        arrAmount = [];

        //הדפסה מחדש של הרכיבים המעודכנים
        theData.extendedIngredients.forEach(result => {
          const newAmount = (result.amount / data.servings) * currentServings;
          if (Number.isInteger(newAmount))
            Ingredients.innerHTML += newAmount + " " + result.unit + " " + result.originalName + "<br>";
          else {
            Ingredients.innerHTML += newAmount.toFixed(2) + " " + result.unit + " " + result.originalName + "<br>";
          }
          arrAmount.push(newAmount);
        });
      }

      // בקשה לשרת עבור רמת הטעם של המתכון
      fetch("https://api.spoonacular.com/recipes/" + id + "/tasteWidget.json?apiKey=419fb3df3c5f4d138b3e6f45a313845a")
        .then(response => response.json())
        .then(data => {
          console.log(data);

          const textOfTaste = document.createElement("div");
          for (let key in data) {

            let tasteText = "";
            if (data[key] === 0) {
              tasteText = `${key}: ${"none"}`;
            }
            else if (data[key] <= 25) {
              tasteText = `${key}: ${" 🔥 "}`;
            }
            else if (data[key] <= 50) {
              tasteText = `${key}: ${" 🔥🔥 "}`;
            }
            else if (data[key] <= 75) {
              tasteText = `${key}: ${" 🔥🔥🔥 "}`;
            }
            else if (data[key] <= 100) {
              tasteText = `${key}: ${" 🔥🔥🔥🔥 "}`;
            }

            textOfTaste.innerHTML += tasteText + "<br>";

          }
          elementsDiv.appendChild(textOfTaste);

          //כפתור שפותח את הוראות הכנה
          const InstructionsButton = document.createElement("button");
          InstructionsButton.textContent = "Directions";
          elementsDiv.appendChild(InstructionsButton);
          InstructionsButton.id = "InstructionsButtonID";
          InstructionsButton.addEventListener("click", function () {
            window.open(theData.spoonacularSourceUrl, "_blank");
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

       
      // פונקציה להוספת רשימת הקניות
      add_to_shoping_list_button.addEventListener("click", function() {
        add_to_shoping_list_Fun(theData, arrAmount);
      });

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
