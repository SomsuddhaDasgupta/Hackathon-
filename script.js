document.addEventListener('DOMContentLoaded', () => {
    const patientForm = document.getElementById('patient-form');
    const alertsList = document.getElementById('alerts-list');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const searchResult = document.getElementById('search-result');
    const saveBtn = document.getElementById('save-btn'); // Reference to Save button
    const body = document.body;

    // Clear previous alerts and get saved patients from localStorage
    alertsList.innerHTML = ''; // Clear the alerts list on page load
    let patients = JSON.parse(localStorage.getItem('patients')) || []; // Load patients from localStorage

    // Function to save patient data
    patientForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = parseInt(document.getElementById('age').value.trim());
        const healthProblem = document.getElementById('health-problem').value.trim();
        const date = document.getElementById('date').value.trim();

        // Validate input
        if (!name || isNaN(age) || age <= 0 || !healthProblem || !date) {
            alert('Please enter valid data.');
            return;
        }

        const patient = { name, age, healthProblem, date };

        // Add patient to the array
        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients)); // Save to localStorage

        // Show a health alert
        displayHealthAlert(patient);

        // Change Save button to green
        saveBtn.classList.add('green');
        setTimeout(() => {
            saveBtn.classList.remove('green'); // Remove green class after a delay
        }, 2000); // Change duration as needed

        // Clear the form
        patientForm.reset();
    });

    // Function to display health alert
    function displayHealthAlert(patient) {
        const alertItem = document.createElement('div');
        alertItem.classList.add('alert-item');
        alertItem.innerHTML = `<strong>${patient.name}</strong> (Age: ${patient.age}) has a health issue: ${patient.healthProblem} on ${patient.date}`;
        alertsList.appendChild(alertItem);
    }

    // Dark/Light Mode Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
    });

    // Search Functionality
    searchBtn.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim().toLowerCase(); // Trimmed and lowercased
        const foundPatient = patients.find(patient => patient.name.toLowerCase() === searchQuery);

        // Clear previous result
        searchResult.innerHTML = '';

        if (foundPatient) {
            // Show patient details directly in the search result
            searchResult.innerHTML = `
                <div class="patient-details">
                    <p><strong>Name:</strong> ${foundPatient.name}</p>
                    <p><strong>Age:</strong> ${foundPatient.age}</p>
                    <p><strong>Health Problem:</strong> ${foundPatient.healthProblem}</p>
                    <p><strong>Date:</strong> ${foundPatient.date}</p>
                </div>
            `;
        } else {
            searchResult.innerHTML = `<p>No patient found with the name "${searchQuery}".</p>`;
        }
    });
});

