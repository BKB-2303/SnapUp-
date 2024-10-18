const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

app.use(cors());
dotenv.config();

const url = process.env.URL;

app.get("/api/news", async (req, res) => {
    const query = req.query.q || "India"; 
    const page = req.query.page || 1; 
    const articlesPerPage = 12; 

    try {
        const response = await axios.get(
            `${url}?q=${encodeURIComponent(query)}&page=${page}&pageSize=${articlesPerPage}&apiKey=${process.env.API_KEY}`
        );

        if (!response.data || !response.data.articles) {
            return res.status(404).json({ error: "No articles found" });
        }

        res.json(response.data); 
    
    } catch (error) {
        console.error("Error fetching data from News API:", error.message);
        console.error("Request URL:", `${url}?q=${encodeURIComponent(query)}&page=${page}&pageSize=${articlesPerPage}&apiKey=${process.env.API_KEY}`);
        res.status(500).json({ error: "Failed to fetch news articles" });
    }
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
