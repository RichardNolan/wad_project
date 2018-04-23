import React from "react";
import ShareButton from "react-social-share-buttons";
import M from "materialize-css/dist/js/materialize.js";
import "./share.css";

// const ShareLinks =(props)=>{
class ShareLinks extends React.Component{
	constructor(){
		super();
		this.state = {
			show:false,
			platforms:["facebook", "twitter"]
		};
		
	}

	componentDidMount(){
		let elem = document.querySelector(".dropdown-trigger");
		M.Dropdown.init(elem,{
			coverTrigger:false,
			constrainWidth: false,
			gutter: 1});
	}

	showHide(){
		this.setState({visible: !this.state.visible});
	}

	render(){
		let {link, text} = this.props;
		let url = "https://OURWEBSITE.com/"+link;
		let media = "https://OURWEBSITE.com/IMAGE.png";
		let platforms = this.state.platforms.map((p,i)=>(
			// <div className="col" key={i}>
			<ShareButton	
				key={i}		
				compact
				socialMedia={p}
				url={url}
				media={media}
				text={text}
			/>
			// </div>
		));
		// let classes = "floating-menu row ";
		// classes += this.state.visible ? "" : "hide";
		return (
			// <div class="social-menu">
			// 	<i className="material-icons blue-text pointer" onClick={this.showHide.bind(this)}>share</i>

			// 	<div className={classes} >
			// 		{platforms}
			// 	</div>
			// </div>

			<span>
				<i className="dropdown-trigger material-icons" data-target="dropdown1">share</i>
				{/* <!-- Dropdown Structure --> */}
				<ul id="dropdown1" className="dropdown-content alignment ">
					<li>{platforms}</li>
				</ul>
			</span>
		);
	}

	
}

export default ShareLinks;