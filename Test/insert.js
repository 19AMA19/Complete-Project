const { error } = require('jquery');
const database = require('../config/database');
const event = require('../models/Event');

let newEvent = new event({
    title: "this event 1",
    describtion: "this event 1",
    location: "Medina",
    event_date: Date.now(),
    createdAt: Date.now()
});

newEvent.save().then((complete)=>{
    if(complete){
        console.log(`Inserting Successfully`)
    } else{
        console.log(`Error Inserting ${complete}`)
    }
});


