import React from "react";

const CustomQuizDetails = (props) => {
	return (
		<div className="row">
			<div className="card col s10 offset-s1 ">
				<div className="input-field">
					<i className="material-icons prefix" >loyalty</i>
					<input type="text" id="quiz_name" value={props.name} onChange={props.nameChangeHandler} />
					<label htmlFor="quiz_name">Name your quiz here</label>
				</div>
			</div>
			<div className="card col s10 offset-s1">
				<blockquote>Your password must be at least 6 alphanumeric characters in length and contain at least one number and one uppercase character</blockquote> 
				<div className="input-field">
					<i className="material-icons prefix">vpn_key</i>
					<input type="password" id="passwd" value={props.password} 
						style={props.passwordOK?{background:"#D6F6ED"}:{background:"#F9D9D4"}} 
						onChange={props.passwordChangeHandler}
					/>
					<label htmlFor="passwd">A password to keep it secure</label>
				</div>
				<div className="input-field">	
					<i className="material-icons prefix">{props.passwordSame ? "done_all" : "error_outline"}</i>
					<input type="password" id="passwd_val" 
						style={props.passwordSame?{background:"#D6F6ED"}:{background:"#F9D9D4"}} 
						value={props.password_val} onChange={props.password_valChangeHandler}
					/>	 
					<label htmlFor="passwd_val">Confirm your password</label>
				</div>
			</div>
			<div className="row">
				<a 
					className="waves-effect btn answer"
					onClick={props.saveQuiz}
				>Save Quiz</a>
				{/* <button onClick={props.saveQuiz}>Save Quiz</button> */}
			</div>
		</div>
	);
};

export default CustomQuizDetails;