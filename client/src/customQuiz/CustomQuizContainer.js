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
			passwordSame:false,
			passwordOK:false,
			questions:[],
			finished:false, 
			nextQuestion:false	
		};
	}
	
	validate(){
		//VALIDATE THE QUIZ DETAILS
		if(this.state.name===""){
			return {passed:false, reason: "You must enter a name for this quiz"};
		}
		if(this.state.name.match(/[^a-z0-9" "]+/i)){
			return {passed:false, reason: "Only alphanumeric characters are allowed"};
		}

		// PASSWORD VALID CHECK ABSTRACTED FOR REUSE
		let isPwValid = this.isPasswordValid();
		if(!isPwValid){
			return isPwValid;
		}

		if(!this.state.passwordSame){
			return {passed:false, reason: "Passwords don't match"};
		}
		
		if(!this.state.passwordSame){
			return {passed:false, reason: "Passwords don't match"};
		}
		// if nothing returned yet as a failed validation return passed with no reson
		return {passed:true, reason:""};
	}

	isPasswordValid(){
		if(this.state.password===""){
			this.setState({passwordOK:false});
			return {passed:false, reason: "You must enter a password for this quiz"};
		}else if(this.state.password.length<6){
			this.setState({passwordOK:false});
			return {passed:false, reason: "Password must be at least 6 characters"};
		}else if(!this.state.password.match(/(?=.*[A-Z])(?=.*[0-9])/)){
			this.setState({passwordOK:false});
			return {passed:false, reason: "Password must contain at least 1 number and at least 1 uppcase letter"};
		}else{
			this.setState({passwordOK:true});
			return {passed:true, reason:""};
		}
	}

	saveQuiz(){
		let validation = this.validate();

		if(!validation.passed){
			M.toast({html: validation.reason});
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
			this.isPasswordValid();
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
				passwordOK={this.state.passwordOK}
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