import React, { Component } from "react";
import {Link} from 'react-router-dom';
import EditCustomQuizName from "./EditCustomQuizName.js";
import QuestionList from "./QuestionList.js";
import Modal from '../modal.js';

import FETCH from "../fetch.js";
import storage from "../localStorage.js";
import $ from "../../node_modules/jquery/dist/jquery.min";
import M from "materialize-css/dist/js/materialize.js";


class EditQuizContainer extends Component {
	constructor({ match }){
		super();
		this.state = {
			id: match.params.id, 
			name:"", 
			modal_open:true,
			modal_text:""
		};
	}

	componentDidMount(){
		
		this.askForPassword((password)=>{
			FETCH.quiz(this.state.id).then(res=>{
				if(res.password!==password) throw new Error("Password failed")
				if(res.error) throw new Error(res.message)
				else this.setState({name:res.name, questions:res.questions });
			}).catch(err=>{
				M.toast({html:  err.message || "Version 2 will have a graceful crash... for now this is it"});
			});
		})
	}

	nameChangeHandler(e){
		this.setState({name:e.currentTarget.value});
	}

	updateName(){
		// this.askForPassword((password)=>{
		    // let password=prompt("pw");
			FETCH.updateName(this.state.id, {name:this.state.name, password:password})
				.then(res=>{
					if(res.error) throw new Error(res.message)
					if(res.data){
						storage.updateName(this.state.name, this.state.id);
						M.toast({html: "You have updated the quiz name"});
					}
				}).catch(err=>{
					console.log(err)
					M.toast({html:  err.message || "Version 2 will have a graceful crash... for now this is it"});
				});


		// })
		

		
	}

	setEditId(id){
		this.setState({editid:id});
	}

	deleteQuestion(id){
		// this.askForPassword((password)=>{
			FETCH.deleteQuestion(id, {quiz_id:this.state.id, password:password})
				.then(res=>{
					if(res.error) throw new Error(res.message)
					res.id
						? $("div[data-question='"+id+"']").slideUp()
						: (res.error ? M.toast({html: res.message}) :  M.toast({html: "Nothing was deleted"}));
				}).catch(err=>{
					M.toast({html: err.message || "Version 2 will have a graceful crash... for now this is it"});
				});
		// });
	}
	
	closeEditQuestion(data){
		!data._id && (data._id = data.id)
		let questions = this.state.questions.map(q=>{
			return q._id===data.id ? data : q
		})
		this.setState({editid:null, questions:questions});
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

	render () {
		return (
			<div>				
				{this.state.name!==""  ? <EditCustomQuizName 
											name={this.state.name}
											nameChangeHandler={this.nameChangeHandler.bind(this)} 
											updateName={this.updateName.bind(this)}
										/>
										: <h1>VERIFICATION REQUIRED</h1>}
				{this.state.questions  ? <QuestionList questions={this.state.questions} 
											password={this.state.password}
											editid={this.state.editid} 
											setEditId={this.setEditId.bind(this) }
											deleteQuestion = {this.deleteQuestion.bind(this)}
											closeEditQuestion = {this.closeEditQuestion.bind(this)}
										/>
										:null}
				<Link to="/options" className="waves-effect btn">Back to Quizzes</Link>
				<Modal isOpen={this.state.modal_open} text={this.state.modal_text} onClose={this.toggleModal.bind(this)} onComplete={this.onComplete.bind(this)} />
			</div>
		);
	}
}

export default EditQuizContainer;