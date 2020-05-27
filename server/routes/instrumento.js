var cors = require('cors')

const express = require('express');
const Instrumento = require('../models/instrumento');

const app = express();



app.get('/instrumento',  cors(), function (req, res) {
    
  Instrumento.find({}, 'instrumento marca modelo imagen precio costoEnvio cantidadVendida descripcion')
              .exec( (err, instrumentos) => {

                if ( err ) {
                  return res.status(400).json({
                    ok: false,
                    err
                  });
                }
                Instrumento.count({}, (err, conteo)=> {
                  res.json({
                    ok:true,
                    instrumentos,
                    cuantos: conteo
                  })
                
              })
              } );
  
  
  
  
  });
  

  app.get('/instrumento/:id',  cors(), function (req, res) {

    let id = req.params.id;
    console.log(id)
    Instrumento.findById(id, 'instrumento marca modelo imagen precio costoEnvio cantidadVendida descripcion')
                .exec( (err, instrumentos) => {
  
                  if ( err ) {
                    return res.status(400).json({
                      ok: false,
                      err
                    });
                  }
                  Instrumento.count({}, (err, conteo)=> {
                    res.json({
                      ok:true,
                      instrumentos,
                      cuantos: conteo
                    })
                  
                })
                } );
    
    
    
    
    });


  app.post('/instrumento', function (req, res) {
  
      let body = req.body;

      let instrumento = new Instrumento({
        instrumento: body.instrumento,
        marca: body.marca,
        modelo: body.modelo,
        imagen: body.imagen,
        precio: body.precio,
        costoEnvio: body.costoEnvio,
        cantidadVendida: body.cantidadVendida,
        descripcion: body.descripcion
      })

      instrumento.save( (err,instrumentoDB) => {
        if ( err ) {
          return res.status(400).json({
            ok: false,
            err,
            instrumentoDB
          });
        }
        res.json({
          ok: true,
          instrumento: instrumentoDB
        })

      });
  
     
  
  })
  
  app.put('/instrumento/:id', function (req, res) {
  
      let id = req.params.id;

      let body = req.body;

      Instrumento.findByIdAndUpdate(id, body,{new: true} , (err, instrumentoDB) => {

        if ( err ) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        res.json({
            ok:true,
            instrumento: instrumentoDB
        })

      });
  })
  
  app.delete('/instrumento/:id', function (req, res) {
    
    let id = req.params.id;

    Instrumento.findByIdAndRemove(id, (err, instrumentoBorrado) => {
      if ( err ) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
          ok:true,
          instrumento: instrumentoBorrado
      })

    })



  })

  module.exports = app;