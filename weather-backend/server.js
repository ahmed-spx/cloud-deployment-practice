const weatherData = {
    atlanta : {
        temperature: 70,
        conditions: "Rainy"
    },

    gotham : {
        temperature: 50,
        conditions: "Cloudy"
    },

    metropolis : {
        temperature: 80,
        conditions: "Sunny"
    }
}

const app = express();
app.use(express.json());

app.get('/atlanta', (req, res) => {
    res.status(200).json(weatherData.atlanta);
});

app.get('/gotham', (req, res) => {
    res.status(200).json(weatherData.gotham);
});

app.get('/metropolis', (req, res) => {
    res.status(200).json(weatherData.metropolis);
});

const express = require("express");
const PORT = 3000;

app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`));