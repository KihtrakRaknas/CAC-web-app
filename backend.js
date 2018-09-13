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
var baseDoc = null;

var docData = null;

initDoc("(DocID)");

//exitDoc("(DocID)");

function upDocData(newVal){
  docData=newVal;
  if(docData==null){
    console.log("Sorry, no document was found here");//TODO: Create an actual error message on screen
  }else{
    updateInputBox(docData.Content["Raw Text"]);
    setCaretToCurPos();
  }
}

function uploadDocDataText(newVal){
  docData.Content["Raw Text"] = newVal;
  updateServer();
}

function updateServer(){
  baseDoc.update(docData);
}

function initDoc(DocID){
  baseDoc = base.ref('/Docs/'+DocID);
  baseDoc.on('value', function(snapshot) {
    console.log(snapshot.val());
    upDocData(snapshot.val());
  });
}


function exitDoc(DocID){
  upDocData(null);

  baseDoc.off(/*'value', function(snapshot) {
    console.log(snapshot.val());
    docData = snapshot.val();
  }*/);
  baseDoc=null
}

function read(){

}

var patato = read();
