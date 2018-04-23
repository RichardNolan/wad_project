import React from "react";

const Difficulty = (props) => {

	const clickHandler = (e)=>{
		props.setDifficulty(e.target.attributes.level.value);
	};

	return (
		// <div className="row">
		<div>
		
			{/* <div className="card col s10 offset-s1 row"> */}
			<div style={{position:"relative"}}>
				<a 
					className="waves-effect btn answer col s10 offset-s1 m6"
					onClick={clickHandler} 				
					level=""
				>Any</a>
				{props.chosen==="" ? <div className="symbol correct">{"\u2714"}</div> : null}
			</div>
			<div style={{position:"relative"}}>
				<a 
					className="waves-effect btn answer col s10 offset-s1 m6"
					onClick={clickHandler} 				
					level="easy"
				>Easy</a>
				{props.chosen==="easy" ? <div className="symbol correct">{"\u2714"}</div> : null}
			</div>
			<div style={{position:"relative"}}>
				<a 
					className="waves-effect btn answer col s10 offset-s1 m6"
					onClick={clickHandler} 				
					level="medium"
				>Medium</a>
				{props.chosen==="medium" ? <div className="symbol correct">{"\u2714"}</div> : null}
			</div>
			<div style={{position:"relative"}}>
				<a 
					className="waves-effect btn answer col s12 m6"
					onClick={clickHandler} 				
					level="hard"
				>Hard</a>
				{props.chosen==="hard" ? <div className="symbol correct">{"\u2714"}</div> : null}
			</div>
				{/* <button onClick={clickHandler} level="" >Any</button>
				<button onClick={clickHandler} level="easy" >Easy</button>
				<button onClick={clickHandler} level="medium" >Medium</button>
				<button onClick={clickHandler} level="hard" >Hard</button> */}
			</div>
		// </div>
	);
};

export default Difficulty;