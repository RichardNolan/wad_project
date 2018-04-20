import React from "react";
import ShareButton from 'react-social-share-buttons'

const ShareLinks =(props)=>{

	let {link, text} = props;
	let url = "https://OURWEBSITE.com/"+link
	let media = "https://OURWEBSITE.com/IMAGE.png"

	let platforms = ["facebook", "twitter"]

	platforms = platforms.map((p,i)=>(
		<div className="col s4" key={i}>
			<ShareButton			
				compact
				socialMedia={p}
				url={url}
				media={media}
				text={text}
			/>
		</div>
	))
	return(
		<li >
			{platforms}
		</li>
	)
	
}

export default ShareLinks;