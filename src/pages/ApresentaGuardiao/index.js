import React from 'react';
import ProjetoFirebase from "../../firebaseservices";
import '../CadastroGrupoPage/index.css';
import './index.css'
import './bootstrap.min.css'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const db = ProjetoFirebase.firestore();
const usuariosCollection = db.collection("usuarios");
class ApresentaGuardiao extends React.Component {
    
    componentDidMount() {

        usuariosCollection.onSnapshot((users)=>{
          console.log(users.docs);
          this.setState({guardioes:users.docs});
          });
      }
          
    constructor(props) {
        super(props);
        this.state = {
        guardioes:[]
        };
      }
      


    render(){
     

    return(
        <div className="page-content page-container" id="page-content">
        <div className="padding">
            <div className="row">
                <div className="col-sm-6">
                    <div className="list list-row block">
                    {
                    this.state.guardioes.map((guardiao) => (
                        
                        <div className="list-item" data-id="19">
                             <If condition={guardiao.data().photoURL!='null'}>
                                <Then>
                                    <div><a href="#" data-abc="true"><span className="w-48 avatar gd-primary"><img src={guardiao.data().photoURL} alt="."></img> </span></a></div>
                                </Then>
                                <Else >
                                    <div><a href="#" data-abc="true"><span className="w-48 avatar gd-warning">S</span></a></div>
                                </Else>
                                     
                            </If>
                            <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">{guardiao.data().displayName}</a>
                                <div className="item-except text-muted text-sm h-1x">{guardiao.data().email}</div>
                            </div>
                        </div>
                 
             ))}



                        
                    </div>
                </div>
            </div>
        </div>
    </div>

      
    );
    }
}
export default ApresentaGuardiao;