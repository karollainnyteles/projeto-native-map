import React from "react";
import ProjetoFirebase from "../../firebaseservices";
import './index.css'

var autenticacaoPadrao = ProjetoFirebase.auth()

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email:"",password:""};
    
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }

      handleEmail(event) {
        this.setState({email: event.target.value});
      }
      handlePassword(event) {
        this.setState({password: event.target.value});
      }
    
      handleSubmit(event) {
            //alert(this.state.email);
            //alert(this.state.password);
            autenticacaoPadrao.signInWithEmailAndPassword(this.state.email,this.state.password).then((user) => {
                // Signed in
                // ...
                //alert("sucesso");
                //alert(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                alert(errorCode);
            });
            event.preventDefault();
            //event.stopPropagation();
      }
    
      render(){
    return(
        <div className="wrapper fadeInDown">
        <div id="formContent">

          <h2 className="active"> Seja bem vindo </h2>
      
        {/*
          <div className="fadeIn first">
            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
          </div>
      */}
         
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleEmail} type="text" id="login" className="fadeIn second" name="login" placeholder="Email"/>
            <input onChange={this.handlePassword} type="password" id="password" className="fadeIn third" name="login" placeholder="Senha"/>
            <input type="submit" className="fadeIn fourth" value="Log In"/>
          </form>
      
        
          <div id="formFooter">
            <a className="underlineHover" href="#">Esqueceu sua senha?</a>
          </div>
      
        </div>
      </div>
        
        );
    }
}

export default LoginPage;