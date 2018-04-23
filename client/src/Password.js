import React from "react";
import "./password.css";
import M from "materialize-css/dist/js/materialize.js";

class Password extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show:props.show,
            password:""
        }
    }
    componentDidMount(){
        this.Password_Modal = M.Modal.init(document.querySelector('.modal'), {});
        this.state.show ? this.Password_Modal.open() : this.Password_Modal.close();
    }
    
    updatePassword(e){
        this.setState({password:e.target.value})
    }

    onPassword(){
        this.props.onPassword(this.state.password)
    }

    onCancel(){
        this.props.onPassword("")
    }

    render(){

        return(
            <div id="password_modal" className="modal">
                <div className="modal-content">
                <h4>Enter the Quiz password</h4>
                <input
                    className="active"
                    type="text"
                    value={this.state.password}
                    onChange={this.updatePassword.bind(this)}
                />
                </div>
                <div className="modal-footer">
                <a className="waves-effect waves-light btn" onClick={this.onCancel.bind(this)}><i className="material-icons left">cancel</i>Cancel</a>
                <a className="waves-effect waves-light btn" onClick={this.onPassword.bind(this)}><i className="material-icons left">done</i>Submit</a>
                </div>
            </div>
        )
    }
}

export default Password