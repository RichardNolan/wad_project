import React from "react";

const Difficulty = (props) => {

	const clickHandler = (e)=>{
		props.setDifficulty(e.target.attributes.level.value);
	};

	return (
		<div className="row">
			<div className="card col s10 offset-s1 row">
				<a 
					className="waves-effect btn answer col s12 m6"
					onClick={clickHandler} 				
					level=""
				>Any</a>
				<a 
					className="waves-effect btn answer col s12 m6"
					onClick={clickHandler} 				
					level="easy"
				>Easy</a>
				<a 
					className="waves-effect btn answer col s12 m6"
					onClick={clickHandler} 				
					level="medium"
				>Medium</a>
				<a 
					className="waves-effect btn answer col s12 m6"
					onClick={clickHandler} 				
					level="hard"
				>Hard</a>
				{/* <button onClick={clickHandler} level="" >Any</button>
				<button onClick={clickHandler} level="easy" >Easy</button>
				<button onClick={clickHandler} level="medium" >Medium</button>
				<button onClick={clickHandler} level="hard" >Hard</button> */}
			</div>
		</div>
	);
};

export default Difficulty;