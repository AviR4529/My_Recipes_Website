const shoping_list_div = document.getElementById("shoping_list_div");
let i = 0;

//פונקציה להוספת רשימת קניות
function add_to_shoping_list_Fun(data, arrAmount) {

  //בדיקה אם המערך ריק תכניס את הערכים המקוריים
  if (arrAmount.length === 0) {
    data.extendedIngredients.forEach(result => {
      arrAmount.push(result.amount);
    });
  }

  shoping_list_div.innerHTML = "<h2>My Shopping List</h2>";

  //יצירת האלמנטים על ידי ריצה על המערך
  data.extendedIngredients.forEach(result => {
    const shoping_list_Ingredients_div = document.createElement("div");
    shoping_list_Ingredients_div.id = "shoping_list_Ingredients_div_id";

    //יצירת האלמנטים בתוך הדיב
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
    shoping_list_div.appendChild(shoping_list_Ingredients_div);
    i++;

    //כפתור מחיקה לרכיב מתוך רשימת הקניות
    const removeIngredientButton = shoping_list_Ingredients_div.querySelector("#removeIngredientID");
    removeIngredientButton.addEventListener('click', () => {
      removeIngredientButton.parentElement.remove();
    });
    
  })
  i = 0;
}
