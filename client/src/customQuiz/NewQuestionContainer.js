import React, { Component } from "react";
import CustomBooleanAnswer from "./CustomBooleanAnswer.js";
import CustomMultipleAnswer from "./CustomMultipleAnswer.js";
import DifficultyStars from "./DifficultyStars.js";
// import "../quiz/question.css";

class NewQuestionContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			type: "multiple",
			difficulty: "easy",
			question: "",
			category: "custom",
			possible_answers:[],
			incorrect_answers:["","",""],
			correct: "",
			problems:[]
		};
	}
	
	
	setCorrect(cor){
		this.setState({correct:cor}, ()=>{
			this.setPossibleAnswers();  
		});
	}

	setPossibleAnswers(){
		let arr= this.state.incorrect_answers.slice();
		arr.unshift(this.state.correct);
		arr.sort(()=> 0.5 - Math.random());
		this.setState({possible_answers:arr});
	}

	setIncorrectBooleanAnswer(arr){
		this.setState({incorrect_answers:arr});
	}

	setIncorrectAnswers(value,index){
		let items = [...this.state.incorrect_answers];
		items[index] = value;
		this.setState({incorrect_answers: items}, ()=>{
			this.setPossibleAnswers();   
		});
		
	}
	
	handleRadioChange(event) {
		this.setState({
			type: event.currentTarget.value,
			incorrect_answers: ["","",""],
			possible_answers: [],
			correct: ""
		});
	}

	handleQuestion(event){
		this.setState({question:event.currentTarget.value});
	}
	// const NewQuestion = (props) => {
	// 	let { category, difficulty, question, type, possible_answers, chosen_index } = props.question;
		
	difficultyStars(){
		if(this.state.difficulty==="easy") return "\u2605\u2606\u2606";
		if(this.state.difficulty==="medium") return "\u2605\u2605\u2606";
		if(this.state.difficulty==="hard") return "\u2605\u2605\u2605";
	}

	onDifficultyChange(difficulty){
		this.setState({difficulty});
	}

	cleanQuestionForm(){

			this.setState({
				correct:"",
				difficulty:"easy",
				incorrect_answers:["", "", ""],
				possible_answers:[],
				question:"",
				type:"multiple",
				problems:[]
			});
			
		
	}

	addQuestion(){
		let problems = []
		// VALIDATION ON BLANK ANSWERS
		if(this.state.incorrect_answers[0]===""){
			//SET incorrct 1 to red
			problems.push(1);
			return false;
		}
		if(this.state.incorrect_answers[1]===""){
			//SET incorrct 1 to red
			problems.push(2);
			return false;
		}
		if(this.state.incorrect_answers[2]===""){
			//SET incorrct 1 to red
			M.toast({html: 'Missing Answer 3'})
			return false;
		}

		this.setState({problems},()=>{
			let x = this.props.addQuestion(this.state);
			if(x) this.cleanQuestionForm();
		});

	}

	render () {
		// let stars = this.difficultyStars();
		
		return (
			<div>
				<div className="row">
					<div className="input-field col s10 offset-s1">
						<i className="material-icons prefix">help_outline</i>
						<input type="text" id="question"  value={this.state.question} onChange={this.handleQuestion.bind(this)}/>
						<label htmlFor="question">Input question here</label>
					</div>
				</div>
				<div className="row">
					<DifficultyStars onDifficultyChange={this.onDifficultyChange.bind(this)}/>
					<div className="radio">
						<label>
							<input type="radio" name="type" value="boolean" checked={this.state.type === "boolean"} onChange={this.handleRadioChange.bind(this)}/><span>True/False</span>
						</label>
						<label>
							<input type="radio" name="type" value="multiple" checked={this.state.type === "multiple"} onChange={this.handleRadioChange.bind(this)}/> <span>4 possible answers</span>
						</label>
					</div>
					<div>
						{this.state.type==="boolean"
							? <CustomBooleanAnswer setIncorrectBooleanAnswer={this.setIncorrectBooleanAnswer.bind(this)} setCorrect={this.setCorrect.bind(this)} correct={this.state.correct} />
							: <CustomMultipleAnswer 
								correct={this.state.correct} 
								incorrect_answers={this.state.incorrect_answers}
								setIncorrectAnswers={this.setIncorrectAnswers.bind(this)} 
								setCorrect={this.setCorrect.bind(this)}
								problems={this.state.problems}
							/>
						}
						
					</div>
				</div>	
				<button onClick={this.addQuestion.bind(this)}>Add Question</button>
			</div>
		);
	}
}
export default NewQuestionContainer;