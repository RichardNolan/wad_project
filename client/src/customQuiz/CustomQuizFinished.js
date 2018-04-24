import React from "react";
import { Link } from "react-router-dom";
import ShareLinks from "../share/ShareLinks.js";


const CustomQuizFinished = (props)=>{

    let link= "/quiz/"+props.match.params.id;
    let name = props.match.params.name;


        return(
            <div>
                <p>Your quiz "{name}" has been saved... you can click on the link below to check it out. You can also click Share to share it with your friends on Facebook.</p>
                <div className=" col s12">
                    <Link to={link} className="waves-effect btn">{name}</Link>
                    <ShareLinks text={name} link={link} />
                </div>
            </div>
        )
	
}

export default CustomQuizFinished;
