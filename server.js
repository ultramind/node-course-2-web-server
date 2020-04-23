const express = require('express');
const hbs = require('hbs');
var app = express(); 
const fs = require('fs');
const port = process.env.PORT || 3000;
 

 app.set('view engine', 'hbs');
 hbs.registerPartials(__dirname + '/views/partials');

 app.use((req, res, next)=>{
     var log = new Date().toString()+' ' + req.method + ' ' + req.url;
     console.log(log);
     fs.appendFile('server.log', log + '\n', (e)=>{
         console.log('Could not read file');
     });
     next();
 });

//  app.use((req, res, next)=>{
//      res.render('maintance');

//  })

//  hbs helpers
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});
app.use(express.static(__dirname + '/public'));

 app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my WebSite',
        currentYear: new Date().getFullYear()
    });
 })

 app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
})

 app.use(express.static(__dirname + '/public'));
 app.listen(port, ()=>{
     console.log(`Server created on port ${port}`)
 });