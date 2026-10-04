const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

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

app.get('/locations', (req, res) => {
    res.json(Object.keys(weatherData));
});

app.get('/weather', (req, res) => {
    const city = (req.query.city || "").toLowerCase();
    const data = weatherData[city];
    
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ error: "City not found" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`));