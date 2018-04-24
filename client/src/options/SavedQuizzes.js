import React from "react";
import { Link } from "react-router-dom";
import ShareLinks from "../share/ShareLinks.js";
import Modal from '../modal.js';

import storage from "../localStorage.js";
import FETCH from "../fetch.js";
import $ from "../../node_modules/jquery/dist/jquery.min";
import M from "materialize-css/dist/js/materialize.js";

class SavedQuizzes extends React.Component{
	constructor(){
		super();
		this.state = {
			modal_open:false,
			modal_text:""
		}
	}
	
	deleteQuiz(id){
		this.askForPassword((password)=>{
			FETCH.deleteQuiz(id, {password:password}).then(res=>{
				res.id
					? storage.deleteByID(id) && $("div[data-quiz='"+id+"']").slideUp()
					: (res.error ? M.toast({html: res.message}) :  M.toast({html: "Nothing was deleted"}));
			});
		});
	}

	askForPassword(cb){
		document.addEventListener('ModalReturn', (e)=>{cb(this.state.password);}, {once:true});
		this.toggleModal(true);	
	}
	toggleModal(orSet){
		if(orSet !== undefined) this.setState({modal_open:orSet});
		else this.setState({modal_open:!this.state.modal_open, modal_text:""});
	}
	onComplete(text){
		this.setState({password:text, modal_open:false, modal_text:""}, ()=>{
			document.dispatchEvent(new Event('ModalReturn'));
		});
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
				<Modal isOpen={this.state.modal_open} text={this.state.modal_text} onClose={this.toggleModal.bind(this)} onComplete={this.onComplete.bind(this)} />
			</div>
		);
	}
};

export default SavedQuizzes;