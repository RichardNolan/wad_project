import React from "react";
// import { Link } from "react-router-dom";
// import storage from "../localStorage.js";
import NewQuestionContainer from "./NewQuestionContainer.js";

const QuestionList = (props)=>{
	
	let questions = props.questions || [];	
	
	questions = questions.map((q, i)=>(
		<div key={i} data-question={q._id} >
			<div className="row">
				<div className="col s7 offset-s1 left-align">
					<b>{i+1}.</b>{q.question.substring(0,20)+" ..."}
				</div>
				<div className="col s3 right-align">
					<i className="material-icons blue-text" onClick={()=>props.setEditId(q._id)}>edit</i>
					<i className="material-icons red-text" onClick={()=>props.deleteQuestion(q._id)}>close</i>
				</div>
			</div>

			{props.editid === q._id ? <NewQuestionContainer password={props.password} question={q} closeEditQuestion={(data)=> props.closeEditQuestion(data)}/> : null}

		</div>
	));
	
	return(
		<div>
			{questions}
		</div>
	);
};

export default QuestionList;