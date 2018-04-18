import React from "react";
import { Link } from "react-router-dom";
import ShareLinks from "../share/ShareLinks.js";
import storage from "../localStorage.js";
import FETCH from "../fetch.js";
import $ from "../../node_modules/jquery/dist/jquery.min";

import M from "materialize-css/dist/js/materialize.js";

const SavedQuizzes = ()=>{
	let quizzes = storage.getSavedQuizzes();

	quizzes = quizzes.map((q, i)=>(
		<div key={i} className="row" data-question={q.id}>
			<div className="col s5">
				<Link to={"/quiz/"+q.id} className="waves-effect btn col s12">{q.name}</Link>
			</div>
			<div className="col s4 right-align">
				<ShareLinks text="I challenge you to a Quiz-Off" link={"quiz/"+q.id} />
			</div>
			<div className="col s3 right-align">
				<Link to={"edit/quiz/"+q.id}><i className="material-icons">create</i></Link>
				<i className="material-icons red-text" onClick={()=>deleteQuiz(q.id)}>close</i>
			</div>
		</div>
	));

	const deleteQuiz = (id)=>{
		FETCH.deleteQuiz(id, {password:prompt("pw")}).then(res=>{
			res.id
				? storage.deleteByID(id) && $("div[data-question='"+id+"']").slideUp()
				: (res.error ? M.toast({html: res.message}) :  M.toast({html: "Nothing was deleted"}));
		});
	};

	return(
		<div>
			{quizzes}
		</div>
	);
};

export default SavedQuizzes;