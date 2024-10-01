let userType;
const defaultUsername = "user";
const defaultPassword = "123";

function openLogin(type) {
    userType = type;
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginTitle').innerText = `Login as ${capitalize(type)}`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate username and password
    if (username === defaultUsername && password === defaultPassword) {
        alert(`${capitalize(userType)} logged in successfully!`);
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        updateDashboard();
    } else {
        // Show error message
        document.getElementById('error').classList.remove('hidden');
    }
}

function signup() {
    alert(`Sign up for ${capitalize(userType)} is complete!`);
}

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

function showMoreDetails() {
    const country = document.getElementById('countrySelector').value;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('conflictDetailsPage').classList.remove('hidden');
    document.getElementById('detailsCountry').innerText = country;

    // Fetch and display conflict details
    displayConflictDetails(country);
}

function displayConflictDetails(country) {
    const details = {
        "USA": {
            count: 120,
            animalDeaths: 100,
            humanDeaths: 5,
            damagingAnimals: "Deer, Bears"
        },
        "India": {
            count: 200,
            animalDeaths: 150,
            humanDeaths: 15,
            damagingAnimals: "Elephants, Tigers"
        },
        "Africa": {
            count: 300,
            animalDeaths: 200,
            humanDeaths: 30,
            damagingAnimals: "Buffalos, Hippos"
        },
        "Brazil": {
            count: 150,
            animalDeaths: 80,
            humanDeaths: 10,
            damagingAnimals: "Jaguar, Tapir"
        }
    };

    const { count, animalDeaths, humanDeaths, damagingAnimals } = details[country];
    document.getElementById('conflictCount').innerText = count;
    document.getElementById('animalDeaths').innerText = animalDeaths;
    document.getElementById('humanDeaths').innerText = humanDeaths;
    document.getElementById('damagingAnimals').innerText = damagingAnimals;
}

function goBack() {
    document.getElementById('conflictDetailsPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

window.onload = function () {
    createChart();
};
