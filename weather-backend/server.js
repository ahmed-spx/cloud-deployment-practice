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

const row = results.recordset[0];
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

sql.connect(dbConfig)

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

app.get('/conditions', async (req, res) => {
    try {
        const result = await sql.query`SELECT conditions FROM weather_table`;
        const conditions = result.recordset.map(row => row.conditions);
        res.json(conditions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching weather data from database" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`));