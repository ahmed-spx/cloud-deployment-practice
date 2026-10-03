const apiKey = "";
const city = "Atlanta";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error ("No bueno")
        }
        const data = await response.json();
        console.log(data);

        const temperature = data.main.temp;
        const conditions = data.weather[0].description;

        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("conditions").textContent = conditions;
        document.getElementById("location").textContent = city;

    } catch(error) {
        console.error("No bueno")
    }
}

getWeather();