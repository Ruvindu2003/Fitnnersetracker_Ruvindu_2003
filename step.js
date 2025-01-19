fetch("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json")
.then(response => response.json())
.then(data => {
  const exercise = data.find(exercise => exercise.name === "3/4 Sit-Up");
  const category = exercise.category;
  const equipment = exercise.equipment;

  // Create a card dynamically
  const card = document.createElement("div");
  card.classList.add("card");

  // Add the exercise name as the card title
  const title = document.createElement("h2");
  title.textContent = exercise.name;
  card.appendChild(title);

  // Add the category to the card
  const categoryElement = document.createElement("p");
  categoryElement.textContent = `Category: ${category}`;
  card.appendChild(categoryElement);

  // Add the equipment to the card
  const equipmentElement = document.createElement("p");
  equipmentElement.textContent = `Equipment: ${equipment}`;
  card.appendChild(equipmentElement);

  // Append the card to a container (make sure you have a container element with an id "cards-container")
  const container = document.getElementById("cards-container");
  container.appendChild(card);
})
.catch(error => console.error('Error fetching data:', error));
