const shoping_list_div = document.getElementById("shoping_list_div");
let i = 0;

//פונקציה להוספת רשימת קניות
function add_to_shoping_list_Fun(data, arrAmount) {

  if (arrAmount.length === 0) {
    data.extendedIngredients.forEach(result => {
      arrAmount.push(result.amount);
    });
  }

  shoping_list_div.innerHTML = "<h2>My Shoping List</h2>";
  data.extendedIngredients.forEach(result => {
    const shoping_list_Ingredients_div = document.createElement("div");
    shoping_list_Ingredients_div.id = "shoping_list_Ingredients_div_id";
    if (Number.isInteger(arrAmount[i])) {
      shoping_list_Ingredients_div.innerHTML = `
      <button id="removeIngredientID">X</button>
      <input type="number" id="quantity" value="${arrAmount[i]}" step="1" min="0">
      <p id="textList">${result.originalName}</p>
    `;
    }
    else {
      shoping_list_Ingredients_div.innerHTML = `
      <button id="removeIngredientID">X</button>
      <input type="number" id="quantity" value="${arrAmount[i]}" step="${arrAmount[i]}" min="0">
      <p id="textList">${result.originalName}</p>
    `;
    }

    i++;

    //כפתור מחיקה לרכיב מתוך רשימת הקניות
    const removeIngredientButton = shoping_list_Ingredients_div.querySelector("#removeIngredientID");
    removeIngredientButton.addEventListener('click', () => {
      removeIngredientButton.parentElement.remove();
    });
    shoping_list_div.appendChild(shoping_list_Ingredients_div);
  })
  i = 0;
}
