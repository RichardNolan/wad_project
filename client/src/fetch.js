

module.exports = (()=>{
    const headers = new Headers({
        'Content-Type': 'application/json',
        // "X-Auth-Token": "API_KEY" 
    })
    const root = "http://localhost:3001/api"


    const _GET = (url, data)=> _FETCH('GET', url, data);
    const _PUT = (url, data)=> _FETCH('PUT', url, data);
    const _POST = (url, data)=> _FETCH('POST', url, data);
    const _DELETE = (url, data)=> _FETCH('DELETE', url, data);
      

    const _FETCH = (method, url, data)=>{
        console.log(url)
        return fetch(root+url, {
            method: method,
            body: JSON.stringify(data),
            headers:headers
        })
        .then(res=>res.json())
        .catch((err)=> ({error:true, message:"Cannot fetch at the moment, please try again soon"}) )	
    }

    
	const makeQsFromObject = (obj)=>{
		// start with blank array
		let qs = [];
		for(let key in obj){
			// for each key/value pair add a "key=value" string to the array
			qs.push( key+"="+obj[key] );
		}
		// join the array with "&" and combine with root to construct a url and query string
        qs = qs.join("&");
        return qs
    }
    

    return{
        saveQuiz: (data)=> _POST("/custom/quiz", data),
        updateName: (id, name)=> _PUT("/custom/quiz/"+id, {name:name}),

        
		questions: (options)=> _GET("/questions/?"+makeQsFromObject(options)),
		categories: ()=> _GET("/categories"),
		quiz: (id)=> _GET("/custom/quiz/"+id)
    }
})()