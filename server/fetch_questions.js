const fetch = require('node-fetch');
const randomize = (a, b)=> 0.5 - Math.random(); //positive or negative with 0,1 so exchange or not on the sort.

// added options parameter with default value of a blank object
module.exports = (options={})=>{

    return fetch("https://opentdb.com/api.php?amount=10")
        .then(   res=> res.json()    )
        // .then(   function(ara){ console.log(ara.results)  }   )
        .then( res=> res.results  )
        .then( questions=>{   
            for(let q of questions){
                let possible_answers = q.incorrect_answers.slice();
                possible_answers.push(q.correct_answer);
                // scramble the answers
                possible_answers.sort(randomize); 
                q.possible_answers = possible_answers;
            } 
            return questions;
        });
}