// const means never changes - short for constant
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require('axios');

// give me a new instance of an express application
// the `app` variable shouldn't be changed
const app = express();
const BASE_API_URL="https://ckx-restful-api.herokuapp.com"; //
// setup the view engine
app.set('view engine', 'hbs');
app.use(express.static('public'));

// setup wax on so that it will works with hbs
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

// ROUTES HERE


app.get("/", async (req, res) => {
    let response = await axios.get(BASE_API_URL + "/sightings"); // --> note 2
    let sightings = response.data;
    res.render('index', {
      'sightings': sightings // --> note 3
    })
  });


  app.get('/:sighting_id/update', async(req,res)=>{
    let response = await axios.get(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    let sighting = response.data;
    sighting.datetime = sighting.datetime.slice(0, -1);
    res.render("update_sighting",{
      'sighting': sighting
    })
  })


  app.post('/:sighting_id/update', async(req,res)=>{
    let sighting = {
      'description': req.body.description,
      'food': req.body.food.split(','),
      'datetime': req.body.datetime
    }
  
    await axios.put(BASE_API_URL + '/sighting/' + req.params.sighting_id, sighting);
    res.redirect('/')
  })
  

  app.get('/:sighting_id/delete', async(req,res)=>{
    let response = await axios.get(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    let sighting = response.data;
   
    res.render("delete_sighting",{
      'sighting': sighting
    })
  })
  

  app.post('/:sighting_id/delete', async(req,res)=>{
    let response = await axios.delete(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    res.redirect('/');
  })
// END ROUTES

app.listen(3000, ()=>{console.log("Server started")});






