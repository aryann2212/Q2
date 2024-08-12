const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Exercise 2: Cookie-based visit tracking
app.get('/numOfVisits', (req, res) => {
    let visitCount = req.cookies.visitCount ? parseInt(req.cookies.visitCount) + 1 : 1;
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : new Date();

    res.cookie('visitCount', visitCount);
    res.cookie('lastVisit', new Date());
8
    if (visitCount === 1) {
        res.send('Welcome to my webpage! It is your first time that you are here.');
    } else {
        res.send(`Hello, this is the ${visitCount} time that you are visiting my webpage. Last time you visited my webpage on: ${lastVisit}`);
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
