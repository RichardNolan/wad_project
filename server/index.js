const express = require('express');
const questions = require('./fetch_questions.js');

const app = express();

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// changed this from app.use (middleware - all requests) to app.get (route - specific to each request)
app.get('/', (req, res, next)=>{
    res.send("Homepage");
    next();
});

app.get('/questions', (req, res, next)=>{
    questions(req.query).then(data=>{
        res.send(data);
        next();
    });
})

// added message to show server is running
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});