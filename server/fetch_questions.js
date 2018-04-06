const fetch = require('node-fetch');

fetch("https://opentdb.com/api.php?amount=10")
    .then(   res=> res.json()    )
    // .then(   function(ara){ console.log(ara.results)  }   )
    .then( res=> res.results  )
    .then(   questions=>{
        console.log(questions[0]);

        let q = questions[0].question;
        console.log(q);

    })