module.exports = (() => {
    
    const _SAVED = ()=>{        
        let savedQuizzes = localStorage.getItem("quizzes");
        if(!savedQuizzes || savedQuizzes==="") savedQuizzes = [];
        else savedQuizzes = JSON.parse(savedQuizzes);
        return savedQuizzes;
    }    

   const  _getSavedQuizzes = ()=>{
        return _SAVED();
    }

    const _saveQuiz = (name, id)=>{
        let savedQuizzes = _SAVED()
        if(typeof savedQuizzes === "object") savedQuizzes.push({name:name, id:id});
        else savedQuizzes = [{name:name, id:id}]
        localStorage.setItem('quizzes', JSON.stringify(savedQuizzes));
    }
    
    return {
        getSavedQuizzes: ()=> _getSavedQuizzes(),
        saveQuiz: (name, id)=> _saveQuiz(name, id)
    };
})();