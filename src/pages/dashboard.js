import ProjetoFirebase from "../firebaseservices"
var autenticacaoPadrao= ProjetoFirebase.auth();
function Dashboard() {
    return(
        <div>
        <h1>Dashboard</h1>
        <button onClick={()=>{autenticacaoPadrao.signOut()}}>Singout</button>
        </div>
    );
}

export default Dashboard;