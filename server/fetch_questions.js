const fetch = require('node-fetch');
const randomize = (a, b)=> 0.5 - Math.random(); //positive or negative with 0,1 so exchange or not on the sort.

// IIFE - Immediately Invoked Function Expression
module.exports = function(){

    return fetch("https://opentdb.com/api.php?amount=10")
        .then(   res=> res.json()    )
        // .then(   function(ara){ console.log(ara.results)  }   )
        .then( res=> res.results  )
        .then( questions=>{
            //  console.log(questions[0]);
    
            for(q of questions){
                let possible_answers = q.incorrect_answers.slice();
                possible_answers.push(q.correct_answer);
                // console.log(q);
                // scrumble the answers
                possible_answers.sort(randomize); 
                // console.log(answers);
                q.possible_answers = possible_answers;
                q.author = "Ara and Ric"
            } 
            // console.log(questions)
            return questions
        })
}