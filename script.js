// Event listener for search button
document.getElementById('searchBtn').addEventListener('click', () => getWeather());

const apiKey = 'befd984de4d3c050671d4eb935e6c660';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch and get weather data
const getWeather = async () => {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    toggleLoading(true);
    hideError();
    hideWeatherDetails();

    const url = `${baseURL}?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found! Please enter a valid city name');
        }

        const data = await response.json();
        displayWeather(data);
        changeBackground(data.main.temp);
    } catch (error) {
        showError(error.message);
    } finally {
        toggleLoading(false);
    }
};


// Function to display weather data on the UI
const displayWeather = (data) => {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = `${data.main.temp}°C`;
    document.getElementById('weather').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `${data.wind.speed} m/s`;
    document.getElementById('cloudiness').innerText = `${data.clouds.all}%`;

    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    showWeatherDetails();
};


// Function to change the background based on temperature
const changeBackground = (temperature) => {
    const body = document.body;

    if (temperature < 10) {
        body.style.backgroundImage = "url('https://img.freepik.com/premium-photo/moonlit-melange-all-night-hustle-photo_960396-60792.jpg')";
    } else if (temperature >= 10 && temperature <= 25) {
        body.style.backgroundImage = "url('https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?cs=srgb&dl=pexels-rodrigo-souza-1275988-2531709.jpg&fm=jpg')";
    } else {
        body.style.backgroundImage = "url('https://media.istockphoto.com/id/947314334/photo/blue-sky-with-bright-sun.jpg?s=612x612&w=0&k=20&c=XUlLAWDXBLYdTGIl6g_qHQ9IBBw4fBvkVuvL2dmVXQw=')";
    }

    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
};

// Function to reset the background in case of error
const resetBackground = () => {
    const body = document.body;
    body.style.backgroundImage = '';
};

// Function to show error message
const showError = (message) => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerText = message;
    errorDiv.classList.remove('hidden');
    resetBackground();
};

// Function to hide the error message
const hideError = () => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.classList.add('hidden');
};

// Function to toggle the loading spinner
const toggleLoading = (show) => {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
};

// Function to show weather details
const showWeatherDetails = () => {
    const detailsDiv = document.getElementById('weatherDetails');
    detailsDiv.classList.remove('hidden');
};

// Function to hide weather details
const hideWeatherDetails = () => {
    const detailsDiv = document.getElementById('weatherDetails');
    detailsDiv.classList.add('hidden');
};