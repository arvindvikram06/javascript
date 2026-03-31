const API_KEY = "88f3ccaf569d52ec59ab1f56454c8743";

const searchBtn = document.getElementById("search");
const cityInput = document.getElementById("city_input");

const container = document.querySelector(".card_container");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const wind = document.getElementById("wind")
const humidity = document.getElementById("humidity");


searchBtn.addEventListener("click", () => {
   findWeather(null);
});



document.addEventListener("keydown", (e) => {
   findWeather(e.key);
})


function findWeather(value){
    if (value === "Enter" || value == null) {
        const city = cityInput.value.trim();

        if (!city) {
            alert("Enter city");
            return;
        }

        fetchWeather(city);
        fetchForecast(city);
    }
}

async function fetchWeather(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await res.json();

        cityName.innerHTML =
            `<i class="fa-solid fa-location-dot"></i> ${data.name}`;

        temp.textContent =
            `${Math.round(data.main.temp)}°C`;

        condition.textContent =
            data.weather[0].main;

        minTemp.textContent =
            `Min: ${data.main.temp_min}°C`;

        maxTemp.textContent =
            `Max: ${data.main.temp_max}°C`;

        wind.textContent =
            `${data.wind.speed} m/s`;

        humidity.textContent =
            `${data.main.humidity}%`;

  
        const icon = data.weather[0].icon;
        document.getElementById("mainIcon").src =
            `https://openweathermap.org/img/wn/${icon}@2x.png`;

        
        const today = new Date();
        document.getElementById("date").textContent =
            today.toDateString();

    } catch (err) {
        alert("Error fetching weather");
    }
}


async function fetchForecast(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await res.json();

        updateForecastUI(data.list);

    } catch (err) {
        console.log(err);
    }
}


function updateForecastUI(list) {
    container.innerHTML = "";

    const todayData = list.slice(0, 8);

    todayData.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("today_card");

        const time = item.dt_txt.split(" ")[1].slice(0, 5);
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;

        card.innerHTML = `
            <p>${temp}°C</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png"/>
            <p>${time}</p>
        `;

        container.appendChild(card);
    });
}


