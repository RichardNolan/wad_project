import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./hamburger.css";
import "./style.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";


import { BrowserRouter as Router } from "react-router-dom";

const Application = ()=>{
	return (
		<Router><App/></Router>
	);
};


ReactDOM.render(<Application />, document.getElementById("root"));
registerServiceWorker();
