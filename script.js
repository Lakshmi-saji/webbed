let meals = JSON.parse(localStorage.getItem('meals')) || [];

const mealForm = document.getElementById('mealForm');
const mealList = document.getElementById('mealList');

function saveMeals() {
    localStorage.setItem('meals', JSON.stringify(meals));
}

function renderMeals() {
    mealList.innerHTML = '';
    meals.forEach((meal, index) => {
        const div = document.createElement('div');
        div.className = meal.eaten ? 'completed' : '';
        div.innerHTML = `
            <strong>${meal.name}</strong> (${meal.type}) - ${meal.calories} cal - ${meal.date}<br>
            ${meal.description ? meal.description + '<br>' : ''}
            ${meal.image ? `<img src="${meal.image}" />` : ''}
            <button onclick="toggleEaten(${index})">${meal.eaten ? 'Undo' : 'Eaten'}</button>
            <button onclick="deleteMeal(${index})">Delete</button>
        `;
        mealList.appendChild(div);
    });
}

function toggleEaten(index) {
    meals[index].eaten = !meals[index].eaten;
    saveMeals();
    renderMeals();
}

function deleteMeal(index) {
    meals.splice(index, 1);
    saveMeals();
    renderMeals();
}

mealForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = mealImage.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(event){
            addMeal(event.target.result);
        }
        reader.readAsDataURL(file);
    } else {
        addMeal('');
    }
});

function addMeal(imageData) {
    const newMeal = {
        name: mealName.value,
        type: mealType.value,
        calories: calories.value,
        date: mealDate.value,
        description: mealDesc.value,
        image: imageData,
        eaten: false
    };
    meals.push(newMeal);
    saveMeals();
    renderMeals();
    mealForm.reset();
}

// Initial render
renderMeals();
