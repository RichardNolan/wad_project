
module.exports = (function(){
    const fetch = require('node-fetch');
    const root = 'http://localhost:3000/questions';

    const headers = { 
        'X-Auth-Token': "API_KEY" 
    }

    const api_fetch = q=> (
        fetch(`${root}`, headers)
            .then(res => res.json())
            .catch(err=> console.log(`Error: ${q}`))
    )

    return ({
        questions: ()=> api_fetch()
    })
})()