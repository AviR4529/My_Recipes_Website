const shoping_list_div = document.getElementById("shoping_list_div");

//פונקציה להוספת רשימת קניות
 function add_to_shoping_list_Fun(data) {
    shoping_list_div.innerHTML = "<h2>My Shoping List</h2>";
    data.extendedIngredients.forEach(result => {
      const shoping_list_Ingredients_div = document.createElement("div");
      shoping_list_Ingredients_div.id = "shoping_list_Ingredients_div_id";
      shoping_list_Ingredients_div.innerHTML = `
        <button id="removeIngredientID">X</button>
        <input type="number" id="quantity" value="${result.amount}" step="1" min="0">
        <p id="textList">${result.originalName}</p>
      `;
  
      //כפתור מחיקה לרכיב מתוך רשימת הקניות
      const removeIngredientButton = shoping_list_Ingredients_div.querySelector("#removeIngredientID");
      removeIngredientButton.addEventListener('click', () => {
        removeIngredientButton.parentElement.remove();
      });
      shoping_list_div.appendChild(shoping_list_Ingredients_div);
    })
  }
  