const fetch = require('node-fetch');
const randomize = (a, b)=> 0.5 - Math.random(); //positive or negative with 0,1 so exchange or not on the sort.

// added options parameter with default value of a blank object
module.exports = (options={})=>{
    const root = "https://opentdb.com/api.php?";

    // options.amount = options.amount || 10; // set default of 10 questions
    // another way to set defaults but a better method if there is more
    options = Object.assign({amount:10}, options); 

    // start with blank array
    let qs = [];
    for(let option in options){
        // for each key/value pair add a "key=value" string to the array
        qs.push( option+"="+options[option] );
    }
    // join the array with "&" and combine with root to construct a url and query string
    let url = root+qs.join("&");
    
    console.log("Request made for: "+url)
    
    return fetch(url)
        // format returned data as json
        .then(   res=> res.json()    )
        // return only the results, stripping the superflous metadata
        .then( res=> res.results  )
        // deal with the questions
        .then( questions=>{  
            
            // 1, 2, 3, 4 return exactly the same result
            // They are only ordered by the best most modern method first
            
            // 1.
            return questions.map(q=>{
                // create a possible_answers key 
                // create a new array using a spread of the incorrect_answers and the correct answer
                // then use our randomize sort function from above to shuffle the array 
                q.possible_answers = [...q.incorrect_answers, q.correct_answer].sort(randomize);
                return q;
            })

/*

            // 2.
            for(let q of questions){
                // create a possible_answers key 
                // create a new array using a spread of the incorrect_answers and the correct answer
                // then use our randomize sort function from above to shuffle the array 
                q.possible_answers = [...q.incorrect_answers, q.correct_answer].sort(randomize);
            } 
            return questions;


            // 3.
            for(let q of questions){
                q.possible_answers = q.incorrect_answers.slice();
                q.possible_answers.push(q.correct_answer);
                q.possible_answers.sort(randomize); 
            } 
            return questions;

            // 4.
            for(let q of questions){
                let possible_answers = q.incorrect_answers.slice();
                possible_answers.push(q.correct_answer);
                possible_answers.sort(randomize); 
                q.possible_answers = possible_answers;
            } 
            return questions;

*/
        });



};