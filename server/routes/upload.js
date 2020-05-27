const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();


const Instrumento = require('../models/instrumento');

const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.put('/upload/:id', function(req, res) {

    let id = req.params.id;

    if(!req.files) {
        return res.status(400)
        .json({
            ok: false,
            err: {
                message: 'No se a seleccionado ningun archivo.'
            }
        });
    }

    let archivo = req.files.imagen;
    let nombreCortado = archivo.name.split('.');
    
    console.log('nombrecortado'+nombreCortado);
    let extension = nombreCortado[nombreCortado.length - 1];
    nombreArchivo = archivo.name;
    
    

    // extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

   if (extensionesValidas.indexOf( extension ) < 0) {
       return res.status(400).json({
           ok: false,
           message: 'Las extensiones permitidas son' +extensionesValidas.join(', '),
           ext: extension
       })
   }

   
    archivo.mv(`uploads/${ nombreArchivo }`, (err) => {
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

            imagenInstrumento(id, res, nombreArchivo);

         
    });
});

function imagenInstrumento(id, res, nombreArchivo){

    Instrumento.findById(id, (err, instrumentoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!instrumentoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Instrumento no existe.'
                }
            });
        }
        instrumentoDB.imagen = nombreArchivo;

        instrumentoDB.save((err, instrumentoGuardado) => {

            res.json({
                ok: true,
                instrumento: instrumentoGuardado,
                imagen: nombreArchivo
            });
            
        })

    });

}
module.exports = app;