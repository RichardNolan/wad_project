import React, { Component } from "react";
import QuizContainer from "./quiz/QuizContainer";
import OptionsContainer from "./options/OptionsContainer";
import CustomQuizContainer from "./customQuiz/CustomQuizContainer";
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
			amount:20,
			difficulty:"",
			category:"9"
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
				<div className="navbar-fixed">
					<nav className="nav-extended">
						<div className="nav-wrapper">
						<a href="#" className="brand-logo">Logo</a>
						
						</div>
						<div className="nav-content">
						<ul className="tabs tabs-transparent">
							<li className="tab"><Link to="/quiz">Quick Quiz</Link></li>
							<li className="tab"><Link to="/options">Choose Quiz</Link></li>
							<li className="tab"><Link to="/custom">Custom Quiz</Link></li>
						</ul>
						</div>
					</nav>
				</div>
				<main>
					<Route exact path="/" component={Home} />
					<Route path="/quiz" render={(props) => <QuizContainer {...props} options={options} />} />
					<Route path="/options" render={(props) => <OptionsContainer {...props} setOptions={this.setOptions.bind(this)} />} />	
					<Route path="/custom" component={CustomQuizContainer} />	
				</main>
			</div>
		);
	}
}

export default App;