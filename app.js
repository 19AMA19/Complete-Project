const express = require('express');
const database = require('./config/database');
const app = express();

const methodOverride = require('method-override');

app.set('view engine', 'ejs');

// Use Coustom CSS and JS and ets....
app.use(express.static('public'));
app.use(express.static('node_modules'));


app.get('/', (req, res) => {
    res.send("HomePage");
});

// Bring events routes
const events = require('./routes/event-routes');
app.use('/events', events);


// Server Started! ...
app.listen(3000, ()=>{
    console.log('Server Started! ...');
});

