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
        _deleteByID(id);
        let quizzes = _SAVED();
        if(typeof quizzes === "object") quizzes.push({name:name, id:id});
        else quizzes = [{name:name, id:id}]
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
    }

    const _getOne = (id)=>{
        let quizzes = _SAVED();
        if(!typeof quizzes === "object") return null;
        return quizzes.filter(q=>q.id===id)[0];
    }

    const _deleteByID = id=>{
        let index = -1;
        let quizzes = _SAVED();
        quizzes.forEach((q,i)=>{
            if(q.id===id) index = i;
        });
        if(index>=0) quizzes.splice(index,1);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        return true;
    }

    return {
        getSavedQuizzes: ()=> _SAVED(),
        saveQuiz: (name, id)=> _saveQuiz(name, id),
        updateName: (name, id)=> _updateName(name, id),
        deleteByID: id=> _deleteByID(id),
        getByID: id=> _getOne(id)
    };
})();