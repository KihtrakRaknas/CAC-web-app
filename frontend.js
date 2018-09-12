function updateInputBox(newText){
  notes.innerText=newText;
}

$( document ).ready(function(){
  notes.addEventListener("input",function(){
    //when the input field gets edited
    console.log("edit");
    upDocDataText(notes.innerText);//should check to make sure that its not the same input
  });





});
