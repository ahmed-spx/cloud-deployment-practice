async function getWeather() {
    const city = document.getElementById("location").value;

    try{
        const response = await fetch(`../weather-backend/server.js/api/weather?city=${city}`);
        if (!response.ok){
            throw new Error (`City not found: "${city}" (check your spelling)`)
        }
        const data = await response.json();
        console.log(data);

        document.getElementById("temperature").textContent = `${data.temperature}°F`;
        document.getElementById("conditions").textContent = data.conditions;
        document.getElementById("error").textContent = "";


    } catch(error) {
        console.error(error)
        document.getElementById("error").textContent = error.message;
    }
}

document.getElementById("search-button").addEventListener("click", getWeather);