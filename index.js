const express=require("express");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const axios = require("axios"); 
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));

dotenv.config();
const url = process.env.URL || 8080;
app.use(express.json());

// News API base URL
const BASE_URL = 'https://newsapi.org/v2/everything';

// Endpoint to fetch news articles
app.get('/api/news', async (req, res) => {
    const { query, page, pageSize } = req.query;

    // Validate query parameter
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: query,
                page: page || 1,
                pageSize: pageSize || 12,
                apiKey: process.env.NEWS_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
})