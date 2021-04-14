import React from 'react';
import ProjetoFirebase from "../../firebaseservices";


const db = ProjetoFirebase.firestore();
const usuariosCollection = db.collection('usuarios');
var autenticacaoPadrao = ProjetoFirebase.auth();



class CadastroGuardiaoPage extends React.Component{    
    constructor(props) {
        super(props);
        this.state = {nome:"", email:"",senha:""};

        this.handleNome= this.handleNome.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.handleSenha = this.handleSenha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }
      handleNome(event) {
        this.setState ({... this.state, nome: event.target.value});
      }
      
      handleEmail(event) {
        this.setState ({... this.state, email: event.target.value});
      }
      handleSenha(event) {
        this.setState ({... this.state, senha: event.target.value});
      }

       handleSubmit(event) {
         event.preventDefault ();
     

        autenticacaoPadrao.createUserWithEmailAndPassword(this.state.email, this.state.senha)
                    .then((userRecord) => {
                      
                      const usuarioAtual = usuariosCollection.doc(userRecord.user.uid);

                      
                      usuarioAtual.update({
                        displayName:this.state.nome
                      })
                      alert('Usuário criado !');
                     
                    })

                .catch(function(error) {
                alert('erro')
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('Senha fraca !');
                } else {
                    alert(errorMessage);
                }
               console.log(error);
                 });

        
        
    }
    render(){

        return(
            <div className="fundo">
                <form onSubmit={this.handleSubmit} type="post" >
                    <h1>Novo Moderador</h1>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input onChange={this.handleNome} type="text" className="form-control" id="nome" placeholder="Digite o nome" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handleEmail} type="email" className="form-control" id="email" placeholder="Digite o email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input onChange={this.handleSenha} type="password" className="form-control" id="senha" placeholder="Digite a senha" required/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary" style={{marginRight: "5px"}}>Cadastrar</button>
                    <a href='/usuarios/listar' className="btn btn-secondary">Voltar</a>
                </form>

            </div>
        );
    }

}
export default CadastroGuardiaoPage;