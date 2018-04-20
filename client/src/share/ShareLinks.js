import React from "react";
import ShareButton from 'react-social-share-buttons'
import "./share.css"

// const ShareLinks =(props)=>{
class ShareLinks extends React.Component{
	constructor(){
		super()
		this.state = {
			show:false,
			platforms:["facebook", "twitter"]
		}
	}

	showHide(){
		this.setState({visible: !this.state.visible});
	}

	render(){
		let {link, text} = this.props;
		let url = "https://OURWEBSITE.com/"+link
		let media = "https://OURWEBSITE.com/IMAGE.png"
		let platforms = this.state.platforms.map((p,i)=>(
			<div className="col" key={i}>
				<ShareButton			
					compact
					socialMedia={p}
					url={url}
					media={media}
					text={text}
				/>
			</div>
		))
		let classes = "floating-menu row "
		classes += this.state.visible ? '' : 'hide'
		return (
			<div class="social-menu">
				<i className="material-icons blue-text pointer" onClick={this.showHide.bind(this)}>share</i>

				<div className={classes} >
					{platforms}
				</div>
			</div>


		)
	}

	
}

export default ShareLinks;