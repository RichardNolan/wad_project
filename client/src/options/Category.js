import React from "react";

const Category = (props) => {
	let categories = props.categories.slice() || [];

	categories.unshift({id:"", name:"Any Category"});

	const clickHandler = (e)=>{
		props.setCategory(e.currentTarget.attributes.catid.value);
	};

	categories=categories.map((cat,index)=>{
		let trickCat=cat.name;
		let catName= trickCat.replace(/entertainment:/i, " ");
		catName= catName.replace(/science:/i, " ");
		return (
			<div key={index}>
				<a 
					className="waves-effect btn answer col s12 m6 l3"
					onClick={clickHandler} 				
					catid={cat.id}
				>{catName}</a>
			</div>
		);
	});


	return (
		<div className="row">
			<div className="card col s12 offset-s0">
				<div className="input-field">
					{categories}
				</div>
			</div>
		</div>
	);
};

export default Category;