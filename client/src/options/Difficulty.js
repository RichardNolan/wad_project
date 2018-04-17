import React from "react";

const Difficulty = (props) => {

	const clickHandler = (e)=>{
		props.setDifficulty(e.target.attributes.level.value);
	};

	return (
		<div className="row">
			<div className="card col s10 offset-s1">
				<div className="input-field">
					<a 
						className="waves-effect btn answer"
						onClick={clickHandler} 				
						level=""
					>Any</a>
					<a 
						className="waves-effect btn answer"
						onClick={clickHandler} 				
						level="easy"
					>Easy</a>
					<a 
						className="waves-effect btn answer"
						onClick={clickHandler} 				
						level="medium"
					>Medium</a>
					<a 
						className="waves-effect btn answer"
						onClick={clickHandler} 				
						level="hard"
					>Hard</a>
					{/* <button onClick={clickHandler} level="" >Any</button>
					<button onClick={clickHandler} level="easy" >Easy</button>
					<button onClick={clickHandler} level="medium" >Medium</button>
					<button onClick={clickHandler} level="hard" >Hard</button> */}
				</div>
			</div>
		</div>
	);
};

export default Difficulty;