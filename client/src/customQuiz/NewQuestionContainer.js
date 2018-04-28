import React, { Component } from "react";
import CustomBooleanAnswer from "./CustomBooleanAnswer.js";
import CustomMultipleAnswer from "./CustomMultipleAnswer.js";
import DifficultyStars from "./DifficultyStars.js";
import M from "materialize-css/dist/js/materialize.js";
import FETCH from "../fetch.js";
// import "../quiz/question.css";

class NewQuestionContainer extends Component {
	constructor(props) {
		super(props);
		if(props.question){
			this.state=props.question;
		}else{
			this.state = {
				type: "multiple",
				difficulty: "easy",
				correct:null,
				question: "",
				category: "custom",
				possible_answers:[],
				incorrect_answers:["","",""],
				correct_answer: "",
				// problems:[]
			};
		}
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
			M.toast({html: "Missing an incorrect answer"});
			return false;
		}
		if(this.state.incorrect_answers[1]===""){
			M.toast({html: "Missing an incorrect answer"});
			return false;
		}
		if(this.state.incorrect_answers[2]===""){
			M.toast({html: "Missing an incorrect answer"});
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

	updateQuestion(cb){
		if(this.isValidQuestion()){
			let obj = Object.assign({}, this.state);
			obj.id = obj._id;
			delete obj._id;
			obj.password = this.props.password;
			FETCH.updateQuestion(this.state._id, obj)
				.then(data=>{
					if(data.error){
						M.toast({html: data.message});
						return false;
					}
					M.toast({html: "The question has been updated"});
					this.props.closeEditQuestion(data);
				}); 
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
				{this.props.question   // if we are passsing question, we are updating
					?null
					:<a 
						className="waves-effect btn answer"
						onClick={this.finishedQuiz.bind(this)}
						// onClick={this.props.onFinishedQuiz}
					>Finished Quiz</a>
				}
				<div className="card col s10 offset-s1 row">
					<div className="input-field col s10 offset-s1">
						<i className="material-icons prefix">help_outline</i>
						<input type="text" id="question"  value={this.state.question} onChange={this.handleQuestion.bind(this)}/>
						<label htmlFor="question" className={this.props.question ? "active":null}>Input question here</label>
					</div>
					<div className="row">
						<div className="col s12">
							<DifficultyStars onDifficultyChange={this.onDifficultyChange.bind(this)}/>
						</div>
					</div>
					<div className="radio row">
						<label>
							<input type="radio" name="type" value="boolean" checked={this.state.type === "boolean"} onChange={this.handleRadioChange.bind(this)}/>
							<span>True/False</span>
						</label>
						<label>
							<input type="radio" name="type" value="multiple" checked={this.state.type === "multiple"} onChange={this.handleRadioChange.bind(this)}/> 
							<span>4 possible answers</span>
						</label>
					</div>
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
							// problems={this.state.problems}
							question={this.props.question}
						/>
					}
						
					{this.props.question
						? <div className="row">
							<a 
								className="waves-effect btn answer col s5 offset-s1"
								onClick={this.updateQuestion.bind(this)}
							>Update Question</a>
							<a 
								className="waves-effect btn answer col s4 offset-s1"
								onClick={this.props.closeEditQuestion.bind(this)}
							>Cancel</a>
						</div>
						:<a 
							className="waves-effect btn answer "
							onClick={this.addQuestion.bind(this)}
						>Add Question</a>
					}	{/* <button onClick={this.addQuestion.bind(this)}>Add Question</button> */}	
				</div>
			</div>
		);
	}
}
export default NewQuestionContainer;