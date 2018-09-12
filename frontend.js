function updateInputBox(newText){
  notes.innerText=newText;
}

$( document ).ready(function(){
  //DOESNT WORK; TODO: NEEDto call function when text edited
  $( "#content" ).change(function(){
    //upDocDataText(notes.innerText);
    console.log("TEST");
  });





});
