import React from 'react';
import ProjetoFirebase from "../../firebaseservices";
import './index.css';
import { Redirect } from "react-router-dom";

const db = ProjetoFirebase.firestore();
const gruposCollection = db.collection('grupos');
const usuariosCollection = db.collection('usuarios');
var autenticacaoPadrao = ProjetoFirebase.auth();



class CadastroUsuarioPage extends React.Component{

    componentDidMount() {
        this.renderSelect();
        
      }
      
      
      renderSelect = async() => {
        try {   
        const snapshot = await gruposCollection.get();
          this.setState({
             grupos: snapshot.docs.map((post) => (
                 <option value={post.id}>{post.data().titulo}</option>
             ))
          });
        } catch (err) {
          console.log(err);
        }
      }
    
    constructor(props) {
        super(props);
        this.state = {nome:"", email:"",senha:"",id:"", titulo:"", grupos:"",isSucesso:false};

        this.handleNome= this.handleNome.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.handleSenha = this.handleSenha.bind(this);
        this.handleTituloEId = this.handleTituloEId.bind(this);
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

      handleTituloEId(event) {
        var id = event.nativeEvent.target.selectedIndex;
        this.setState ({ titulo: event.nativeEvent.target[id].text, id:event.nativeEvent.target.value});
      }
       handleSubmit(event) {
         event.preventDefault ();
     

        autenticacaoPadrao.createUserWithEmailAndPassword(this.state.email, this.state.senha)
                    .then((userRecord) => {
                      
                      const usuarioAtual = usuariosCollection.doc(userRecord.user.uid);
                      usuarioAtual.update({
                        //displayname:this.state.nome,
                        grupo:{id:this.state.id, titulo:this.state.titulo}
                      })

                      usuarioAtual.update({
                        displayName:this.state.nome
                        //grupo:{id:this.state.id, titulo:this.state.titulo}
                      })

                      alert('Usuário criado !');
                      this.setState ({... this.state, isSucesso: true});
                     
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
      if (this.state.isSucesso) {
        return (
          <Redirect to='/usuarios/listar'></Redirect>
        );
    }

        return(
            <div className="fundo">
                <form onSubmit={this.handleSubmit} type="post" >
                    <h1>Novo Usuário</h1>
                    <div className="form-group">
                        <label for="nome">Nome</label>
                        <input onChange={this.handleNome} type="text" className="form-control" id="nome" placeholder="Digite o nome" required/>
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input onChange={this.handleEmail} type="email" className="form-control" id="email" placeholder="Digite o email" required/>
                    </div>
                    <div className="form-group">
                        <label for="senha">Senha</label>
                        <input onChange={this.handleSenha} type="password" className="form-control" id="senha" placeholder="Digite a senha" required/>
                    </div>
                    <div className="form-group">
                        <label for="idGrupo">Selecione o grupo</label>
                        <select className="form-control" onChange={this.handleTituloEId} id="idGrupo">
                         <option></option>   
                        {
                            this.state.grupos     
                        }
                        </select>

                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary" style={{marginRight: "5px"}}>Cadastrar</button>
                    <a href='/usuarios/listar' className="btn btn-secondary">Voltar</a>
                </form>

            </div>
        );
    }

}
export default CadastroUsuarioPage;