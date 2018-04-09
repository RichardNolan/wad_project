import React from "react";

const Difficulty = (props) => {

	const clickHandler = (e)=>{
		props.setDifficulty(e.target.attributes.level.value);
	};

	return (
		<div>
			<button onClick={clickHandler} level="" >Any</button>
			<button onClick={clickHandler} level="easy" >Easy</button>
			<button onClick={clickHandler} level="medium" >Medium</button>
			<button onClick={clickHandler} level="hard" >Hard</button>
		</div>
	);
};

export default Difficulty;