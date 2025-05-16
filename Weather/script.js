// Constants
const API_KEY = '575a968d868ad8e2d70876aa0df3ba87';
const API_URL = 'https://api.openweathermap.org/data/2.5/';
const ICON_URL = 'https://openweathermap.org/img/wn/';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');
const searchHistory = document.getElementById('search-history');
const clearHistoryBtn = document.getElementById('clear-history');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSearchHistory();
    
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                getWeatherData(city);
            }
        }
    });
    
    locationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    getWeatherByCoordinates(lat, lon);
                },
                (error) => {
                    showError('Could not get your location. ' + error.message);
                }
            );
        } else {
            showError('Your browser does not support geolocation.');
        }
    });
    
    clearHistoryBtn.addEventListener('click', () => {
        localStorage.removeItem('weatherSearchHistory');
        searchHistory.innerHTML = '';
    });
});

// Get weather data by city name
async function getWeatherData(city) {
    try {
        const weatherResponse = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`);
        
        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error('City not found. Verify the city and try again.');
            } else {
                throw new Error('Error getting weather data.');
            }
        }
        
        const weatherData = await weatherResponse.json();
        const forecastResponse = await fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`);
        
        if (!forecastResponse.ok) {
            throw new Error('Error getting forecast.');
        }
        
        const forecastData = await forecastResponse.json();
        
        displayWeatherData(weatherData);
        displayForecastData(forecastData);
        saveToHistory(city);
        clearError();
        
    } catch (error) {
        showError(error.message);
    }
}

// Get weather data by coordinates
async function getWeatherByCoordinates(lat, lon) {
    try {
        const weatherResponse = await fetch(`${API_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`);
        
        if (!weatherResponse.ok) {
            throw new Error('Error getting weather data.');
        }
        
        const weatherData = await weatherResponse.json();
        const forecastResponse = await fetch(`${API_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`);
        
        if (!forecastResponse.ok) {
            throw new Error('Error getting forecast.');
        }
        
        const forecastData = await forecastResponse.json();
        
        displayWeatherData(weatherData);
        displayForecastData(forecastData);
        saveToHistory(weatherData.name);
        clearError();
        
    } catch (error) {
        showError(error.message);
    }
}

// Display current weather data
function displayWeatherData(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    
    weatherContainer.innerHTML = `
        <div class="weather-header p-4">
            <div class="city-info">
                <h2 class="city-name">${cityName}, ${country}</h2>
                <p class="weather-description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            </div>
            <div class="weather-icon">
                <img src="${ICON_URL}${icon}@2x.png" alt="${description}">
            </div>
        </div>
        <div class="weather-details">
            <div class="weather-detail">
                <p class="detail-label">Temperature</p>
                <p class="detail-value">${temperature}°C</p>
            </div>
            <div class="weather-detail">
                <p class="detail-label">Feels like</p>
                <p class="detail-value">${feelsLike}°C</p>
            </div>
            <div class="weather-detail">
                <p class="detail-label">Humidity</p>
                <p class="detail-value">${humidity}%</p>
            </div>
            <div class="weather-detail">
                <p class="detail-label">Wind</p>
                <p class="detail-value">${windSpeed} m/s</p>
            </div>
        </div>
    `;
    
    weatherContainer.style.display = 'block';
}

// Display 5-day forecast data
function displayForecastData(data) {
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-EN', { weekday: 'short', day: 'numeric' });
        const hour = date.getHours();
        
        if (hour >= 11 && hour <= 13 && !dailyForecasts[day]) {
            dailyForecasts[day] = item;
        }
    });
    
    const forecastArray = Object.values(dailyForecasts).slice(0, 5);
    
    let forecastHTML = `
        <h2 class="forecast-title">Forecast from the next days</h2>
        <div class="forecast-items">
    `;
    
    forecastArray.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-EN', { weekday: 'short', day: 'numeric' });
        const temp = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;
        
        forecastHTML += `
            <div class="items-center rounded-lg bg-gray-300 grid grid-cols-5 p-4 mb-6 forecast-item">
                <div class="forecast-date">${day}</div>
                <div class="forecast-icon">
                    <img src="${ICON_URL}${icon}.png" alt="${description}">
                </div>
                <div class="forecast-temp">${temp}°C</div>
                <div class="forecast-desc">${description.charAt(0).toUpperCase() + description.slice(1)}</div>
            </div>
        `;
    });
    
    forecastHTML += `</div>`;
    
    forecastContainer.innerHTML = forecastHTML;
    forecastContainer.style.display = 'block';
}

// Save search to history
function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    
    if (!history.includes(city)) {
        if (history.length >= 5) {
            history.pop();
        }
        
        history.unshift(city);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
        loadSearchHistory();
    }
}

// Load search history
function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    
    searchHistory.innerHTML = '';
    
    history.forEach(city => {
        const li = document.createElement('li');
        li.innerHTML = `${city} <span>&#x1F50D;</span>`;
        
        li.addEventListener('click', () => {
            cityInput.value = city;
            getWeatherData(city);
        });
        
        searchHistory.appendChild(li);
    });
}

// Show error message
function showError(message) {
    let errorMessage = document.querySelector('.error-message');
    
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        const container = document.querySelector('.container');
        container.insertBefore(errorMessage, weatherContainer);
    }
    
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    weatherContainer.style.display = 'none';
    forecastContainer.style.display = 'none';
}

// Clear error message
function clearError() {
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}