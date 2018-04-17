import React, { Component } from "react";
import EditCustomQuizName from "./EditCustomQuizName.js";
import FETCH from "../fetch.js";
import storage from "../localStorage.js";

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
			console.log("RETURN FROM FETCH", res)
			this.setState({name:res.name});
		});
	}

	nameChangeHandler(e){
		this.setState({name:e.currentTarget.value});
	}

	updateName(){
		FETCH.updateName(this.state.id, {name:this.state.name, password:prompt("pw")})
			.then(res=>{
				console.log("RETURN FROM FETCH", res)
				if(res.data){
					storage.updateName(this.state.name, this.state.id);
					M.toast({html: "You have updated the quiz name"});
				}
					
					 //MAYBE AN ERROR
			});
	}

	render () {
		return (
			<div>
				<EditCustomQuizName 
					name={this.state.name}
					nameChangeHandler={this.nameChangeHandler.bind(this)} 
					updateName={this.updateName.bind(this)}
				/>
			</div>
		);
	}
}

export default EditQuizContainer;