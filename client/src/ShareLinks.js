import React from 'react'

const ShareLinks = (props)=>{
    let src = "https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Flocalhost%3A3000%2Fquiz%2F" + props.quiz + "&layout=button&size=large&mobile_iframe=true&appId=669144103266251&width=73&height=28"
    return (
        <div>
            <p>Your quiz has been saved... you can click on the link below to check it out. You can also click Share to share it with your friends on Facebook.</p>
            <h3>NO LINK YET</h3>
            <iframe src={src} width="73" height="28" scrolling="no" frameBorder="0" allow="encrypted-media"></iframe>
        </div>
    );
}

export default ShareLinks