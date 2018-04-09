
module.exports = (function(){
	// const fetch = require("node-fetch");
	const root = "http://localhost:3001/";

	const headers = { 
		"X-Auth-Token": "API_KEY" 
	};

	const api_fetch = (what)=> (
		fetch(`${root}${what}`, headers)
			.then(res => res.json())
			.catch(err=> console.log(`Error: ${err}`))
	);

	return ({
		questions: ()=> api_fetch("questions"),
		categories: ()=> api_fetch("categories")
	});
})();