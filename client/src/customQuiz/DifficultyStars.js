import React, { Component } from 'react'

class DifficultyStars extends Component {
	constructor(){
		super();
		this.state={
			stars:["\u2605","\u2606","\u2606"], 
			difficultyIndex:0
		};
	}
	
	clickChangeStar (e){		
		let index=e.currentTarget.attributes.index.value;
		let {stars} = this.state;
		stars=stars.map((s, i)=>{
			if(i<=index) return "\u2605";
			else return "\u2606";
		});
		this.setState({stars:stars, difficultyIndex:index}, ()=>{
			let difficulties = ["easy","medium","hard"];
			this.props.onDifficultyChange(difficulties[this.state.difficultyIndex]);
		});
	}

	render () {
		let starColor = "amber-text pointer";
		return (
			<div>
				<h4>
					Difficulty -&nbsp;
					<a onClick={this.clickChangeStar.bind(this)} className={starColor} index="0">{this.state.stars[0]}</a>
					<a onClick={this.clickChangeStar.bind(this)} className={starColor} index="1">{this.state.stars[1]}</a>
					<a onClick={this.clickChangeStar.bind(this)} className={starColor} index="2">{this.state.stars[2]}</a>
				</h4>
			</div>
		)
	}
}


export default DifficultyStars;