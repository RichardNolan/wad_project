import React from "react";

const Category = (props) => {

	let categories = props.categories.slice() || [];

	categories.unshift({id:"", name:"Any Category"});

	const clickHandler = (e)=>{
		props.setCategory(e.currentTarget.attributes.catid.value);
	};

	categories=categories.map((cat,index)=>{
		return (
			<div key={index}>
				<a 
					className="waves-effect waves-light btn answer"
					onClick={clickHandler} 				
					catid={cat.id}
				>{cat.name}</a>
			</div>
		);
	});


	return (
		<div>
			{categories}
		</div>
	);
};

export default Category;