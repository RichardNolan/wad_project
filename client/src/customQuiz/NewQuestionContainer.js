import React, { Component } from "react";
import CustomBooleanAnswer from "./CustomBooleanAnswer.js";
import CustomMultipleAnswer from "./CustomMultipleAnswer.js";
import CustomMultipleAnswer2 from "./CustomMultipleAnswer2.js";
import "../quiz/question.css";

class NewQuestionContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			typeQ: "multiple",
			difficulty: "medium",
			question: "",
			category: "custom",
			possible_answers:[],
			incorrect_answers:["","",""],
			correct: "",
		};
	}
	
	setCorrect(cor){
		this.setState({correct:cor});
	}

	setPossibleAnswers(arr){
		this.setState({possible_answers:arr});
	}

	setIncorrectBooleanAnswer(arr){
		this.setState({incorrect_answers:arr});
	}

	setIncorrectAnswers(value,index){
		let items = [...this.state.incorrect_answers];
		items[index] = value;
		this.setState({incorrect_answers: items});
	}
	

	handleRadioChange(event) {
		this.setState({typeQ: event.currentTarget.value});
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

	// 	const changeDifficulty = (e)=>{
	// 		if(e==="\u2605" ) return "\u2606";
	// 		if(e==="\u2606" ) return "\u2605";
	// 	};

	render () {
		let stars = this.difficultyStars();
		return (
			<div>
				{/* <form> */}
				<div className="row">
					<div className="input-field col s10 offset-s1">
						<i className="material-icons prefix">help_outline</i>
						<input type="text" id="question"  value={this.state.question} onChange={this.handleQuestion.bind(this)}/>
						<label htmlFor="question">input question here</label>

					</div>
				</div>
				<div className="row">
					<h5>{this.state.category} - {stars}</h5>
					<div className="radio">
						<label>
							<input type="radio" name="typeQ" value="boolean" checked={this.state.typeQ === "boolean"} onChange={this.handleRadioChange.bind(this)}/><span>True/False</span>
						</label>
						<label>
							<input type="radio" name="typeQ" value="multiple" checked={this.state.typeQ === "multiple"} onChange={this.handleRadioChange.bind(this)}/> <span>4 possible answers</span>
						</label>
					</div>
					<div>
						{this.state.typeQ==="boolean"
							? <CustomBooleanAnswer setIncorrectBooleanAnswer={this.setIncorrectBooleanAnswer.bind(this)} setPossibleAnswers={this.setPossibleAnswers.bind(this)} setCorrect={this.setCorrect.bind(this)}/>
							: <CustomMultipleAnswer setIncorrectAnswers={this.setIncorrectAnswers.bind(this)} setCorrect={this.setCorrect.bind(this)}/>
						}
					</div>
					{/* <input type="submit" value="Submit"/> */}
				</div>	
				{/* </form> */}
			</div>
		);
	}
}
export default NewQuestionContainer;