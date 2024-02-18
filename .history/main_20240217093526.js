// server.js

const express = require('express');
const app = express();

// Mock data
const imageData = [
    { id: 1, url: 'https://picsum.photos/200/300' },
    { id: 2, url: 'https://picsum.photos/200/300' }
    // Add more image data as needed
];

// API endpoint to get image data
app.get('/api/images', (req, res) => {
    res.json(imageData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});