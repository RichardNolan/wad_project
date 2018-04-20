import React from "react";
import { Link } from "react-router-dom";
import ShareLinks from "../share/ShareLinks.js";
import storage from "../localStorage.js";
import FETCH from "../fetch.js";
import $ from "../../node_modules/jquery/dist/jquery.min";

import M from "materialize-css/dist/js/materialize.js";

const SavedQuizzes = ()=>{
	let quizzes = storage.getSavedQuizzes();
	let elem = document.querySelector('.dropdown-trigger');
	let instance = M.Dropdown.init(elem);
	quizzes = quizzes.map((q, i)=>(
		<div key={i} className="row center" data-quiz={q.id}>
			<div className="col s7 m9">
				<Link to={"/quiz/"+q.id} className="waves-effect btn col s12">{q.name}</Link>
			</div>
			<div className="col s5 m3">
				<i className="dropdown-trigger material-icons" data-target='dropdown1'>share</i>
				<Link to={"edit/quiz/"+q.id}><i className="material-icons">edit</i></Link>
				<i className="material-icons red-text" onClick={()=>deleteQuiz(q.id)}>close</i>
			</div>

			{/* <!-- Dropdown Structure --> */}
			<ul id='dropdown1' className='dropdown-content'>
				<ShareLinks text="I challenge you to a Quiz-Off" link={"quiz/"+q.id} />
			</ul>
		</div>


	));

	const deleteQuiz = (id)=>{
		FETCH.deleteQuiz(id, {password:prompt("pw")}).then(res=>{
			res.id
				? storage.deleteByID(id) && $("div[data-quiz='"+id+"']").slideUp()
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