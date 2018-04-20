import React from "react";

const EditCustomQuizName = (props) => {
	return (
		<div className="row">
			<div className="card col s10 offset-s1 ">
				<div className="row valign-wrapper">
					<div className="input-field  col s9 m8">
						<i className="material-icons prefix" >loyalty</i>
						<input type="text" id="quiz_name" value={props.name} onChange={props.nameChangeHandler} />
						<label htmlFor="quiz_name" className={props.name ? "active":null}>Quiz name</label>
					</div>
					<div className=" col s3 m1 ">
						<a className="waves-effect btn answer" onClick={props.updateName}><i className="material-icons">saves</i></a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCustomQuizName;