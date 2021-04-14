import React from 'react';
import ProjetoFirebase from "../../firebaseservices";
import '../CadastroUsuarioPage/index.css';
import { Redirect } from "react-router-dom";


const db = ProjetoFirebase.firestore();
const usuariosCollection = db.collection('usuarios');
const gruposCollection = db.collection('grupos');



class EditarUsuarioPage extends React.Component {
    componentDidMount() {
       
      const { id } = this.props.match.params;
      this.setState({... this.state, id:id});
      this.getUsuario(id);
      this.renderSelect();
      } 
      
      getUsuario = async(id) => {
        try {   
         const user =  await usuariosCollection.doc(id).get();
         
         
          if (!user.exists) {
           alert('Usuário não encontrado');
          } else {
            this.setState({... this.state,
              nome:user.data().displayName,
              telefone:user.data().phoneNumber,
              photo:user.data().photoURL,
              idGrupo:user.data().grupo?.id,
              tituloGrupo:user.data().grupo?.titulo
            });
            console.log('Document data:', user.data());
          }
        } catch (err) {
          console.log(err);
        }
      }

      renderSelect = async() => {
        try {   
        const snapshot = await gruposCollection.get();
          this.setState({
             grupos: snapshot.docs.map((post) => (
                 <option key={post.id} value={post.id}>{post.data().titulo}</option>
             ))
          });
        } catch (err) {
          console.log(err);
        }
      }
    
      constructor(props) {
        super(props);
        this.state = {
          id:"",
          nome:"",
          telefone:"",
          photo:"",
          idGrupo:"",
          tituloGrupo:"",
          isSucesso : false
        };

        this.handleChangeValaue= this.handleChangeValaue.bind(this);
        this.handleTituloEId= this.handleTituloEId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }
      
      handleChangeValaue(event){
          this.setState ({... this.state, [event.target.name]: event.target.value});
          console.log(this.state);
      }
      
      handleTituloEId(event) {
        var id = event.nativeEvent.target.selectedIndex;
        this.setState ({...this.state,tituloGrupo: event.nativeEvent.target[id].text, idGrupo:event.nativeEvent.target.value});
      }

      handleSubmit(event) {
        event.preventDefault (); 
        usuariosCollection.doc(this.state.id).update({
          displayName:this.state.nome,
          phoneNumber:this.state.telefone,
          photoURL:this.state.photo,
          grupo:{id:this.state.idGrupo, titulo:this.state.tituloGrupo}

        }).then((userRecord) => {
              alert('Usuário alterado com sucesso');
              this.setState ({... this.state, isSucesso: true});
        })
       .catch((error) => {
         console.log('Error creating new user:', error);
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
                    <h1>Editar Usuário</h1>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input name="nome" onChange={this.handleChangeValaue} type="text" className="form-control" value={this.state.nome} id="nome" placeholder="Digite o nome" ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input name="telefone" onChange={this.handleChangeValaue} type="text" className="form-control" value={this.state.telefone} id="telefone" placeholder="Digite o o número de telefone" ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Url da foto</label>
                        <input name="photo" onChange={this.handleChangeValaue} type="text" className="form-control" value={this.state.photo} id="photo" placeholder="Digite a url da foto" ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="idGrupo">Selecione o grupo</label>
                        <select className="form-control" value={this.state.idGrupo} onChange={this.handleTituloEId} id="idGrupo">
                         <option></option>   
                        {
                            this.state.grupos     
                        }
                        </select>

                    </div>
                    <br/>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "5px"}}>Editar</button>
                        <a href='/usuarios/listar' className="btn btn-secondary">Voltar</a>
                    </div>
                </form>
            </div>
        );    
    }

}
export default EditarUsuarioPage;