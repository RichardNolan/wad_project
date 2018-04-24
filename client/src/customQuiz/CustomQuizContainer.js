import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import NewQuestionContainer from "./NewQuestionContainer";
import CustomQuizDetails from "./CustomQuizDetails";


import M from "materialize-css/dist/js/materialize.js";
import FETCH from "../fetch.js";
import storage from "../localStorage.js";

class CustomQuizContainer extends Component {
	constructor(){
		super();
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
		};
	}
	
	saveQuiz(){
		//VALIDATE THE QUIZ DETAILS
		if(this.state.name===""){
			M.toast({html: "You must enter a name for this quiz"});
			return false;
		}
		if(this.state.name.match(/[^a-z0-9" "]+/i)){
			M.toast({html: "Only alphanumeric characters are allowed"});
			return false;
		}
		if(this.state.password.length<6){
			M.toast({html: "Password must be at least 6 characters"});
			return false;
		}
		if(!this.state.password.match(/(?=.*[A-Z])(?=.*[0-9])/)){
			M.toast({html: "Password must contain at least 1 number and at least 1 uppcase letter"});
			return false;
		}
		if(this.state.password===""){
			M.toast({html: "You must enter a password for this quiz"});
			return false;
		}
		if(!this.state.passwordSame){
			M.toast({html: "Passwords don't match"});
			return false;
		}
		FETCH.saveQuiz(this.state)
			.then(data=>{
				// console.log("RETURN FROM FETCH", data)
				this.setState({returned:data});
				storage.saveQuiz(data.name, data._id);
			});
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
		if(this.state.questions.length>0){
			this.setState({finished:true});
		}else{
			//TOAST
			// console.log("YOU MUST HAVE AT LEAST 1 QUESTION");
			M.toast({html: "You must have at least one question to save a quiz"});
		}
	}

	onResetNextQuestion(){
		this.setState({nextQuestion:false});
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
				{/* redirect to custom route for CUSTOMQUIZFINISHED such as /share/quiz/:id  this component retrieves nam from localStorage or fetch rather than from props    */}
				{/* {this.state.returned ? <CustomQuizFinished text={this.state.returned.name} link={"/quiz/"+this.state.returned._id} /> : QuizDetailsQuestions}				 */}
				{this.state.returned ? <Redirect push to={"/share/"+this.state.returned._id+"/"+this.state.returned.name} /> : QuizDetailsQuestions}				
			</div>
		);
	}
}

export default CustomQuizContainer;