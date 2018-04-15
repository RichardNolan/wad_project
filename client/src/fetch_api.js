

module.exports = (()=>{
    let headers = new Headers({'Content-Type': 'application/json'})
    
    const _doFetch = (url, data)=>{
        return fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: headers
        })
        .then(res => res.json())
    }

    return{
        saveQuiz: (data)=> _doFetch("http://localhost:3001/api/custom/quiz", data)
        
    }
})()