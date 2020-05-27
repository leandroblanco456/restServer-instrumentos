const express = require('express');
const fs = require('fs');
const path = require('path');

let app = express();

app.get('/images/:img', (req,res) => {

    let img = req.params.img;
    let pathImagen = path.resolve(__dirname,`../../uploads/${img}`)
    let noImagePath = path.resolve(__dirname,'../../uploads/original.jpg');


    if( fs.existsSync(pathImagen) ) {
        res.sendFile(pathImagen);
    } else{

        res.sendFile(noImagePath)
    }


})

module.exports = app;