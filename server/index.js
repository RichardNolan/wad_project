const express = require('express');
let app = express()

const questions = require('./fetch_questions.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', function(req, res, next){
    // res.send("Hi Ara")
    next()
})
app.use('/givemequestions', function(req, res){
    questions().then(data=>{
        // console.log(data)
        // THEN DISPLAY Q
        res.send(data)
    });
})


app.listen(3000)