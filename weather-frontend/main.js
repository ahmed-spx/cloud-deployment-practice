async function getWeather() {
    const city = document.getElementById("location").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error (`City not found: "${city}" (check your spelling)`)
        }
        const data = await response.json();
        console.log(data);

        const temperature = data.main.temp;
        const conditions = data.weather[0].description;

        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("conditions").textContent = conditions;
        document.getElementById("error").textContent = "";

    } catch(error) {
        console.error(error)
        document.getElementById("error").textContent = error.message;
    }
}

document.getElementById("search-button").addEventListener("click", getWeather);