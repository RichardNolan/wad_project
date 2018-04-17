import React, {Component} from "react";
import Quiz from "./Quiz";
import ResultsQuiz from "./ResultsQuiz";
import fetch from "../fetch.js";

class QuizContainer extends Component {
	constructor({ match }) {
		super();
		this.state = {
			current_question : 0,
			questions:[],
			finished:false,
			quiz: match.params.id
		};
	}
	componentDidMount(){
		let quiz = 
			this.state.quiz 
				? fetch.quiz(this.state.quiz).then(res=>{
					res.questions = res.questions.map(q=>{
						q.category = res.name;
						return q;
					});
					return res.questions;
				})
				: fetch.questions(this.props.options);

		quiz.then(questions=>{
			this.setState({questions:questions.map(q=>{
				q.correct = undefined;
				return q;
			})});
		});
	}

	moveCurrent(amount){
		if(this.state.current_question+amount>=0 && this.state.current_question+amount<this.state.questions.length){
			this.setState(prevState=>(
				{current_question:prevState.current_question+amount}
			));
		}

		this.isQuizFinished();

	}

	isQuizFinished(){
		let unanswered_questions = this.state.questions.filter(q=>q.correct===undefined).length;
		if(unanswered_questions===0) this.setState({finished:true});
	}

	onCorrect(index, is_correct){
		let questions = this.state.questions.slice();
		questions[this.state.current_question].correct = is_correct;
		questions[this.state.current_question].chosen_index = index;
		this.setState({questions:questions});
	}
	// onIncorrect(ans){
	// 	let questions = this.state.questions.slice();
	// 	questions[this.state.current_question].correct = false;
	// 	questions[this.state.current_question].chosen_index = ans;
	// 	this.setState({questions:questions});
	// }
	render() {
		let x = this.state.finished 
			? <ResultsQuiz 
				questions={this.state.questions} 
			/>
			: <Quiz 
				questions={this.state.questions} 
				current={this.state.current_question}
				onNext={this.moveCurrent.bind(this,1)}
				onPrevious={this.moveCurrent.bind(this,-1)}
				onCorrect={this.onCorrect.bind(this)}
				// onIncorrect={this.onIncorrect.bind(this)}
			/>;

		return x;
	}
}

export default QuizContainer;
