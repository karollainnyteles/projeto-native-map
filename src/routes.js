import React from 'react'
import {BrowserRouter,Switch, Link, Redirect,Route} from 'react-router-dom'
import Dashboard from "./pages/dashboard";
import CadastroGrupoPage from './pages/CadastroGrupoPage/index'
import LoginPage from './pages/LoginPage/index'
import CadastroUsuarioPage from './pages/CadastroUsuarioPage/index'
import EditarUsuarioPage from './pages/EditarUsuarioPage/index'
import ExcluirUsuarioPage from './pages/ExcluirUsuarioPage/index'
import ApresentaGuardiao from './pages/ApresentaGuardiao/index'
import CadastroEspeciePage from './pages/CadastroEspeciePage/index'
import CadastroGuardiaoPage from './pages/CadastroGuardiaoPage/index'
import CadastroModeradorPage from './pages/CadastroModeradorPage/index'
import ApresentaModeradoresPage from './pages/ApresentaModeradoresPage/index'
import CadastroPatentePage from './pages/CadastroPatentePage/index'


import ProjetoFirebase from "./firebaseservices";
import ListarUsuarioPage from './pages/ListarUsuarioPage';
var autenticacaoPadrao = ProjetoFirebase.auth();

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
          
      />
    )
  }
  
  function NotAuthedRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === false
          ? <Component {...props} />
          : <Redirect to='/' />}
      />
    )
  }
  

class Routes extends React.Component{
    state = {
        authed: false,
        loading: true,
      }

      componentDidMount () {
        this.removeListener = autenticacaoPadrao.onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              authed: true,
              loading: false,
            })
          } else {
            this.setState({
              authed: false,
              loading: false
            })
          }
        })
      }
      componentWillUnmount () {
    this.removeListener()
  }






    render(){   
            return this.state.loading === true ? <h1>Loading</h1> : (
                <BrowserRouter>
                    <Switch>
                      {/*  <Route path="/login" component={Login} ></Route>
                        <Route path="/dashboard" component={Dashboard} ></Route> */}
                        <NotAuthedRoute authed={this.state.authed} path='/login' component={LoginPage}/>
                        <PrivateRoute authed={this.state.authed} path='/grupos/criar' component={CadastroGrupoPage}/>
                        <PrivateRoute authed={this.state.authed} path='/usuarios/criar' component={CadastroUsuarioPage}/>
                        <PrivateRoute authed={this.state.authed} path='/usuarios/editar/:id' component={EditarUsuarioPage}/>
                        <PrivateRoute authed={this.state.authed} path='/usuarios/listar' component={ListarUsuarioPage}/>
                        <PrivateRoute authed={this.state.authed} path='/usuarios/excluir/:id' component={ ExcluirUsuarioPage}/>
                        <PrivateRoute authed={this.state.authed} path='/guardiao/apresenta' component={ApresentaGuardiao}/>
                        <PrivateRoute authed={this.state.authed} path='/especies/criar/' component={ CadastroEspeciePage}/>
                        <PrivateRoute authed={this.state.authed} path='/guardioes/criar/' component={ CadastroGuardiaoPage}/>
                        <PrivateRoute authed={this.state.authed} path='/moderadores/criar/' component={ CadastroModeradorPage}/>
                        <PrivateRoute authed={this.state.authed} path='/moderadores/apresentar/' component={ ApresentaModeradoresPage}/>
                        <PrivateRoute authed={this.state.authed} path='/patentes/cadastrar' component={ CadastroPatentePage}/>
                        

                        <PrivateRoute authed={this.state.authed} path='/' component={Dashboard} />
                        <Route render={() => <h3>No Match</h3>} />


                    </Switch>
                </BrowserRouter>
            );
    }
}
export default Routes;
