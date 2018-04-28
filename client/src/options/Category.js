import React from "react";

const Category = (props) => {
	let categories = props.categories ? props.categories.slice() : [];

	categories.unshift({id:"", name:"Any Category"});

	const clickHandler = (e)=>{
		props.setCategory(e.currentTarget.attributes.catid.value);
	};

	categories=categories.map((cat,index)=>{

		let catName= cat.name
						.replace(/entertainment:/i, "")
						.replace(/science:/i, "");

		let tick = parseInt(cat.id, 10)===parseInt(props.chosen, 10) ? <div className="symbol correct">{"\u2714"}</div> : null
		return (
			<div key={index} style={{position:"relative"}}>
				<a 
					className="waves-effect btn answer col s10 offset-s1 m6 l3"
					onClick={clickHandler} 				
					catid={cat.id}
				>{catName}</a>
				{tick}
			</div>
		);
	});


	return (
		
				<div >
					{categories}
				</div>

	);
};

export default Category;