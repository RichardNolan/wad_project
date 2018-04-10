import React from "react";

const Amount = (props) => {
	let amountBox
	const changeHandler = (e)=>{
		let amt = e.target.value;
		props.setAmount(validateAmount(amt));
	};

	const validateAmount= (amt)=>{
		// validates the max and minimum amount of questions
		amt = amt<=50 ? amt : 50;
		amt = amt<5 ? 5 : amt;
		return amt;
	}

	const stepDown = ()=>{
		// 
		let val = parseInt(amountBox.value,10)-parseInt(amountBox.step,10);
		props.setAmount(validateAmount(val));
	};
	const stepUp = ()=>{
		// 
		let val = parseInt(amountBox.value,10)+parseInt(amountBox.step,10);
		props.setAmount(validateAmount(val));
	};

	return (
		<div>
			{/* media query to show +- on mobile hide on desktop */}
			<button onClick={stepDown}>-</button>
			<input ref={el=>amountBox=el} style={{maxWidth:5+'em'}} type="number" step="5" max="50" min="5" onChange={changeHandler} value={props.chosen}/>
			<button onClick={stepUp}>+</button>
		</div>
	);
};

export default Amount;