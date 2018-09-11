var config = {
  apiKey: "AIzaSyBgTk4vbqSgP2s8Rqub2Ls3NqVA3rSraHY",
  authDomain: "cac-web-app.firebaseapp.com",
  databaseURL: "https://cac-web-app.firebaseio.com",
  projectId: "cac-web-app",
  storageBucket: "cac-web-app.appspot.com",
  messagingSenderId: "398640011671"
};
firebase.initializeApp(config);

var base = firebase.database();

var docData = null;

initDoc("(DocID)");

exitDoc("(DocID)");

function upDocData(newVal){
  docData=newVal;

}

function initDoc(DocID){
  base.ref('/Docs/'+DocID).on('value', function(snapshot) {
    console.log(snapshot.val());
    docData = snapshot.val();
  });
}


function exitDoc(DocID){
  docData = null;
  base.ref('/Docs/'+DocID).off(/*'value', function(snapshot) {
    console.log(snapshot.val());
    docData = snapshot.val();
  }*/);
}

function read(){

}

var patato = read();
