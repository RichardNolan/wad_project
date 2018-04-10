
module.exports = (function(){
	// const fetch = require("node-fetch");
	const root = "http://localhost:3001/api/";

	const headers = { 
		"X-Auth-Token": "API_KEY" 
	};

	const api_fetch = (what, options)=> {
		


    // start with blank array
    let qs = [];
    for(let option in options){
        // for each key/value pair add a "key=value" string to the array
        qs.push( option+"="+options[option] );
    }
    // join the array with "&" and combine with root to construct a url and query string
     qs = qs.join("&");
	 console.log("FETCH", `${root}${what}/?${qs}`)

		return(
		fetch(`${root}${what}/?${qs}`, headers)
			.then(res => res.json())
			.catch(err=> console.log(`Error: ${err}`))	
		)	
	};

	return ({
		questions: (options)=> api_fetch("questions", options),
		categories: ()=> api_fetch("categories")
	});
})();