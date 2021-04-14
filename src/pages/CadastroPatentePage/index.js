import React from 'react';
import ProjetoFirebase from "../../firebaseservices";
import '../CadastroUsuarioPage/index.css';



const db = ProjetoFirebase.firestore();
const patentesCollection = db.collection('patentes');



class CadastroPatentePage extends React.Component{    
    constructor(props) {
        super(props);
        this.state = {nome:"",nivel:""};

        this.handleNome= this.handleNome.bind(this);
        this.handleNivel= this.handleNivel.bind(this);
       
        this.handleSubmit = this.handleSubmit.bind(this);

      }
      handleNome(event) {
        this.setState ({... this.state, nome: event.target.value});
      }
      handleNivel(event) {
        this.setState ({... this.state, nivel: event.target.value});
      }
      

       handleSubmit(event) {
         event.preventDefault ();
     
         patentesCollection.add({
            nome: this.state.nome,
            nivel:this.state.nivel
        }).then(() =>{ 
            alert('patente criada')
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            alert(errorCode);

      })
        
        
        
    }
    render(){

        return(
            <div className="fundo">
                <form onSubmit={this.handleSubmit} type="post" >
                    <h1>Nova Patente</h1>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input onChange={this.handleNome} type="text" className="form-control" id="nome" placeholder="Digite o nome" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nivel">Nível</label>
                        <input onChange={this.handleNivel} type="number" className="form-control" id="nivel" placeholder="Digite o nível" required/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary" style={{marginRight: "5px"}}>Cadastrar</button>
                    <a href='/usuarios/listar' className="btn btn-secondary">Voltar</a>
                </form>

            </div>
        );
    }

}
export default CadastroPatentePage;