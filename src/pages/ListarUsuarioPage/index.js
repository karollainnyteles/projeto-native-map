import React from 'react';
import ProjetoFirebase from "../../firebaseservices";
 import '../CadastroGrupoPage/index.css';

const db = ProjetoFirebase.firestore();
const usuariosCollection = db.collection("usuarios");
class ListarUsuarioPage extends React.Component {
    
    componentDidMount() {

        usuariosCollection.onSnapshot((users)=>{
          console.log(users.docs);
          this.setState({usuarios:users.docs});
          });
      }
      
      deletarUsuario = (id, name)=>{
    if(window.confirm("Deseja realmente deletar esse usuário: "+name+"?")){
          usuariosCollection.doc(id).delete().then(ret=>{
            alert("Usuário excluído com sucesso");
            
          }).catch(err=>{
            console.log(err);
          });
        }
      }

      
    
    constructor(props) {
        super(props);
        this.state = {
        usuarios:[],
        isSucesso:false
        };
      }
      


    render(){
     

    return(
      
        <div className="fundo">
            <a href='/usuarios/criar' className='btn btn-primary btn-lg'>Novo Usuário</a>
           <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Grupo</th>
                    <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.state.usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.data().displayName}</td>
                    <td>{u.data().email}</td>
                    <td>{u.data().grupo?.titulo}</td>
                    <td>
                        <a href={"/usuarios/editar/"+u.id } className='btn btn-warning btn-sm'>Editar</a>
                        |
                        <button onClick={()=>this.deletarUsuario(u.id, u.data().displayName)} className='btn btn-danger btn-sm'>Excluir</button>
                    </td>
                </tr>
             ))}
                </tbody>
                </table>
         </div>
        

      
    );
    }
}
export default ListarUsuarioPage;