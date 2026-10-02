const apiKey = "";
const city = "Atlanta";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
    const response = await fetch(url);

    const data = await response.json();
    console.log(data);

    const temperature = data.main.temp;
    const conditions = data.weather[0].description;

    document.getElementById("temperature").textContent = `${temperature}°C`;
    document.getElementById("conditions").textContent = conditions;
    document.getElementById("location").textContent = city;
}

getWeather();