import React, { Component } from "react";
import Difficulty from "./Difficulty.js";
import Amount from "./Amount.js";
import Category from "./Category.js";
import fetch from "../fetch.js";
import { Route, Link, Redirect } from "react-router-dom";


class OptionsContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			// current_option: 0,
			difficulty: "",
			amount: 5, 
			categories: [],
			category: 0,
			finished: false, 
			displayPage: ""
		};
	}
	
	componentDidMount(){
		fetch.categories().then(categories=>{
			this.setState({categories:categories});
		});   
	}

	setCategory(cat){
		this.setState({category:cat, displayPage:"difficulty"});
	}
	
	setDifficulty(diff){
		this.setState({difficulty:diff, displayPage:"amount"});
	}

	setAmount(amt){
		this.setState({amount:amt});
	}

	// moveCurrent(step){
	// 	if(this.state.current_option+step>=0 && this.state.current_option+step<3){
	// 		this.setState(prevState=>(
	// 			{current_option:prevState.current_option+step}
	// 		));
	// 	}
	// 	this.isOptionsFinished();
	// }
	
	// isOptionsFinished(){
	// 	this.setState({finished:true});
	// }

	redirectTo(options_page){
		return(this.state.displayPage===options_page && this.props.location.pathname.indexOf(options_page)<0);
	}

	passOptionsBackUp(){
		this.props.setOptions({category:this.state.category, amount:this.state.amount, difficulty:this.state.difficulty})
	}

	render () {
		// if(this.redirectTo("difficulty"))  return <Redirect push to="/options/difficulty" />;
		// if(this.redirectTo("amount"))	   return <Redirect push to="/options/amount" />;
		// if(this.redirectTo("category"))	   return <Redirect push to="/options/category" />;
		

		return (
			<div>
				<div>
					<Link to="/options/category">Category</Link>
					<Link to="/options/difficulty">Difficulty</Link>
					<Link to="/options/amount">Amount</Link>
				</div>
				{/* <Difficulty setDifficulty={this.setDifficulty.bind(this)} chosen={this.state.difficulty}/>
				<Amount setAmount={this.setAmount.bind(this)} chosen={this.state.amount}/>
				<Category setCategory={this.setCategory.bind(this)} chosen={this.state.category} categories={this.state.categories} /> */}
				<Route path="/options/category" render={(props) => <Category {...props} setCategory={this.setCategory.bind(this)} chosen={this.state.category} categories={this.state.categories} />} />
				<Route path="/options/difficulty" render={(props) => <Difficulty {...props} setDifficulty={this.setDifficulty.bind(this)} chosen={this.state.difficulty} />} />
				<Route path="/options/amount" render={(props) => <Amount {...props} setAmount={this.setAmount.bind(this)} chosen={this.state.amount} />} />
				<Link to="/quiz" 
					className="waves-effect waves-light btn answer"
					onClick={this.passOptionsBackUp.bind(this)}
				>Finished </Link>
				{/* <button onClick={this.passOptionsBackUp.bind(this)} >Finished</button> */}
			</div>
		);
	}
}

export default OptionsContainer;