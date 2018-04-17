import React from "react";
import { Link } from "react-router-dom";
import storage from "../localStorage.js";

const SavedQuizzes = ()=>{
	let quizzes = storage.getSavedQuizzes();
	quizzes = quizzes.map((q, i)=>(
		<div key={i} className="row">
			<div className="col s9">
				<Link to={"/quiz/"+q.id} className="waves-effect btn col s12">{q.name}</Link>
			</div>
			<div className="col s3 right-align">
				<Link to={"edit/quiz/"+q.id}><i className="material-icons">create</i></Link>
				<Link to={"delete/quiz/"+q.id}><i className="material-icons red-text">close</i></Link>
			</div>
		</div>
	));
	return(
		<div>
			{quizzes}
		</div>
	);
};

export default SavedQuizzes;