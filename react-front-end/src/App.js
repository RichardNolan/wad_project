import React, { Component } from "react";
import QuizContainer from "./quiz/QuizContainer";
import OptionsContainer from "./options/OptionsContainer";
import { Route, Link } from "react-router-dom";


import "./App.css";

const Home = ()=>{
	return (
		<div>
			Ara's Homepage
		</div>
	)
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">QuizzAnywhere</h1>
					<div>
						<Link to="/options">Options</Link>
						<Link to="/quiz">Quiz</Link>
					</div>
				</header>
				<main>
					<Route exact path="/" component={Home} />
					<Route path="/quiz" component={QuizContainer} />
					<Route path="/options" component={OptionsContainer} />
					
				</main>
			</div>
		);
	}
}

export default App;


// This could maybe work as a stateless component

// import React from 'react'

// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 className="App-title">QuizzAnywhere</h1>
//       </header>
//       <main>
//         <QuizContainer />
//       </main>
//     </div>
//   )
// }

// export default App