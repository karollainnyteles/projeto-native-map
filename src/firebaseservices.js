import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
/* AMBIENTE DE TESTES
var firebaseConfig = {
    apiKey: "AIzaSyCT4rvksAxXUgDG7iKLo95g8WOZkXNnFuY",
    authDomain: "mapeamento-d5341.firebaseapp.com",
    projectId: "mapeamento-d5341",
    storageBucket: "mapeamento-d5341.appspot.com",
    messagingSenderId: "307782834016",
    appId: "1:307782834016:web:9b512bb7933b9526df3005",
    measurementId: "G-F70TE5B45Y"
  };
 */
const firebaseConfig = {
  apiKey: "AIzaSyAVzskhGjVJWzHk_V28kKuOVIIcS4XW5rE",
  authDomain: "nativemapp.firebaseapp.com",
  projectId: "nativemapp",
  storageBucket: "nativemapp.appspot.com",
  messagingSenderId: "332363024710",
  appId: "1:332363024710:web:84a0023afd7242e2dabd47",
  measurementId: "G-13XJECQJCH"
};



  var ProjetoFirebase = firebase.initializeApp(firebaseConfig);

  
  //console.log("Você está no projeto: " + ProjetoFirebase.name);

  //var armazenamentoPadrao = firebase.storage();
  //var databasePadrao = ProjetoFirebase.firestore();
  //var autenticacaoPadrao = firebase.auth();
  //var autenticacaopirata = ProjetoFirebase.auth();
  
  //console.log("==========abaixo temos o firebase auth==========");
  //console.log(autenticacaoPadrao);
  //console.log("==========abaixo temos o projeto.authh==========");
  //console.log(autenticacaopirata);
  //autenticacaoPadrao.createUserWithEmailAndPassword("principalo@gmail.com","Slaker167");


  export default ProjetoFirebase;