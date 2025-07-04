document.getElementById("user-details-form").addEventListener("submit", function(e) {
    e.preventDefault();
    

    const name = document.getElementById("user-name").value;
    const age = parseInt(document.getElementById("user-age").value);
    const gender = document.getElementById("user-gender").value;
    const weight = parseFloat(document.getElementById("user-weight").value);
    const height = parseFloat(document.getElementById("user-height").value);

    document.getElementById("user-name-display").textContent = `Name: ${name}`;
    document.getElementById("user-age-display").textContent = `Age: ${age}`;
    document.getElementById("user-gender-display").textContent = `Gender: ${gender}`;

  
    const bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
    document.getElementById("user-bmi-display").textContent = `Your BMI: ${bmi}`;

    
    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const calorieIntake = (bmr * 1.55).toFixed(2); 
    document.getElementById("user-calories-display").textContent = `Your Daily Calorie Intake: ${calorieIntake} kcal`;

    // Show the user info card
    document.getElementById("user-info-card").style.display = "block";
});

document.getElementById("workout-log-form").addEventListener("submit", function(e) {
    e.preventDefault();

   
    const workoutType = document.getElementById("workout-type").value;
    const workoutDuration = parseInt(document.getElementById("workout-duration").value);
    const workoutCalories = parseInt(document.getElementById("workout-calories").value);

    // Add to workout log
    const workoutLogTable = document.getElementById("workout-log-body");
    const row = workoutLogTable.insertRow();
    row.innerHTML = `
        <td>${workoutType}</td>
        <td>${workoutDuration}</td>
    `;

    // Save to local storage
    const workoutLog = JSON.parse(localStorage.getItem("workoutLog")) || [];
    workoutLog.push({ workoutType, workoutDuration, workoutCalories });
    localStorage.setItem("workoutLog", JSON.stringify(workoutLog));

    // Update the table with all saved data
    workoutLogTable.innerHTML = ""; // Clear the table
    workoutLog.forEach(log => {
        const row = workoutLogTable.insertRow();
        row.innerHTML = `
            <td>${log.workoutType}</td>
            <td>${log.workoutDuration}</td>
            <td>${log.workoutCalories}</td>  
             <td>${log.workoutCalories * 0.0175 * log.workoutDuration}</td>
    
        `;
    });

    // Clear form inputs
    document.getElementById("workout-log-form").reset();
});