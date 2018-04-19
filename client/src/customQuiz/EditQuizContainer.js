import React, { Component } from "react";
import EditCustomQuizName from "./EditCustomQuizName.js";
import FETCH from "../fetch.js";
import storage from "../localStorage.js";
import $ from "../../node_modules/jquery/dist/jquery.min";

import QuestionList from "./QuestionList.js";
import M from "materialize-css/dist/js/materialize.js";


class EditQuizContainer extends Component {
	constructor({ match }){
		super();
		this.state = {
			id: match.params.id, 
			name:""
		};
	}

	componentDidMount(){
		FETCH.quiz(this.state.id).then(res=>{
			this.setState({name:res.name, questions:res.questions });
		});
	}

	nameChangeHandler(e){
		this.setState({name:e.currentTarget.value});
	}

	updateName(){
		FETCH.updateName(this.state.id, {name:this.state.name, password:prompt("pw")})
			.then(res=>{
				console.log("RETURN FROM FETCH", res);
				if(res.data){
					storage.updateName(this.state.name, this.state.id);
					M.toast({html: "You have updated the quiz name"});
				}
					
				//MAYBE AN ERROR
			});
	}

	setEditId(id){
		this.setState({editid:id});
	}

	deleteQuestion(id){
		let passwd=prompt("pw");
		FETCH.deleteQuestion(id, {quiz_id:this.state.id, password:passwd})
			.then(res=>{
				res.id
					? $("div[data-question='"+id+"']").slideUp()
					: (res.error ? M.toast({html: res.message}) :  M.toast({html: "Nothing was deleted"}));
			});
	}
	closeEditQuestion(){
		this.setState({editid:null});
	}
	render () {
		return (
			<div>
				<EditCustomQuizName 
					name={this.state.name}
					nameChangeHandler={this.nameChangeHandler.bind(this)} 
					updateName={this.updateName.bind(this)}
				/>
				<QuestionList questions={this.state.questions} 
					editid={this.state.editid} 
					setEditId={this.setEditId.bind(this) }
					deleteQuestion = {this.deleteQuestion.bind(this)}
					closeEditQuestion = {this.closeEditQuestion.bind(this)}
				/>
			</div>
		);
	}
}

export default EditQuizContainer;