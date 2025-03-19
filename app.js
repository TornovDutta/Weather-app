const apiKey = "9d8af96ee3c6fe088dd8565b813e42ed";
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const weatherContainer = document.getElementById("weather-info");

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const weatherMain = data.weather[0].main;
        weatherContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Weather: ${description}</p>
        `;

        
        changeBackground(weatherMain);
    } catch (error) {
        console.error(error);
        weatherContainer.innerHTML = `<p style="color: red;">City not found. Please try again.</p>`;
    }
}

function changeBackground(weather) {
    let imageUrl = "";

    switch (weather.toLowerCase()) {
        case "clear":
            imageUrl = "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg";
            break;
        case "clouds":
            imageUrl = "https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg";
            break;
        case "rain":
            imageUrl = "https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg";
            break;
        case "snow":
            imageUrl = "https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg";
            break;
        case "thunderstorm":
            imageUrl = "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg";
            break;
        default:
            imageUrl = "https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg"; // Default cloudy image
            break;
    }

    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

searchBtn.addEventListener("click", () => {
    const city = searchInput.value;
    if (city) {
        getWeather(city);
    }
});
