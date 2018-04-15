import React, { Component } from 'react'
import NewQuestionContainer from "./NewQuestionContainer";
import CustomQuizDetails from './CustomQuizDetails';
import ShareLinks from "../ShareLinks.js"
import M from "materialize-css/dist/js/materialize.js";
import api from '../fetch_api.js'

class CustomQuizContainer extends Component {
	constructor(){
		super()
		this.state={
			returned:null,
			name:"",
			password:"",
			password_val:"",
			// password2:"",
			passwordSame:true,
			questions:[],
			finished:false, 
			nextQuestion:false	
		}
	}
	saveQuiz(){
		if(this.state.name===""){
			M.toast({html: "You must enter a name for this quiz"});
			return false;
		}
		if(this.state.password.length<6){
			M.toast({html: "Password must be at least 6 characters"});
			return false;
		}
		if(!this.state.passwordSame){
			M.toast({html: "Passwords don't match"});
			return false;
		}
		api.saveQuiz(this.state)
			.then(data=>{
				this.setState({returned:data});
			})
	}

	addQuestion(data){
		let {questions} = this.state;
		questions.push(data);
		this.setState({questions:questions, nextQuestion:true});
		return true;
	}


	nameChangeHandler(e){
		this.setState({name:e.currentTarget.value});
	}
	
	passwordChangeHandler(e){
		this.setState({password:e.currentTarget.value}, ()=>{
			this.comparePasswords();
		});
	}

	password_valChangeHandler(e){
		this.setState({password_val:e.currentTarget.value}, ()=>{
			this.comparePasswords();
		});
	}

	comparePasswords(){
		this.state.password===this.state.password_val 
			? this.setState({passwordSame:true}) 
			: this.setState({passwordSame:false});
	}
	finishedQuiz(){
		this.setState({finished:true});
	}
	onResetNextQuestion(){
		this.setState({nextQuestion:false})
	}
	render () {
		let QuizDetailsQuestions = this.state.finished
			? <CustomQuizDetails 
					name={this.state.name}
					password={this.state.password}
					password_val={this.state.password_val}
					passwordSame={this.state.passwordSame}
					nameChangeHandler={this.nameChangeHandler.bind(this)} 
					passwordChangeHandler={this.passwordChangeHandler.bind(this)}
					password_valChangeHandler={this.password_valChangeHandler.bind(this)}
					saveQuiz={this.saveQuiz.bind(this)}
				/>
			: <NewQuestionContainer 
					addQuestion={this.addQuestion.bind(this)} 
					nextQuestion={this.state.nextQuestion} 
					onResetNextQuestion={this.onResetNextQuestion.bind(this)} 
					onFinishedQuiz={this.finishedQuiz.bind(this)}
				/>;
		return (
			<div>
				{this.state.returned ? <ShareLinks quiz={this.state.returned}/> : QuizDetailsQuestions}				
			</div>
		);
	}
}

export default CustomQuizContainer;