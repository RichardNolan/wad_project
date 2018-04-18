const fetch = require('node-fetch');


// added options parameter with default value of a blank object
module.exports = ()=>{    
    return fetch("https://opentdb.com/api_category.php")
        .then(   res=> res.json()    )
        .then( res=> res.trivia_categories  );
};