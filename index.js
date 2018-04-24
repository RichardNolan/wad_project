const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/** OUR OWN MODULES */
    const questions = require('./fetch_questions.js');
    const categories = require('./fetch_categories.js');
    const routes = require('./routes.js')
    const middleware = require('./middleware.js')

/** CONNECT TO DB AND ON SUCCESSFULLY CONNECTED SET isConnected to true */
    const db = require('./db.js');
    db.connect();

    
/** MIDDLEWARE */
    /** OUR CUSTOM ROUTE LEVEL MIDDLEWARE */
        app.use('/api', middleware.useApi);
        app.use('/api/custom', middleware.checkDatabaseConnected)

    /** OUR CUSTOM APPLICATION LEVEL MIDDLEWARE */
        app.use(middleware.attachCORSHeaders);


/** SERVER RENDERED PAGES - NOT CURRENTLY BEING USED*/
    app.get('/', routes.getRoot);
    // app.get('/signup', routes.getSignup);
    app.get('/app/', routes.getApp);

/** API ROUTES FOR 3rd PARTY QUESTIONS (opentdb.com) */
    app.get('/api/questions', routes.getQuestions);
    app.get('/api/categories', routes.getCategories);

/** OUR OWN API ROUTES */
    app.get('/api/custom/quiz/:id', routes.getCustomQuiz);
    app.post('/api/custom/quiz', routes.postCustomQuiz);
    app.put('/api/custom/quiz/:id', routes.updateCustomQuiz);
    app.delete('/api/custom/quiz/:id', routes.deleteCustomQuiz);

    app.get('/api/custom/question/:id', routes.getCustomQuestion);
    app.post('/api/custom/question', routes.postCustomQuestion);
    app.put('/api/custom/question/:id', routes.updateCustomQuestion);
    app.delete('/api/custom/question/:id', routes.deleteCustomQuestion);

    app.get('/api/custom/questions', routes.getCustomQuestions);
    // app.get('/api/custom/questions/:id', routes.getCustomQuizQuestions);
    app.post('/api/custom/questions', routes.postCustomQuestions);

    app.get('*', routes.getApp)
      
// added message to show server is running
    app.listen(process.env.PORT || 3001,()=>{
        console.log('Listening on port '+(process.env.PORT || 3001));
    });