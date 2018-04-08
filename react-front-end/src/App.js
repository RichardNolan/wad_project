import React, { Component } from 'react';
import QuizContainer from './quiz/QuizContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">QuizzAnywhere</h1>
        </header>
        <main>
          <QuizContainer />
        </main>
      </div>
    );
  }
}

export default App;


// This could maybe work as a stateless component

// import React from 'react'

// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 className="App-title">QuizzAnywhere</h1>
//       </header>
//       <main>
//         <QuizContainer />
//       </main>
//     </div>
//   )
// }

// export default App