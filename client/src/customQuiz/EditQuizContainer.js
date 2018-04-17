import React, { Component } from "react";
import EditCustomQuizName from "./EditCustomQuizName.js";
import fetch from "../fetch.js";
import fetch_api from "../fetch_api.js";
import storage from "../localStorage.js";
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
		fetch.quiz(this.state.id).then(res=>{
			this.setState({name:res.name, questions:res.questions });
		});

	}

	nameChangeHandler(e){
		this.setState({name:e.currentTarget.value});
	}

	updateName(){
		fetch_api.updateName(this.state.id, this.state.name)
			.then(res=>{
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
	
	render () {
		return (
			<div>
				<EditCustomQuizName 
					name={this.state.name}
					nameChangeHandler={this.nameChangeHandler.bind(this)} 
					updateName={this.updateName.bind(this)}
				/>
				<QuestionList questions={this.state.questions} editid={this.state.editid} setEditId={this.setEditId.bind(this) }/>
			</div>
		);
	}
}

export default EditQuizContainer;