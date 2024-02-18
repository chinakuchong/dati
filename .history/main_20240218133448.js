// server.js

const express = require('express');
const path = require('path');
const app = express();

// Mock data
const imageData = [
    { id: 1, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 2, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 3, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 4, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 5, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 6, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 7, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 8, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 9, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 10, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 11, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 12, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 13, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 14, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 15, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 16, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 17, url: 'https://picsum.photos/200/300',like:10,msg:5 },
    { id: 18, url: 'https://picsum.photos/200/300',like:10,msg:5 }
    // Add more image data as needed
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));
app.use(express.static(path.join(__dirname, 'public')));

// Index
app.get('/', (req,res)=> {
    // res.sendFile(path.join(__dirname,'pages','index'));
    res.render('index');
});


// API endpoint to get image data
app.get('/api/images', (req, res) => {
    console.log(res.query);
    res.json(imageData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
