const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
moment().format();

const { error } = require('jquery');

// route to home event
router.get('/', async (req, res) =>  {
  await Event.find({}).then((events) => {
        let chunk = [];
        let chunkSize = 3;
        for(let i = 0; i < events.length; i += chunkSize){
            chunk.push(events.slice(i, chunkSize + i));
        }
        res.render('event/index', {
            chunk : chunk,
            message: req.flash('info')
        });
    });
});

// route to create event
router.get('/create', (req, res) => {
  req.flash('info','Event Added Successfully')
    res.render('event/create',{
      errors: req.flash('errors'),
    });
});

// Add event to Database
router.post('/create',[
  check('title').isLength({min: 5, max: 18}).withMessage('Title should not be less than 5 letter'),
  check('describtion').isLength({min: 5}).withMessage('Describtion should not be more than 100 letter'),
  check('location').isLength({min: 2}).withMessage('Location should not be less than 5 letter'),
],
   (req, res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    req.flash('errors', errors.array());
    res.redirect('/events/create');
  } else {
      let newEvent = new Event({
        title: req.body.title,
        describtion: req.body.describtion,
        date: req.body.date,
        location: req.body.location,
        createdAt: Date.now(),
      });
      newEvent.save();
      res.redirect('/events');    
      }
});


// route to edit event
router.get('/edit/:id', async (req, res) => {
  await Event.findOne({_id: req.params.id}).then((eventInfo)=>{
    res.render('event/edit', {
      event : eventInfo,
      date: moment(eventInfo.date).format('YYYY-MM-DD'),
      errors: req.flash('errors'),
      message: req.flash('info')
    });
});
});

// route to update event
router.post('/update',[
  check('title').isLength({min: 5, max: 18}).withMessage('Title should not be less than 5 letter'),
  check('describtion').isLength({min: 5}).withMessage('Describtion should not be more than 100 letter'),
  check('location').isLength({min: 2}).withMessage('Location should not be less than 5 letter'),
],
 async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    req.flash('errors', errors.array());
    res.redirect('/events/edit/' + req.body.id);
  } else {
    // updated Object
    let newFields = {
      title: req.body.title,
      describtion: req.body.describtion,
      date: req.body.date,
      location: req.body.location,
    }
    console.log(newFields)
    const query = {_id: req.body.id}
    await Event.updateOne(query, newFields).then((err)=>{
      if (err){
      req.flash('info', "Updated Successfully");
      res.redirect('/events/edit/' + req.body.id);
    }
      else{
        console.log("Error in updaing")
      }
    });
  }
});

// route to show one event
router.get('/:id', async (req, res) => {
  await Event.findOne({_id: req.params.id}).then((event)=>{
    res.render('event/show', {event : event});
  });
});

// route to delete event
router.delete('/delete/:id', async (req, res) => {
  try {
    await Event.deleteOne({_id: req.params.id})
        res.status(200).json("OK");
  } catch (err) {
    res.status(404).json("There is an error. Event is not deleted.");
  }
  });

module.exports = router;