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

// 1E. ENABLE FORMS
app.use(express.urlencoded({extended:false}));
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
  

  app.get('/add_food', (req,res)=>{
    res.render('add_food')
})
  
// app.get('/hello/:name', (req,res)=>{
//     let name= req.params.name;
//     res.send("Hi," + name);
// })

// app.post('/add_food', (req,res)=>{
//     console.log(req.body);
//     res.send(req.body)
// })

app.post("/add_food", (req, res) => {
    let { foodName, calories, tags } = req.body;
    res.render("display_food_summary", {
      foodName,
      calories,
      tags: tags.join(', ')
    });
  });

app.listen(3000,()=>{
    console.log("Server started")
})