module.exports = (() => {
    
    const _SAVED = ()=>{        
        let savedQuizzes = localStorage.getItem("quizzes");
        if(!savedQuizzes || savedQuizzes==="") savedQuizzes = [];
        else savedQuizzes = JSON.parse(savedQuizzes);
        return savedQuizzes;
    }    

    const _saveQuiz = (name, id)=>{
        let savedQuizzes = _SAVED()
        if(typeof savedQuizzes === "object") savedQuizzes.push({name:name, id:id});
        else savedQuizzes = [{name:name, id:id}]
        localStorage.setItem('quizzes', JSON.stringify(savedQuizzes));
    }
    
    const _updateName = (name,id)=>{
        let index = -1
        let quizzes = _SAVED();
        quizzes.forEach((q,i)=>{
            if(q.id===id) index = i;
        });
        if(index>=0) quizzes.splice(index,1);
        if(typeof quizzes === "object") quizzes.push({name:name, id:id});
        else quizzes = [{name:name, id:id}]
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
    }

    return {
        getSavedQuizzes: ()=> _SAVED(),
        saveQuiz: (name, id)=> _saveQuiz(name, id),
        updateName: (name, id)=> _updateName(name, id)
    };
})();