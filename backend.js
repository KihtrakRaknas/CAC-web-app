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

function upDocData(newVal){//updateLocal
  docData=newVal;
  if(docData==null){
//    console.log("Sorry, no document was found here");//TODO: Create an actual error message on screen
  }else{
    updateInputBox(docData.Content.divs);
    //setCaretToCurPos();//TODO: FIX THIS
  }
}

function uploadDocDataText(newVal){
  console.log("test: "+docData.Content.divs["013791817749278179"]["Timestamp"]);
  for(div of notes.childNodes){
    //docData.Content.divs[div.dataset.uid] = {text:div.innerText, index: parseInt(div.id)};
    console.log("test: "+docData.Content.divs["013791817749278179"]["Timestamp"]);
    console.log(div.dataset.uid +"; Local:"+parseInt(div.dataset.Timestamp)+"; server: "+parseInt(docData.Content.divs[div.dataset.uid]["Timestamp"]));
    if(parseInt(div.dataset.Timestamp)>parseInt(docData.Content.divs[div.dataset.uid]["Timestamp"])){//FINISH
      console.log(" was pushed to the server");
      baseDoc.child("Content").child("divs").child(div.dataset.uid).update({text:div.innerText, index: parseInt(div.id), Timestamp: parseInt(div.dataset.Timestamp)});//DOESN"T WORK YET
    }else{
      console.log("Local copy of "+div.dataset.uid + " is more up to date!");
    }
    //console.log(div.dataset.uid);
  }
//  console.log(docData);
  //docData.Content["Raw Text"] = newVal;
  //updateServer();
}

function updateServer(){
  docData.Content.Timestamp = new Date().getTime();
  baseDoc.update(docData);
}

function updateServerDiv(){

}

function initDoc(DocID){
  baseDoc = base.ref('/Docs/'+DocID);
  baseDoc.on('value', function(snapshot) {
//    console.log(snapshot.val());
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
