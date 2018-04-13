import React, { Component } from "react";
import QuizContainer from "./quiz/QuizContainer";
import OptionsContainer from "./options/OptionsContainer";
import NewQuestionContainer from "./customQuiz/NewQuestionContainer";
import { Route, Link, Redirect } from "react-router-dom";


import "./App.css";

const Home = ()=>{
	return (
		<div>
			Ara's Homepage
		</div>
	);
};

class App extends Component {
	constructor(){
		super()
		this.state={
			amount:5,
			difficulty:"",
			category:""
		}
	}
	
	setOptions(options){
		this.setState(options)
		// REDIRECT SOMEHOW TO QUIZ
		return <Redirect push to="/quiz" />
	}

	render() {
		let options = {category:this.state.category, amount:this.state.amount, difficulty:this.state.difficulty}
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">QuizzAnywhere</h1>
					<div>
						<Link to="/options">Options</Link>
						<Link to="/quiz">Quiz</Link>
						<Link to="/custom">Custom</Link>
					</div>
				</header>
				<main>

					<Route exact path="/" component={Home} />
					<Route path="/quiz" render={(props) => <QuizContainer {...props} options={options} />} />
					<Route path="/options" render={(props) => <OptionsContainer {...props} setOptions={this.setOptions.bind(this)} />} />	
					<Route path="/custom" render={(props) => <NewQuestionContainer {...props} setOptions={this.setOptions.bind(this)} />} />	
				</main>
			</div>
		);
	}
}

export default App;