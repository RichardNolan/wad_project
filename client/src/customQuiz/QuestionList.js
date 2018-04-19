import React from "react";
// import { Link } from "react-router-dom";
// import storage from "../localStorage.js";
import NewQuestionContainer from "./NewQuestionContainer.js";

const QuestionList = (props)=>{
	
	let questions = props.questions || [];	

	questions = questions.map((q, i)=>(
		<div key={i} data-question={q._id} >
			<div className="row">
				<div className="col s9">
					{i+1}.{q.question.substring(0,20)+"..."}
				</div>
				<div className="col s3 right-align">
					<i className="material-icons blue-text" onClick={()=>props.setEditId(q._id)}>edit</i>
					{/* <Link to={"../../api/custom/question/"+q._id}><i className="material-icons red-text">close</i></Link> */}
					<i className="material-icons red-text" onClick={()=>props.deleteQuestion(q._id)}>close</i>
				</div>
			</div>

			{props.editid === q._id ? <NewQuestionContainer question={q} closeEditQuestion={()=> props.closeEditQuestion()}/> : null}

		</div>
	));
	
	return(
		<div>
			{questions}
		</div>
	);
};

export default QuestionList;