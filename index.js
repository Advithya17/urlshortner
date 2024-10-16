const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
});

const URL = mongoose.model('URL', urlSchema);

// API to shorten the URL
app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const urlCode = shortid.generate();
    const shortUrl = `http://localhost:3000/${urlCode}`;

    // Save URL mapping in the database
    const newUrl = new URL({
        originalUrl,
        shortUrl,
    });

    await newUrl.save();

    res.json({ originalUrl, shortUrl });
});

// Redirect to the original URL
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = `http://localhost:3000/${req.params.shortUrl}`;
    const url = await URL.findOne({ shortUrl });

    if (url) {
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).json({ message: 'URL not found' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
