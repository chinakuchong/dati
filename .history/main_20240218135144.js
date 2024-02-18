// server.js

const express = require('express');
const path = require('path');
const app = express();

// Mock data
const imageData = [
    { id: 1, url: 'https://picsum.photos/200/300?random=1',like:10,msg:51 },
    { id: 2, url: 'https://picsum.photos/200/300?random=2',like:20,msg:52 },
    { id: 3, url: 'https://picsum.photos/200/300?random=3',like:30,msg:53 },
    { id: 4, url: 'https://picsum.photos/200/300?random=4',like:40,msg:54 },
    { id: 5, url: 'https://picsum.photos/200/300?random=5',like:50,msg:55 },
    { id: 6, url: 'https://picsum.photos/200/300?random=6',like:60,msg:56 },
    { id: 7, url: 'https://picsum.photos/200/300?random=7',like:70,msg:57 },
    { id: 8, url: 'https://picsum.photos/200/300?random=8',like:80,msg:58 },
    { id: 9, url: 'https://picsum.photos/200/300?random=9',like:90,msg:59 },
    { id: 10, url: 'https://picsum.photos/200/300?random=10',like:100,msg:60 },
    { id: 11, url: 'https://picsum.photos/200/300?random=11',like:110,msg:61 },
    { id: 12, url: 'https://picsum.photos/200/300?random=12',like:120,msg:62 },
    { id: 13, url: 'https://picsum.photos/200/300?random=13',like:130,msg:63 },
    { id: 14, url: 'https://picsum.photos/200/300?random=14',like:140,msg:64 },
    { id: 15, url: 'https://picsum.photos/200/300?random=15',like:150,msg:65 },
    { id: 16, url: 'https://picsum.photos/200/300?random=16',like:160,msg:66 },
    { id: 17, url: 'https://picsum.photos/200/300?random=17',like:170,msg:67 },
    { id: 18, url: 'https://picsum.photos/200/300?random=18',like:180,msg:68 },
    { id: 101, url: 'https://picsum.photos/200/300?random=21',like:10,msg:51 },
    { id: 102, url: 'https://picsum.photos/200/300?random=22',like:20,msg:52 },
    { id: 103, url: 'https://picsum.photos/200/300?random=23',like:30,msg:53 },
    { id: 104, url: 'https://picsum.photos/200/300?random=24',like:40,msg:54 },
    { id: 105, url: 'https://picsum.photos/200/300?random=25',like:50,msg:55 },
    { id: 106, url: 'https://picsum.photos/200/300?random=26',like:60,msg:56 },
    { id: 107, url: 'https://picsum.photos/200/300?random=27',like:70,msg:57 },
    { id: 108, url: 'https://picsum.photos/200/300?random=28',like:80,msg:58 },
    { id: 109, url: 'https://picsum.photos/200/300?random=29',like:90,msg:59 },
    { id: 1010, url: 'https://picsum.photos/200/300?random=30',like:100,msg:60 },
    { id: 1011, url: 'https://picsum.photos/200/300?random=31',like:110,msg:61 },
    { id: 1012, url: 'https://picsum.photos/200/300?random=32',like:120,msg:62 },
    { id: 1013, url: 'https://picsum.photos/200/300?random=33',like:130,msg:63 },
    { id: 1014, url: 'https://picsum.photos/200/300?random=34',like:140,msg:64 },
    { id: 1015, url: 'https://picsum.photos/200/300?random=35',like:150,msg:65 },
    { id: 1016, url: 'https://picsum.photos/200/300?random=36',like:160,msg:66 },
    { id: 1017, url: 'https://picsum.photos/200/300?random=37',like:170,msg:67 },
    { id: 1018, url: 'https://picsum.photos/200/300?random=38',like:180,msg:68 }
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
    const pagesize=6;
    let page=req.query.page;
    let pages=Math.ceil(imageData.length/pagesize);
    if(page>pages)page=pages;
    res.json(imageData.slice((page-1)*pagesize,page*pagesize));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
