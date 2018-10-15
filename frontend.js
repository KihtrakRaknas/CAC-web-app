var caretRow = 2
var caretPos = 2

var prevPos = {rowID: 0, offset: 0};
var pos = {rowID: 0, offset: 0};

let oldDoc = null;
let focusedElement = notes;

class Timer{
	constructor(time){
		this.time = time;
		this.delay = time;
		this.s = null;
	}

	update(){
		this.time--;
		if(this.time <= 0){
			clearInterval(this.s);
		}
	}

	start(){
		this.s = setInterval(this.update, 1000/30);
	}

}

function updateInputBox(newDivs){
  $( document ).ready(function(){
    //parseText(notes);
    prevPos.rowID = pos.rowID;
    prevPos.offset = pos.offset;
    pos = getCaretPos();
//    console.log(newDivs);
    //console.log(pos);
    //notes.innerHTML="";
    var newDiv = false;
    for(div in newDivs){
      var found = false;
      for(var nod of notes.childNodes){
        if(div == nod.dataset.uid){
          found = true;
          if(nod.innerText!=newDivs[div].text){
            nod.innerText=newDivs[div].text;
            nod.dataset.Timestamp = newDivs[div].Timestamp;
            nod.dataset.index = newDivs[div].index;
            console.log("TIMESTAMP");
          }
          break;
        }
      }
      if(!found){
        var pat = document.createElement("div");
        pat.innerText = newDivs[div].text;
        pat.dataset.uid = div;
        pat.dataset.Timestamp = newDivs[div].Timestamp;
        pat.dataset.index = newDivs[div].index;
        console.log("ADDED "+pat);
        newDiv = true;
        notes.appendChild(pat);
      }
    }
    for(var nod of notes.childNodes){
      var found = false;
      for(div in newDivs){
        if(nod.dataset.uid==div){
          found = true;
        }
      }
      if(!found){
        console.log("REMOVED "+nod);
        nod.remove();
      }
    }

		if(newDiv){//REORDER based on index if new div is present
        var newNotesNode = Array.from(notes.childNodes).slice(0);
				for (var i = 0; i < newNotesNode.length; i++) {
			    var value = parseInt(newNotesNode[i].dataset.index);
          var temp = newNotesNode[i];
			    for (var j = i - 1; j > -1 && parseInt(newNotesNode[j].dataset.index) > value; j--) {
			      newNotesNode[j + 1] = newNotesNode[j];
			    }
			    newNotesNode[j + 1] = temp;
			  }
        var newNotes = "";
        for(addNode of newNotesNode){
          newNotes += addNode.outerHTML;
          console.log(addNode);
        }
        notes.innerHTML = newNotes;
		}
    setCaretPosition(pos);
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
	/*var el = notes;
  var caretOffset = 0, sel;
  if (typeof window.getSelection !== "undefined") {
    var range = window.getSelection().getRangeAt(0);
    var selected = range.toString().length;
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(el);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length - selected;
    console.log(caretOffset);
  }*/
  if (window.getSelection().type!="None"){
    //console.log(window.getSelection().getRangeAt(0).startContainer.id+1);
    if(isNaN(parseInt(window.getSelection().getRangeAt(0).startContainer.parentElement.id))){//Needed when creating an empty new line
      //console.log("PARENT NOT #");
      //console.log(window.getSelection().getRangeAt(0));
      return {rowID: parseInt(window.getSelection().getRangeAt(0).startContainer.id),offset: window.getSelection().getRangeAt(0).startOffset};
    }
    return {rowID: parseInt(window.getSelection().getRangeAt(0).startContainer.parentElement.id),offset: window.getSelection().getRangeAt(0).startOffset};

  }
  return {rowID: 0,offset: 0};

}

function getAllTextnodes(){
  /*
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  //return a;*/
  return notes.childNodes;
}
//notes.childNodes
function getCaretData(position){
  var el = notes;
  var node; nodes = getAllTextnodes(el);
  for(var n = 0; n < nodes.length; n++) {
    if (position > nodes[n].innerText.length && nodes[n+1]) {
      // remove amount from the position, go to next node
      position -= nodes[n].innerText.length;
    } else {
      node = n;
    //  console.log(n)
  //    console.log("pos"+position)
      break;
    }
  }
  // you'll need the node and the position (offset) to set the caret
  return { node: node, position: position };
}
// assume "component" is DOM element
// you may need to modify currentCaretPosition, see "Little Details"    section below

// setting the caret with this info  is also standard
var expect = null;
function setCaretPosition(d){/*
  var sel = window.getSelection(), range = document.createRange();
  console.log(getAllTextnodes(notes));
  range.setStart(getAllTextnodes(notes)[d.node].childNodes[0], d.position);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);*/
  var sel = window.getSelection(), range = document.createRange();
//  console.log(d);
  //console.log(getAllTextnodes(notes));
  //console.log(getAllTextnodes(notes)[d.rowID]);
//  console.log(getAllTextnodes(notes)[d.rowID].childNodes[0].length);
  if(getAllTextnodes(notes)[d.rowID].childNodes[0].length<d.offset){//The Node doesn't have enough charecters to recreate the cursor's location
//    console.log(getAllTextnodes(notes)[d.rowID].childNodes[0].length-d.offset);
  //  if(d.offset-getAllTextnodes(notes)[d.rowID].childNodes[0].length>1)
    //  alert("Our Systems have detected button mashing");
    expect = d.offset;
    d.offset = getAllTextnodes(notes)[d.rowID].childNodes[0].length;
  }else if(expect!=null){
    d.offset = expect;
    expect = null;
  }
  range.setStart(getAllTextnodes(notes)[d.rowID].childNodes[0], d.offset);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  //getAllTextnodes(notes)[d.rowID].tabIndex = -1;
  //getAllTextnodes(notes)[d.rowID].focus();
}

var lastLocalTimestamp = 0;

$( document ).ready(function(){
  notes.addEventListener("input",function(){
    parseText(notes);
	console.log(focusedElement);
	focusedElement.dataset.Timestamp = Date.now();
	console.log(focusedElement, focusedElement.dataset.Timestamp);
    uploadDocDataText(notes.innerHTML);
  });

});

let trackCursor = setInterval(()=>{pos = getCaretPos()}, 1000/60);
