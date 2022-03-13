const express = require('express')
const hbs = require('hbs')
const wax = require('wax-on');

let app = express()

// 1B. SETUP VIEW ENGINE
app.set('view engine', 'hbs'); 

// 1C. SETUP STATIC FOLDER
app.use(express.static('public'));

// 1D. SETUP WAX ON (FOR TEMPLATE INHERITANCE)
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')
hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


// add routes here 

// app.get('/', function(req,res){
//     res.send("<h1>Hello from Express</h1>")
// })

app.get('/',function(req, res){
    res.render('index.hbs')
})

app.get('/fruits', function(req,res) {
    let favourite="apples";
    res.render('fruits.hbs', {
     'fruits':['apples', 'bananas', 'oranges'],
     'favouriteFruit': favourite
   })
  })
  
  
// app.get('/hello/:name', (req,res)=>{
//     let name= req.params.name;
//     res.send("Hi," + name);
// })

app.listen(3000,()=>{
    console.log("Server started")
})