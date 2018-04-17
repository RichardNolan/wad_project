

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

    const _updateName = (id, name)=>{
        return fetch("http://localhost:3001/api/custom/quiz/"+id, {
            method: 'PUT', 
            body: JSON.stringify({name:name}), 
            headers: headers
        })
        .then(res => res.json())
    }

    return{
        saveQuiz: (data)=> _doFetch("http://localhost:3001/api/custom/quiz", data),
        updateName: (id, name)=> _updateName(id, name)
    }
})()