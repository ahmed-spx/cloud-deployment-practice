require ("dotenv").config();
const sql = require("mssql");

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
    }
};

const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

sql.connect(dbConfig);

app.get('/locations', async (req, res) => {
    try {
        const result = await sql.query`SELECT city FROM weather_table`;
        const cities = result.recordset.map(row => row.city);
        res.json(cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching locations from database" });
    }
});

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;

        const request = new sql.Request();
        request.input('city', sql.NVarChar, city);
        const result = await request.query(
            'SELECT current_temp, conditions, q1_temp, q2_temp, q3_temp, q4_temp FROM weather_table WHERE city = @city'
        );

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "City not found" });
        }

        const row = result.recordset[0];
        res.json({
            conditions: row.conditions,
            temperature: {
                current: row.current_temp,
                q1: row.q1_temp,
                q2: row.q2_temp,
                q3: row.q3_temp,
                q4: row.q4_temp
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching weather data from database" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`));