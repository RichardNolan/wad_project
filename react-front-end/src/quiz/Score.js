import React from "react";

const Score = (props) => {
	let score = props.questions.filter(element=>element.correct===true).length;

	return (
		<span>
            Score: {score} of {props.questions.length}
		</span>
	);
};

export default Score;