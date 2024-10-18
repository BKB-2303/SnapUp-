const express=require("express");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const axios = require("axios"); 



app.use(cors());

dotenv.config();
const url = process.env.URL;
app.get("/api/news", async (req, res) => {
    const query = req.query.q || "India"; 
    const page = req.query.page || 1; // Default page
    const articlesPerPage = 12; // Set your articles per page

    try {
        const response = await axios.get(
            `${url}${query}&page=${page}&pageSize=${articlesPerPage}&apiKey=${process.env.API_KEY}`
        );
        res.json(response.data); // Send the API response back to the client
    
    } catch (error) {
        console.error("Error fetching data from News API:", error);
        res.status(500).json({ error: "Failed to fetch news articles" });
    }
});
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
})