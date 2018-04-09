import React from "react";

const Amount = (props) => {

	const changeHandler = (e)=>{
		let amt = e.target.value;
		amt = amt<=50 ? amt : 50;
		amt = amt<5 ? 5 : amt;
		props.setAmount(amt);
	};

	return (
		<div>
			{/* media query to show +- on mobile hide on desktop */}
			<button>-</button>
			<input type="number" step="5" max="50" min="5" onChange={changeHandler} value={props.chosen}/>
			<button>+</button>
		</div>
	);
};

export default Amount;