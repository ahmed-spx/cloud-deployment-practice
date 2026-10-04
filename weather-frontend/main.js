async function loadLocations() {
    try {
        const response = await fetch("http://localhost:3000/locations");
        const cities = await response.json();
        document.getElementById("location").innerHTML = cities.map(city => `<option value="${city}">${city}</option>`).join("");
    } catch (error) {
        console.error("Error loading locations:", error);
    }
}

async function getWeather(event) {
    event.preventDefault();
    const city = document.getElementById("location").value;

    try{
        const response = await fetch(`http://localhost:3000/weather?city=${city}`);
        if (!response.ok){
            throw new Error (`City not found: "${city}"`)
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
document.getElementById("load-button").addEventListener("click", loadLocations);