const mongoose = require('mongoose');

  mongoose.connect("mongodb://127.0.0.1:27017/events").then(
    () => { console.log('Database Connected Successfully');},
    err => { console.log(`Database Error: ${err}`); }
  );