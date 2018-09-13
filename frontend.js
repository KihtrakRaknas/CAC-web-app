var caretRow = 2
var caretPos = 2

function updateInputBox(newText){
  notes.innerText=newText;
}

function setCaretToPos(row,pos) {
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStart(notes.childNodes[row], pos);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

function setCaretToCurPos() {
  setCaretToPos(caretRow,caretPos)
}

$( document ).ready(function(){
  notes.addEventListener("input",function(){
    //when the input field gets edited (doesn't fire when innerText is changed in code)
    //console.log("edit");
    savedRange = window.getSelection().getRangeAt(0).cloneRange();
    caretRow = savedRange.startContainer //TODO: FIX THIS
    caretPos = savedRange.startOffset

    uploadDocDataText(notes.innerText);//should check to make sure that its not the same input
  });





});
