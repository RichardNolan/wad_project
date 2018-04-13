import React, { Component } from "react";
import "../quiz/question.css";

class CustomMultipleAnswer2 extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			possible_answers:[],
			correct: ""
			
		};
	}
  
	setCorrect(cor){
		this.setState({correct:cor});
	}

	setPossibleAnswers(arr){
		this.setState({possible_answers:arr});
	}

	handleAnswer(event){
		console.log(event.currentTarget.value)
		// this.setPossibleAnswers({possible_answers:event.currentTarget.value});
	}
	render () {
		return (
			<div>
				<div>
					<input type="text" id="answer1" style={{maxWidth:40+"em"}} placeholder="write a possible answer here" value={this.state.answer} onMouseOut={this.handleAnswer}/>
					<input type="text" id="answer2" style={{maxWidth:40+"em"}} placeholder="write a possible answer here" value={this.state.answer} onMouseOut={this.handleAnswer}/>
					<input type="text" id="answer3" style={{maxWidth:40+"em"}} placeholder="write a possible answer here" value={this.state.answer} onMouseOut={this.handleAnswer}/>
					<input type="text" id="answer4" style={{maxWidth:40+"em"}} placeholder="write a possible answer here" value={this.state.answer} onMouseOut={this.handleAnswer}/>
				</div>		
			
				Choose the correct
			</div>
				
		);
	}
}
export default CustomMultipleAnswer2;