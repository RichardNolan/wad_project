import React, { Component } from "react";
import QuizContainer from "./quiz/QuizContainer";
import OptionsContainer from "./options/OptionsContainer";
import CustomQuizContainer from "./customQuiz/CustomQuizContainer";
import { Route, Link } from "react-router-dom";
import EditQuizContainer from "./customQuiz/EditQuizContainer.js";

import logo from "./logo.png";
import "./App.css";

const Home = ()=>{
	return (
		<div>

		</div>
	);
};

class App extends Component {
	constructor(){
		super();
		this.state={
			amount:20,
			difficulty:"",
			category:""
		};
	}
	
	setOptions(options){
		this.setState(options);
	}

	render() {
		let options = {category:this.state.category, amount:this.state.amount, difficulty:this.state.difficulty};
		
		return (
			<div className="App">
				<div className="navbar-fixed">
					<nav className="nav-extended">
						<div className="nav-wrapper">
							<img src={logo} className="brand-logo bounceInLeft" style={{maxWidth:"60px"}} alt="GoQuiz Logo"/>						
						</div>
						<div className="nav-content">
							<ul className="tabs tabs-transparent">
								<li className="tab"><Link to="/quickquiz">Quick Quiz</Link></li>
								<li className="tab"><Link to="/options">Choose Quiz</Link></li>
								<li className="tab"><Link to="/custom">Create Quiz</Link></li>
							</ul>
						</div>
					</nav>
				</div>

				<main>
					<Route exact path="/" component={Home} />
					<Route exact path="/quickquiz" render={(props) => <QuizContainer {...props} />} />
					<Route exact path="/quiz" render={(props) => <QuizContainer {...props} options={options} />} />
					<Route path="/quiz/:id" render={(props) => <QuizContainer {...props} options={options} />} />
					<Route path="/options" render={(props) => <OptionsContainer {...props} setOptions={this.setOptions.bind(this)} />} />	
					<Route path="/custom" component={CustomQuizContainer} />
					<Route path="/edit/quiz/:id" component={EditQuizContainer}/>
				</main>
			</div>
		);
	}
}

export default App;