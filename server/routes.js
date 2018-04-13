module.exports = (()=>{
    const db = require('./db.js');

/** ROUTE FUNCTIONS MOVED DOWN HERE ONLY FOR CLARITY */
    // GET ROOT
    const _getRoot = (req, res, next)=>{
        res.send("Homepage");
        next();
    }

    // GET SIGNUP
    const _getSignup = (req, res, next)=>{
        res.render('signup', {title:"Signup Page"});
    }

    // GET APP
    const _getApp = (req, res, next)=>{
        res.render('app', {title:"Actual App after build"});
    }

    // GET QUESTIONS
    const _getQuestions = (req, res, next)=>{
        questions(req.query).then(data=>{
            res.send(data);
            next();
        });
    }

    // GET CATEGORIES
    const _getCategories = (req, res, next)=>{
        categories().then(data=>{
            res.send(data);
            next();
        });
    }



    // THIS IS THE STANDARD RESPONSE FOR ALL API CRUD REQUESTS
    // IF DATA IS RETURNED RES.SEND IT OTHERWISE SEND AN EMPTY OBJECT
    const respond = (data, res)=>{
        data
        ? res.send(data)
        : res.send({});
    }

    // GET CUSTOM/QUESTION
    const _getCustomQuestion = (req,res,next)=>{
        db.getQuestion({}).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Question found"})})
    }

    // POST CUSTOM/QUESTION
    const _postCustomQuestion = (req,res,next)=>{
        db.postQuestion(req.body).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Question saved"})});      
    }

    // UPDATE CUSTOM/QUESTION
    const _updateCustomQuestion = (req,res,next)=>{
        db.updateQuestion(req.body).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Question updated"})});      
    }
    
    // DELETE CUSTOM/QUESTION
    const _deleteCustomQuestion = (req,res,next)=>{
        db.deleteQuestion(req.body).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Question deleted"})});      
    }

    // GET CUSTOM/QUESTIONS
    const _getCustomQuestions = (req,res,next)=>{
        db.getQuestions({}).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Questions found"})})
    }

    // POST CUSTOM/QUESTIONS
    const _postCustomQuestions = (req,res,next)=>{
        db.postQuestions(req.body).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Questions saved"})});      
    }

    // GET CUSTOM/QUIZ
    const _getCustomQuiz = (req,res,next)=>{
        db.getQuiz(req.params.id).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Quizzes found"})});      
    }

    // POST CUSTOM/QUIZ
    const _postCustomQuiz = (req,res,next)=>{
        db.postQuiz(req.body).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Quizzes saved"})});      
    }

    // UPDATE CUSTOM/QUIZ
    const _updateCustomQuiz = (req,res,next)=>{
        db.updateQuiz(req.params.id, req.body).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Quizzes updated"})});      
    }

    // DELETE CUSTOM/QUIZ
    const _deleteCustomQuiz = (req,res,next)=>{
        db.deleteQuiz(req.body).then(data=>respond(data,res)).catch(err=>{res.send({error:true, message:"No Quizzes deleted"})});      
    }


    
    /** HAVING THE RETURNED FUNCTION SEPARTE FROM THE ACTUAL FUNCTION ABOVE IS SIMPLY FOR CLARITY - 
     * ITS MUCH EASIER TO SEE THE MODULES METHODS IF THEY ARE LISTED IN THE RETURN LIKE BELOW
     * IT ACTUALLY MEANS A CHANGE OR ADDITIONAL METHOD NEEDS TO BE ENTERED IN 2 PLACES 
     * A PRIVATE FUNCTION ABOVE - OUTSIDE OF THE RETURN AND
     * AN ANONYMOUS FUNCTION IN THE RETURNED OBJECT TO CALL THE PRIVATE FUNCTION ABOVE*/

    return {
        getRoot:                (req,res,next)=> _getRoot(req,res,next),
        getSignup:              (req,res,next)=> _getSignup(req,res,next),
        getApp:                 (req,res,next)=> _getApp(req,res,next),

        getCategories:          (req,res,next)=> _getCategories(req,res,next),          // R
        getQuestions:           (req,res,next)=> _getQuestions(req,res,next),           // C

        getCustomQuestions:     (req,res,next)=> _getCustomQuestions(req,res,next),     // R
        postCustomQuestions:    (req,res,next)=> _postCustomQuestions(req,res,next),    // C

        postCustomQuestion:     (req,res,next)=> _postCustomQuestion(req,res,next),     // C
        getCustomQuestion:      (req,res,next)=> _getCustomQuestion(req,res,next),      // R
        updateCustomQuestion:   (req,res,next)=> _updateCustomQuestion(req,res,next),   // U
        deleteCustomQuestion:   (req,res,next)=> _deleteCustomQuestion(req,res,next),   // D

        postCustomQuiz:     (req,res,next)=> _postCustomQuiz(req,res,next),             // C
        getCustomQuiz:      (req,res,next)=> _getCustomQuiz(req,res,next),              // R
        updateCustomQuiz:   (req,res,next)=> _updateCustomQuiz(req,res,next),           // U
        deleteCustomQuiz:   (req,res,next)=> _deleteCustomQuiz(req,res,next),           // D
    }
})()