const express = require('express');
const database = require('./config/database');
const bodyParser= require('body-parser');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

const methodOverride = require('method-override');

app.set('view engine', 'ejs');

// Use Coustom CSS and JS and ets....
app.use(express.static('public'));
app.use(express.static('node_modules'));

// bring body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Config Session and Cookie
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
  }));

  app.use(flash());

// ============================
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

