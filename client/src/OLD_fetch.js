
module.exports = (function(){
	const root = "http://localhost:3001/api/";

	const headers = { 
		"X-Auth-Token": "API_KEY" 
		
	};

	const api_fetch = (what, options)=> {
		let qs = makeQsFromObject(options)
		return(
			fetch(`${root}${what}/?${qs}`, headers)
				.then(res => res.json())
				.catch(err=> console.log(`Error: ${err}`))	
		)	
	};

	const makeQsFromObject = (obj)=>{
		// start with blank array
		let qs = [];
		for(let key in obj){
			// for each key/value pair add a "key=value" string to the array
			qs.push( key+"="+obj[key] );
		}
		// join the array with "&" and combine with root to construct a url and query string
		qs = qs.join("&");
	}

	return ({
		questions: (options)=> api_fetch("questions", options),
		categories: ()=> api_fetch("categories"),
		quiz: (id)=> api_fetch("custom/quiz/"+id)
	});
})();