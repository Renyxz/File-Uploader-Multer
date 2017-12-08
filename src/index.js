const path = require('path');
const express = require('express');
// const serveStatic = require('serve-static');
const multer = require('multer');
const storage = require('./storage');
const router = require('./router');
const ejsToHTML = require('./ejs');


// App
const app = express();



// Router setup
router(app);



// EJS setup
app.set('view engine', 'ejs');

// Convert ejs file to html
ejs2html(__dirname + "/index.ejs");


// Connect to public folder
// app.use(serveStatic(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));



// Server setup
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Server listening on port: ', port);
});


