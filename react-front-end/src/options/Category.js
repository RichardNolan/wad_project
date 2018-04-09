import React from "react";

const Category = (props) => {
	let {categories}=props;

	const clickHandler = (e)=>{
		console.log(e.target.attributes.catid.value);
		props.setCategory(e.target.attributes.catid.value);
	};

	categories=categories.map((cat,index)=>{
		return <button key={index}  onClick={clickHandler} catid={cat.id}>{cat.name}</button>
	});


	return (
		<div>
			<button  onClick={clickHandler} catid="">Any Category</button>
			{categories}
		</div>
	);
};

export default Category;