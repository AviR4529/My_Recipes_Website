const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', searchFun);

const searchResults = document.getElementById("searchResults"); //אזור שמאל
const elementsDiv = document.getElementById("elementsDiv");//אזור אמצע

const theInput = document.getElementById("theInput");

//פונקציה לביצוע חיפוש המתכונים
function searchFun() {

    //ניקוי הדיב האמצעי מתוצאות חיפוש ישנות
    elementsDiv.innerHTML = "";

    //קבלת ערך החיפוש מהמשתמש והכנסתו למשתנה
    let querySearch = theInput.value;

    //בקשה לשרת עבור חיפוש המתכונים
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=419fb3df3c5f4d138b3e6f45a313845a&query=' + querySearch)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            searchResults.innerHTML = "";

            //הדפסה של תוצאות החיפוש
            data.results.forEach(result => {
                const recipeDiv = document.createElement("div");
                recipeDiv.id = "recipeDiv";
                recipeDiv.innerHTML = `
        <img id="images" src="${result.image}" alt="${result.title}" width="30" height="30">
        <p id="nameRecipe" onclick="recipeDetailsShow(${result.id})">${result.title}</p>
      `;
          
        
                searchResults.appendChild(recipeDiv);
            });

            //טיפול במקרה קצה שבו אין תוצאות חיפוש
            if (data.results.length === 0) {
                searchResults.innerHTML = "<h1>- No recipes found!</h1>";
            }

        })
        //טיפול במקרה של שגיאה
        .catch(error => {
            alert("error! the search not working! - " + error);
        });
}