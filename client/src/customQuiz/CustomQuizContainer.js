import React, { Component } from 'react'
import NewQuestionContainer from "./NewQuestionContainer";
import CustomQuizDetails from './CustomQuizDetails';

class CustomQuizContainer extends Component {
	constructor(){
		super()
		this.state={
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
				/>
			: <NewQuestionContainer addQuestion={this.addQuestion.bind(this)} nextQuestion={this.state.nextQuestion} onResetNextQuestion={this.onResetNextQuestion.bind(this)} />;
		return (
			<div>
				{QuizDetailsQuestions}
				<button onClick={this.finishedQuiz.bind(this)}>Finished</button>
			</div>
		);
	}
}

export default CustomQuizContainer;