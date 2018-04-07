import React, {Component} from 'react';
import Quiz from './Quiz';
import fetch from './fetch.js';

class QuizContainer extends Component {
  constructor() {
    super();
    this.state = {
      current_question : 0,
      questions:[]
    };
  }
  componentDidMount(){
    fetch.questions().then(questions=>{
      this.setState({questions:questions.map(q=>{
        q.correct = undefined;
        return q;
      })});
    });   
  }

  moveCurrent(amount){
    if(this.state.current_question+amount>=0 && this.state.current_question+amount<this.state.questions.length){
      this.setState(prevState=>(
        {current_question:prevState.current_question+amount}
      ))
    }
  }
  onCorrect(result){
    console.log(result ? "CORRECT" : "INCORRECT")
    let questions = this.state.questions.slice();
    questions[this.state.current_question].correct = result;
    this.setState({questions:questions})
  }
  render() {
    return <Quiz 
      questions={this.state.questions} 
      current={this.state.current_question}
      onNext={this.moveCurrent.bind(this,1)}
      onPrevious={this.moveCurrent.bind(this,-1)}
      onCorrect={this.onCorrect.bind(this, true)}
      onIncorrect={this.onCorrect.bind(this, false)}
    />;
  }
}

export default QuizContainer;
