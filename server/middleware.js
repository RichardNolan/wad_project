module.exports = (()=>{
    const db = require('./db.js');

    const _useApi = (req, res, next)=>{
        // console.log("API REQUEST")
        // WE COULD LIMIT, THROTTLE OR PROTECT OUR API HERE
        next();
    }

    const _checkDatabaseConnected = (req,res,next)=>{
        // console.log("DATABASE CHECK")
        !db.isConnected() 
            ? res.send({error:true, message:"There was an error connecting"})
            : next()
    }
    
    const _attachCORSHeaders = (req, res, next)=> {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }

    /** HAVING THE RETURNED FUNCTION SEPARTE FROM THE ACTUAL FUNCTION ABOVE IS SIMPLY FOR CLARITY - 
     * ITS MUCH EASIER TO SEE THE MODULES METHODS IF THEY ARE LISTED IN THE RETURN LIKE BELOW
     * IT ACTUALLY MEANS A CHANGE OR ADDITIONAL METHOD NEEDS TO BE ENTERED IN 2 PLACES 
     * A PRIVATE FUNCTION ABOVE - OUTSIDE OF THE RETURN AND
     * AN ANONYMOUS FUNCTION IN THE RETURNED OBJECT TO CALL THE PRIVATE FUNCTION ABOVE*/

    return {
        useApi:                 (req,res,next)=> _useApi(req,res,next),
        checkDatabaseConnected: (req,res,next)=> _checkDatabaseConnected(req,res,next),
        attachCORSHeaders:      (req,res,next)=>_attachCORSHeaders(req,res,next),
    }
})()