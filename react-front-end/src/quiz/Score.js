import React from 'react'

const Score = (props) => {
    console.log(props);
    let score = props.questions.filter(element=>element.correct===true).length

    return (
        <span>
            {score}/{props.questions.length}
        </span>
    )
}

export default Score