import React, { Component } from "react";
import CustomBooleanAnswer from "./CustomBooleanAnswer.js";
import CustomMultipleAnswer from "./CustomMultipleAnswer.js";
import DifficultyStars from "./DifficultyStars.js";
import M from "materialize-css/dist/js/materialize.js";
// import "../quiz/question.css";
class NewQuestionContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			type: "multiple",
			difficulty: "easy",
			correct:null,
			question: "",
			category: "custom",
			possible_answers:[],
			incorrect_answers:["","",""],
			correct_answer: "",
			problems:[]
		};
	}
	
	
	setCorrect(cor){
		this.setState({correct_answer:cor}, ()=>{
			this.setPossibleAnswers();  
		});
	}

	setPossibleAnswers(){
		let arr= this.state.incorrect_answers.slice();
		arr.unshift(this.state.correct_answer);
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
			correct_answer: ""
		});
	}

	handleQuestion(event){
		this.setState({question:event.currentTarget.value});
	}
	// const NewQuestion = (props) => {
	// 	let { category, difficulty, question, type, possible_answers, chosen_index } = props.question;
		
	// difficultyStars(){
	// 	if(this.state.difficulty==="easy") return "\u2605\u2606\u2606";
	// 	if(this.state.difficulty==="medium") return "\u2605\u2605\u2606";
	// 	if(this.state.difficulty==="hard") return "\u2605\u2605\u2605";
	// }

	onDifficultyChange(difficulty){
		this.setState({difficulty});
	}

	cleanQuestionForm(){
		this.setState({
			correct_answer:"",
			difficulty:"easy",
			incorrect_answers:["", "", ""],
			possible_answers:[],
			question:"",
			type:"multiple"
		});		
	}

	isValidQuestion(){
			// VALIDATION ON BLANK QUESTION AND CORRECT ANSWER
			if(this.state.question===""){
				M.toast({html: "You didn't enter a question" });
				return false;
			}
			if(this.state.correct_answer===""){
				M.toast({html: "You didn't enter a correct answer" })
				return false;
			}
	
			// VALIDATION ON BLANK WRONG ANSWERS
			if(this.state.incorrect_answers[0]===""){
				M.toast({html: "Missing incorrect answer 1"});
				return false;
			}
			if(this.state.incorrect_answers[1]===""){
				M.toast({html: "Missing incorrect answer 2"});
				return false;
			}
			if(this.state.incorrect_answers[2]===""){
				M.toast({html: "Missing incorrect answer 3"});
				return false;
			}
			return true;
	}

	addQuestion(cb){
		if(this.isValidQuestion()){
			let x = this.props.addQuestion(this.state);
			if(x){
				this.cleanQuestionForm();
				if(typeof cb === "function") cb();
			}
		}
	}

	finishedQuiz(){
		if(this.state.possible_answers.length>0 || this.state.question!==""){
			M.toast({html: "Trying to save your last question"});
			this.addQuestion(()=>{
				this.props.onFinishedQuiz();
			});
		}else{
			this.props.onFinishedQuiz();
		}
		
	}

	render () {
		// let stars = this.difficultyStars();
		
		return (
			<div className="row">
				<div className="card col s10 offset-s1">
					<div className="input-field">
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
						</div>
						<div className="row">
							<div className="input-field col s10 offset-s1">
								<i className="material-icons prefix">help_outline</i>
								<input type="text" id="question"  value={this.state.question} onChange={this.handleQuestion.bind(this)}/>
								<label htmlFor="question">Input question here</label>
							</div>
						</div>
						<div className="row">
							<div>
								{this.state.type==="boolean"
									? <CustomBooleanAnswer 
										setIncorrectBooleanAnswer={this.setIncorrectBooleanAnswer.bind(this)} 
										setCorrect={this.setCorrect.bind(this)} 
										correct_answer={this.state.correct_answer} 
									  />
									: <CustomMultipleAnswer 
										correct_answer={this.state.correct_answer} 
										incorrect_answers={this.state.incorrect_answers}
										setIncorrectAnswers={this.setIncorrectAnswers.bind(this)} 
										setCorrect={this.setCorrect.bind(this)}
										problems={this.state.problems}
									  />
								}
								
							</div>
						</div>	
						<a 
							className="waves-effect waves-light btn answer"
							onClick={this.addQuestion.bind(this)}
						>Add Question</a>
						{/* <button onClick={this.addQuestion.bind(this)}>Add Question</button> */}
					</div>
				</div>




				<a 
					className="waves-effect waves-light btn answer"
					//TEST THE LINE COMMENTED...
					onClick={this.finishedQuiz.bind(this)}
					// onClick={this.props.onFinishedQuiz}
				>Finished Quiz</a>
				{/* <button onClick={this.props.onFinishedQuiz}>Finished Quiz</button> */}
			</div>
		);
	}
}
export default NewQuestionContainer;