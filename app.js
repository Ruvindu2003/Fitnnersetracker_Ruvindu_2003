fetch("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json")

.then(response => response.json())
.then(data => {
    const container = document.getElementById("exerciseContainer");

    data.forEach(exercise => {
        const card = document.createElement("div");
        card.classList.add("card");

       
        let imageUrl = exercise.images.length > 1
            ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[1]}`
            : "https://via.placeholder.com/300"; 

   
        card.innerHTML = `
            <img src="${imageUrl}" alt="${exercise.name}">
            <h3>${exercise.name}</h3>
            <div class="instructions">
                <strong>Instructions:</strong>
                <ul>
                    ${exercise.instructions.map((inst, index) => `<li>${inst}</li>`).join("")}
                </ul>
            </div>
        `;

        container.appendChild(card);
    });
})
.catch(error => console.error("Error fetching data:", error));