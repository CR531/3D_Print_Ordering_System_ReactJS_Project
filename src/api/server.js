const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
// const businessRoute = require('./business.route');
const printOrderRoute = require('./printOrder.route');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Cannot connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/business', businessRoute);
app.use('/printOrder', printOrderRoute);

app.listen(PORT, function () {
    console.log('Server is running on Port:', PORT);
});