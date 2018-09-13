var caretRow = 2
var caretPos = 2

var pos = null;

function updateInputBox(newText){
  $( document ).ready(function(){
    if(pos==null)
      pos = 0
    else
      pos = getCaretPos();
    console.log("TEST"+pos);
    notes.innerHTML=newText;
    setCaretPosition(getCaretData(pos));
  });
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
function getCaretPos(){
	var el = notes;
  var caretOffset = 0, sel;
  if (typeof window.getSelection !== "undefined") {
    var range = window.getSelection().getRangeAt(0);
    var selected = range.toString().length;
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(el);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length - selected;
    console.log(caretOffset);
  }
  return caretOffset;
}

function getAllTextnodes(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}

function getCaretData(position){
  var el = notes;
  var node; nodes = getAllTextnodes(el);
  for(var n = 0; n < nodes.length; n++) {
    if (position > nodes[n].nodeValue.length && nodes[n+1]) {
      // remove amount from the position, go to next node
      position -= nodes[n].nodeValue.length;
    } else {
      node = n;
      break;
    }
  }
  // you'll need the node and the position (offset) to set the caret
  return { node: node, position: position };
}
// assume "component" is DOM element
// you may need to modify currentCaretPosition, see "Little Details"    section below

// setting the caret with this info  is also standard
function setCaretPosition(d){
  var sel = window.getSelection(), range = document.createRange();
  range.setStart(getAllTextnodes(notes)[d.node], d.position);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}



$( document ).ready(function(){
  notes.addEventListener("input",function(){
    //when the input field gets edited (doesn't fire when innerText is changed in code)
    //console.log("edit");
    //savedRange = window.getSelection().getRangeAt(0).cloneRange();
    //caretRow = savedRange.startContainer //TODO: FIX THIS
    //caretPos = savedRange.startOffset

    console.log(pos);
    uploadDocDataText(notes.innerHTML);//should check to make sure that its not the same input

  });


});
