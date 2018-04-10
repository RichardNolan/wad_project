import React from "react";

const Difficulty = (props) => {

	const clickHandler = (e)=>{
		props.setDifficulty(e.target.attributes.level.value);
	};

	return (
		<div>
			<a 
				className="waves-effect waves-light btn answer"
				onClick={clickHandler} 				
				level=""
			>Any</a>
			<a 
				className="waves-effect waves-light btn answer"
				onClick={clickHandler} 				
				level="Easy"
			>Easy</a>
			<a 
				className="waves-effect waves-light btn answer"
				onClick={clickHandler} 				
				level="Medium"
			>Medium</a>
			<a 
				className="waves-effect waves-light btn answer"
				onClick={clickHandler} 				
				level="Hard"
			>Hard</a>
			{/* <button onClick={clickHandler} level="" >Any</button>
			<button onClick={clickHandler} level="easy" >Easy</button>
			<button onClick={clickHandler} level="medium" >Medium</button>
			<button onClick={clickHandler} level="hard" >Hard</button> */}
		</div>
	);
};

export default Difficulty;