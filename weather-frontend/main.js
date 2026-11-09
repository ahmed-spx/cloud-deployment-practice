async function loadLocations() {
    try {
        const response = await fetch("https://weather-backend-aa-fjfpgmg4h6f0g4gc.westus3-01.azurewebsites.net/locations");
        const cities = await response.json();
        document.getElementById("location-list").textContent = cities.join(", ");
    } catch (error) {
        console.error("Error loading locations:", error);
    }
}

async function getWeather(event) {
    event.preventDefault();
    const city = document.getElementById("location").value.trim();

    const validCity = /^[a-zA-Z\s]+$/;
    if (city === "" || !validCity.test(city)) {
        document.getElementById("error").textContent = "Please enter a valid city name.";
        return;
    }
    
    try{
        const response = await fetch(`https://weather-backend-aa-fjfpgmg4h6f0g4gc.westus3-01.azurewebsites.net/weather?city=${city}`);
        if (!response.ok){
            throw new Error (`City not found: "${city}"`)
        }
        const data = await response.json();
        console.log(data);

        document.getElementById("temperature").textContent = `${data.temperature.current} F`;
        document.getElementById("conditions").textContent = data.conditions;
        document.getElementById("error").textContent = "";

    } catch(error) {
        console.error(error)
        document.getElementById("error").textContent = error.message;
    }
}

document.getElementById("search-button").addEventListener("click", getWeather);
document.getElementById("load-button").addEventListener("click", loadLocations);

let auth0Client = null;

async function configureAuth() {
    auth0Client = await auth0.createAuth0Client({
        domain: "dev-01ze71fvffpt7rbv.us.auth0.com",
        clientId: "XBR0VsXQ5tFwWUxvIu1B532UtnjKyBLq",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });

    if (window.location.search.includes("code=")) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    await updateUI();
}

async function updateUI() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    document.getElementById("login-button").style.display = isAuthenticated ? "none" : "inline-block";
    document.getElementById("logout-button").style.display = isAuthenticated ? "inline-block" : "none";

    if (isAuthenticated) {
        const user = await auth0Client.getUser();
        document.getElementById("greeting").textContent = `Hello ${user.name}`;
    } else {
        document.getElementById("greeting").textContent = "";
    }
}

async function login() {
    await auth0Client.loginWithRedirect();
}

async function logout() {
    await auth0Client.logout({
        logoutParams: { returnTo: window.location.origin }
    });
}

document.getElementById("login-button").addEventListener("click", login);
document.getElementById("logout-button").addEventListener("click", logout);

configureAuth();