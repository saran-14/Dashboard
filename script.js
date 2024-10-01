function updateDashboard() {
    const country = document.getElementById('countrySelector').value;
    document.getElementById('selectedCountry').innerText = country;
    const conflictDescription = getConflictDescription(country);
    document.getElementById('conflictDescription').innerText = conflictDescription;

    // Update pie chart data
    updateChart(country);
}

function getConflictDescription(country) {
    const descriptions = {
        "USA": "Conflict over deforestation in the U.S.A.",
        "India": "Conflict due to illegal logging in India.",
        "Africa": "Conflict over land use in Africa.",
        "Brazil": "Conflict between communities in Brazil."
    };
    return descriptions[country];
}

// Chart.js setup
let conflictChart;

function createChart() {
    const ctx = document.getElementById('conflictChart').getContext('2d');
    conflictChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Deforestation', 'Illegal Logging', 'Land Use', 'Community Conflict'],
            datasets: [{
                data: [40, 30, 20, 10], // Default values
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        }
    });
}

function updateChart(country) {
    const dataMap = {
        "USA": [40, 30, 20, 10],
        "India": [25, 35, 20, 20],
        "Africa": [15, 45, 30, 10],
        "Brazil": [10, 20, 50, 20]
    };

    conflictChart.data.datasets[0].data = dataMap[country];
    conflictChart.update();
}

window.onload = function () {
    createChart();
    updateDashboard(); // Initialize with default country
};

