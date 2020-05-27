require('./config/config');

const cors = require ('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/instrumento'));
app.use( require('./routes/upload'));
app.use( require('./routes/images'));

app.use(cors({}));

mongoose.connect('mongodb://localhost:27017/instrumentoDB', (err, res) => {

 if ( err ) throw err;

 console.log('Base de datos Mongo Online');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT)
})