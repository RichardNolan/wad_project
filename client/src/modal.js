import React from 'react';
import M from "materialize-css/dist/js/materialize.js";

class Modal extends React.Component{
    constructor(props){
        super()
        this.state = {
            text:"",
            MODAL:null, 
            open:props.isOpen, 
            randomName:"modal-"+Date.now()
        }
    }
	componentDidMount(){
        this.setState({MODAL : M.Modal.init(document.querySelector('.'+this.state.randomName), {onCloseEnd: this.close.bind(this)})});
    }
    close(){
        this.props.onClose(false);
    }
    onComplete(){
        this.props.onComplete(this.state.text);
        this.setState({text:""});
    }
    handleText(event){        
		this.setState({text:event.currentTarget.value});	
    }
    render(){
        this.props.isOpen && this.state.MODAL && this.state.MODAL.open();
        return (
                <div id="modal1" className={"modal bottom-sheet "+this.state.randomName}>
                    <div className="modal-content">
                        <h4>Password?</h4>
                        <div className="input-field col s10 offset-s1">
                            <i className="material-icons prefix">help_outline</i>
                            <input type="password" id="question"  value={this.state.text} onChange={this.handleText.bind(this)}/>
                            <label htmlFor="question">Enter the password for this quiz</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <a href="#!" className={"modal-action modal-close waves-effect waves-green btn-flat "+this.state.randomName} onClick={this.onComplete.bind(this)}>Submit Password</a>
                    </div>
                </div>
        );
    }
};

export default Modal;
