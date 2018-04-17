import React from "react";
import { Link } from "react-router-dom";
import storage from "./localStorage.js";

const ShareLinks = (props)=>{
	let{_id, name} = props.quiz;
	let src = "https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Flocalhost%3A3000%2Fquiz%2F" + _id + "&layout=button&size=large&mobile_iframe=true&appId=669144103266251&width=73&height=28";

	storage.saveQuiz(name, _id);
	return (
		<div>
			<p>Your quiz "{name}" has been saved... you can click on the link below to check it out. You can also click Share to share it with your friends on Facebook.</p>
			<div className=" col s12"><Link to={"/quiz/"+_id} className="waves-effect btn">{name}</Link></div>
			<iframe src={src} width="73" height="28" scrolling="no" frameBorder="0" allow="encrypted-media" title="facebook_share"></iframe>
		</div>
	);
};

export default ShareLinks;