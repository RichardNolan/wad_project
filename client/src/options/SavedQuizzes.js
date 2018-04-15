import React from 'react'
import { Link } from "react-router-dom";
import storage from '../localStorage.js'

const SavedQuizzes = ()=>{
    let quizzes = storage.getSavedQuizzes();
    quizzes = quizzes.map((q, i)=> <Link to={"/quiz/"+q.id} key={i} className="waves-effect waves-light btn">{q.name}</Link>)
    return(
        <div>
            {quizzes}
        </div>
    )
}

export default SavedQuizzes