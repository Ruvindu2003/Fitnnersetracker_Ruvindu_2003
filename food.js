let foodData = [];  // To hold the food data for plotting
let foodLabels = [];  // Labels for bar chart (food items)

// Function to add food and update chart
function addFood() {
    // Get input values
    const foodItem = document.getElementById('foodItem').value;
    const calories = parseInt(document.getElementById('foodCalories').value);
    const fat = parseInt(document.getElementById('foodFat').value);
    const carbs = parseInt(document.getElementById('foodCarbs').value);

    if (foodItem && calories && fat && carbs) {
        // Push food data into the array
        foodData.push({ calories, fat, carbs });
        foodLabels.push(foodItem);

        // Update the chart
        updateChart();
    } else {
        alert("Please fill in all the fields.");
    }

    // Clear input fields after submission
    document.getElementById('foodItem').value = '';
    document.getElementById('foodCalories').value = '';
    document.getElementById('foodFat').value = '';
    document.getElementById('foodCarbs').value = '';
}

// Update chart data
function updateChart() {
    const caloriesData = foodData.map(item => item.calories);
    const fatData = foodData.map(item => item.fat);
    const carbsData = foodData.map(item => item.carbs);

    const ctx = document.getElementById('foodChart').getContext('2d');
    const foodChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: foodLabels,  // Food items
            datasets: [{
                label: 'Calories',
                data: caloriesData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'Fat (g)',
                data: fatData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Carbs (g)',
                data: carbsData,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}