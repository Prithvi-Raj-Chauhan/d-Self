const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/', require(path.join(__dirname, 'routes/note.js'))); // Connecting the router
app.use(express.static('public'))

/* Listening the app */
app.listen(port, ()=>{
    console.log(`Blog started at port ${port}`)
})