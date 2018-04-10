const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


const questions = require('./fetch_questions.js');
const categories = require('./fetch_categories.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res, next)=>{
    res.send("Homepage");
    next();
});

app.get('/signup', (req, res, next)=>{
    res.render('signup', {title:"Signup Page"});
});

app.get('/app', (req, res, next)=>{
    res.render('app', {title:"Actual App after build"});
});

app.get('/api/questions', (req, res, next)=>{
    questions(req.query).then(data=>{
        res.send(data);
        next();
    });
});

app.get('/api/categories', (req, res, next)=>{
    categories().then(data=>{
        res.send(data);
        next();
    });
});

// added message to show server is running
app.listen(3001,()=>{
    console.log('Listening on port 3001');
});