import React, { Component } from "react";
import Difficulty from "./Difficulty.js";
import Amount from "./Amount.js";
import Category from "./Category.js";
import fetch from "../fetch.js";
import { Route, Link } from "react-router-dom";


class OptionsContainer extends Component {
	constructor(){
		super();
		this.state = {
			difficulty: "",
			amount: 5, 
			categories: [],
			category: 0
		};
	}
	
	componentDidMount(){
		fetch.categories().then(categories=>{
			this.setState({categories:categories});
		});   
	}

	setCategory(cat){
		this.setState({category:cat});
	}
	
	setDifficulty(diff){
		this.setState({difficulty:diff});
	}

	setAmount(amt){
		this.setState({amount:amt});
	}

	render () {
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
			</div>
		)
	}
}

export default OptionsContainer;