import React from "react";
import { Link } from "react-router-dom";
import ShareLinks from "../share/ShareLinks.js";
import storage from "../localStorage.js";
import FETCH from "../fetch.js";
import Password from "../Password"
import $ from "../../node_modules/jquery/dist/jquery.min";

import M from "materialize-css/dist/js/materialize.js";

class SavedQuizzes extends React.Component{
	constructor(){
		super()
		this.state = {
			showPasswordRequest:false, 
			passwordFor:null
		}
	}
	
	deleteQuiz(id){
		this.setState({showPasswordRequest:true, passwordFor:id})
	};

	returnedPassword(password, id){
		this.setState({showPasswordRequest:false})
		console.log(password, id)
		FETCH.deleteQuiz(id, {password:password}).then(res=>{
			res.id
				? storage.deleteByID(id) && $("div[data-quiz='"+id+"']").slideUp()
				: (res.error ? M.toast({html: res.message}) :  M.toast({html: "Nothing was deleted"}));
		});
	}
	cancelPassword(){
		this.setState({showPasswordRequest:false})
		console.log()
	}

	render(){

		let quizzes = storage.getSavedQuizzes();
		quizzes = quizzes.map((q, i)=>(
			<div key={i} className="row center" data-quiz={q.id}>
				<div className="col s7 m9">
					<Link to={"/quiz/"+q.id} className="waves-effect btn col s12">{q.name}</Link>
				</div>
				<div className="col s5 m3">
					
					<ShareLinks text="I challenge you to a Quiz-Off" link={"quiz/"+q.id} />


					<Link to={"edit/quiz/"+q.id}><i className="material-icons">edit</i></Link>
					<i className="material-icons red-text pointer" onClick={this.deleteQuiz.bind(this, q.id)}>close</i>
				</div>
			</div>


		));

		return(
			<div>
				{quizzes}
				<Password 	
					onPassword={this.returnedPassword.bind(this)} 
					onCancel={this.cancelPassword.bind(this)} 
					show={this.state.showPasswordRequest}
					passwordFor={this.state.passwordFor}
				/>
			</div>
		);
	}
};

export default SavedQuizzes;