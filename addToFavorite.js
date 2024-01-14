var popupContent = document.getElementById('popup-content');

//פונקציה לפתיחת החלון הקופץ
function openPopup() {
    popupContent.classList.remove('hidden');
    document.addEventListener('click', closePopup);
}

//פונקציה לסגירת החלון הקופץ
function closePopup() {
    popupContent.classList.add('hidden');
}

//פונקציית הוספה למועדפים בלחיצה על הלב
function add_to_favorite(data) {

    const divOfPopupFavorite = document.createElement("div");
    divOfPopupFavorite.id = "divOfPopupFavoriteID";
    const imgOfPopupFavorite = document.createElement("img");
    imgOfPopupFavorite.src = data.image;
    imgOfPopupFavorite.id = "imgOfPopupFavoriteID";
    const titleRecipeOfPopupFavorite = document.createElement("p");
    titleRecipeOfPopupFavorite.innerText = data.title;
    divOfPopupFavorite.appendChild(imgOfPopupFavorite);
    divOfPopupFavorite.appendChild(titleRecipeOfPopupFavorite);
    popupContent.appendChild(divOfPopupFavorite);

    //פתיחת המתכון לאחר לחיצה עליו בחלון הקופץ
    divOfPopupFavorite.onclick = function () {
        recipeDetailsShow(data.id);
    };

}

//הכנסת המתכונים למועדפים בטעינת העמוד
function add_to_favorite_OnLoad() {

    var storedArrayString = localStorage.getItem("arrOfFavorites");

    //הגדרת המערך למועדפים בטעינה הראשונה של העמוד
    if (storedArrayString === null) {
        var arrOfFavorites = [];
        console.log(arrOfFavorites);
    }
    else {
        arrOfFavorites = JSON.parse(storedArrayString);
        console.log(arrOfFavorites);
    }

    //הדפסת המועדפים בחלון הקופץ מתוך המערך השמור
    arrOfFavorites.forEach(result => {
        const divOfPopupFavorite = document.createElement("div");
        divOfPopupFavorite.id = "divOfPopupFavoriteID";
        const imgOfPopupFavorite = document.createElement("img");
        imgOfPopupFavorite.src = result.image;
        imgOfPopupFavorite.id = "imgOfPopupFavoriteID";
        const titleRecipeOfPopupFavorite = document.createElement("p");
        titleRecipeOfPopupFavorite.innerText = result.title;
        divOfPopupFavorite.appendChild(imgOfPopupFavorite);
        divOfPopupFavorite.appendChild(titleRecipeOfPopupFavorite);
        popupContent.appendChild(divOfPopupFavorite);

        //פתיחת המתכון לאחר לחיצה עליו בחלון הקופץ
        divOfPopupFavorite.onclick = function () {

            recipeDetailsShow(result.id);
        };

    });
}
