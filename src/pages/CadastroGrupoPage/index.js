import React from 'react';
import ProjetoFirebase from "../../firebaseservices";
import './index.css';






const db = ProjetoFirebase.firestore();

// var ids=[]
// var teste=0;
// function numero_aleatorio() {
//     while (teste=0) {
//         var aleatorio = Math.floor(Math.random() * 100);

//         if (ids.indexOf(aleatorio) == -1)
//             ids.push(aleatorio);
//             teste=1;

//     }
//     return aleatorio;
// }

class CadastroGrupoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {titulo:"",descricao:""};
    
        this.handleTitulo= this.handleTitulo.bind(this);
        this.handleDescricao = this.handleDescricao.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }
      
      
      handleTitulo(event) {
        this.setState ({... this.state, titulo: event.target.value});
      }
      handleDescricao(event) {
        this.setState ({... this.state, descricao: event.target.value});
      }
      handleSubmit(event) {
        event.preventDefault ();
         this.handleTitulo(event);
         this.handleDescricao(event);
        
        db.collection('grupos').add({
            titulo: this.state.titulo,
            descricao:this.state.descricao,
            criado_em: new Date(),
            editado_em: new Date(),
        }).then(() =>{ 
            alert('grupo criado')
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            alert(errorCode);

      })
        
  }


    render(){


    return(
        <div class="fundo">
            <form onSubmit={this.handleSubmit} type="post" >
                <h1>Novo Grupo</h1>
                <div className="form-group">
                    <label for="tittle">Título</label>
                    <input onChange={this.handleTitulo} type="text" class="form-control" id="tittle" placeholder="Digite o título" required/>
                </div>
                <div class="form-group">
                    <label for="description">Descrição</label>
                    <textarea onChange={this.handleDescricao} className="form-control" id="description" placeholder="Digite a descrição" rows="3" required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary" style={{marginRight: "5px"}}>Cadastrar</button>
                <a href='/' className="btn btn-secondary">Voltar</a>
              
            </form>
         </div>
        

      
    );
    }
}
export default CadastroGrupoPage;