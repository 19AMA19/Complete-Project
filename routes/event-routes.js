const express = require('express');
const router = express.Router();

// route to home event
router.get('/', (req, res) => {
    res.render('event/index');
});

// route to create event
router.get('/:id', (req, res) => {
    res.render('event/create');
});

// route to edit event
router.get('/:id', (req, res) => {
    res.render('event/edit');
});

// route to singl event
router.get('/:id', (req, res) => {
    res.render('event/show');
});

module.exports = router;