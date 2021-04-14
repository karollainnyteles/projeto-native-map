import React from 'react';
import ProjetoFirebase from "../../firebaseservices";
import '../CadastroUsuarioPage/index.css';
import { Redirect } from "react-router-dom";


const db = ProjetoFirebase.firestore();
const especiesCollection = db.collection("especies");


class CadastroEspeciePage extends React.Component {
      verificaNome = (nomeC)=>{
            let resultado=  especiesCollection.where("nomeCientifico","==",nomeC);
            resultado.get().then(snapshot => {
              if (snapshot.empty) {
                this.cadastra();
              }else{
                alert("Esse nome científico já está cadastrado!");
              }
              
        });
            
      }

      cadastra = ()=>{
        especiesCollection.add({
                  nomeCientifico: this.state.nomeCientifico,
                  nomePopular:this.state.nomePopular,
                  
              }).then(() =>{ 
                  alert('Espécie cadastrada com sucesso!');
                  
              }).catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert(errorMessage);
                  alert(errorCode);
            })
         
        };
      
    constructor(props) {
        super(props);
        this.state = {
        nomeCientifico:"",
        nomePopular:"",
        
      };
    
        this.handleNomeCientifico= this.handleNomeCientifico.bind(this);
        this.handleNomePopular = this.handleNomePopular.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }
      
      
      handleNomeCientifico(event) {
       
        this.setState ({... this.state, nomeCientifico: event.target.value});
        
      }
      handleNomePopular(event) {
        this.setState ({... this.state, nomePopular: event.target.value});
        
      }
      handleSubmit(event) {
        event.preventDefault ();
        this.verificaNome(this.state.nomeCientifico);    
  }


    render(){
      

    return(
       
        <div className="fundo">
            <form onSubmit={this.handleSubmit} type="post" >
                <h1>Nova Espécie</h1>
                <div className="form-group">
                    <label htmlFor="nomeCientifico">Nome Científico</label>
                    <input onChange={this.handleNomeCientifico} type="text" className="form-control" id="nomeCientifico" placeholder="Digite o nome científico" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="nomePopular">Nome Popular</label>
                    <input onChange={this.handleNomePopular} type="text"className="form-control" id="nomePopular" placeholder="Digite nome o popular"  required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary" style={{marginRight: "5px"}}>Cadastrar</button>
                <a href='/' className="btn btn-secondary">Voltar</a>
              
            </form>
         </div>
        

      
    );
    }
}
export default CadastroEspeciePage;