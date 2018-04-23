import React from "react";
import { Link } from "react-router-dom";
import ShareLinks from "../share/ShareLinks.js";
import storage from "../localStorage";

const CustomQuizFinished = (props)=>{

    let link= "/quiz/"+props.match.params.id
    let text = storage.getByID(props.match.params.id).name

    return(
        <div>
            <p>Your quiz "{text}" has been saved... you can click on the link below to check it out. You can also click Share to share it with your friends on Facebook.</p>
            <div className=" col s12">
                <Link to={link} className="waves-effect btn">{text}</Link>
                <ShareLinks text={text} link={link} />
            </div>
        </div>
    )
	
}

export default CustomQuizFinished;
