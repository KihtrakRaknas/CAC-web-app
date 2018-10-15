class InfoType{
	constructor(name, keyword, style){ //Style is a function
		this.name = name;
		this.keyword = keyword;
		this.style = style;
	}
}

//I created this class now thinking I'd use it, but it turns out we don't need it now
//Though it might be modified and used later for games
class InfoObject{
	constructor(infoType, i1, i2){
		this.type = infoType;
		this.infoOne = i1;
		this.infoTwo = i2;
	}
}


let defaultType = new InfoType("default", "", (line)=>{
	line.style.fontFamily = "Arial";
	line.style.fontSize = "18px";
	line.style.border = "none";
	line.style.color = "black";
	line.style.textDecoration = "none";
	line.style.fontWeight = "normal";
});
let equation = new InfoType("equation", "=", (line)=>{
	line.style.fontFamily = "monospace";
	line.style.fontSize = "32px";
	line.style.border = "1px solid";
	line.style.color = "red";
});
let definition = new InfoType("definition", " is ", (line)=>{
	line.style.textDecoration = "underline";
	line.style.color = "blue";
});
let causal = new InfoType("causal", " because ", (line)=>{
	line.style.fontWeight="bold";
	line.style.color = "green";
});

let infoTypes = [equation, definition, causal];
let usedIDs = [];

function getType(line){
	for(let infotype of infoTypes){
		if(line.indexOf(infotype.keyword) >= 0){
			return infotype;
		}
	}
	return defaultType;
}
let checkedTypes = []; 
let checks = document.querySelectorAll('[type="checkbox"]');
for(let box of checks){
    box.onchange = ()=>{
        if(box.checked === true){
            checkedTypes.push(box.id);
        } else {
            checkedTypes.splice(checkedTypes.indexOf(box.id), 1);
        }
		console.log(checkedTypes);
		if(checkedTypes.length > 0){
			filterData(...checkedTypes);
		} else {
			restore();
		}
    }
}
//////////////////////////////
notes.onkeydown = (event)=>{
	let key = event.which || event.charCode;
	if(key === 13){
			console.log(getCaretPos());
		if(getCaretPos().offset === 0){
			notes.childNodes[getCaretPos().rowID].dataset.uid = id();
		}
	}
//	notes.childNodes[getCaretPos().rowID].dataset.Timestamp = Date.now();
}
//////////////////////////////
function parseText(box){
  let lines = box.innerText.trim().split("\n");
  types = lines.map((line)=>getType(line));
  let inhtml = "";
//  labels.innerText = "";
//  defaultType.style(labels);
	var usedindexs = [];
  for(let i=0;i<box.childNodes.length;i++){
		let div = box.childNodes[i];
		let type =  getType(div.innerText)
		div.className = type.name;
		div.id = i;

		if(usedindexs.indexOf(div.dataset.index)!=-1)
			div.dataset.index = i
		usedindexs.push(div.dataset.index)
	//	prevPos.rowID = pos.rowID;
  //  prevPos.offset = pos.offset;
  //  pos = getCaretPos();
	//	console.log(i);

		if(!div.dataset.uid){
			div.dataset.uid = id();
		} else if( i > 0 && (box.childNodes[i-1].dataset.uid === div.dataset.uid) ){
			console.log(box.childNodes[i-1].dataset.uid);
			console.log(div.dataset.uid);
			div.dataset.uid = id();
			console.log("Prev Pos", pos, "activated");
		//	console.log(div.dataset.uid);
		}
		div.tabIndex = 0;
		for(let div of notes.childNodes){
	        //console.log("1");
		    div.tabIndex = 0;
			div.onfocus = ()=>{
				console.log(document.activeElement, "focus!")
				focusedElement = document.activeElement;
			}
		}
		type.style(div);
//		let lDiv = document.createElement("div");
//		lDiv.innerText = type.name==="default"?"\n":type.name
//		type.style(lDiv);
//		lDiv.style.textAlign = "center";
//		labels.appendChild(lDiv);
  }
  //box.innerHTML = inhtml;
	console.log("TEST PARSE IS DONE");
  return types;
}

function parseData(){
	let parsedData = [];
	for(let note of notes.childNodes){
		if(note.className !== "default"){
			let str = note.innerText
			let keyword = infoTypes[infoTypes.indexOf(getType(note.innerText))].keyword;
			let info = str.split(keyword);
			parsedData.push(new InfoObject(note.className, info[0], info[1]));
		}
	}
	return parsedData;
}

function filterData(){
	restore();
	for(let note of notes.childNodes){
		if(Array.from(arguments).indexOf(note.className) === -1){
			note.style.display = "none";
		}
	}
}

function restore(){
	for(let note of notes.childNodes){
		note.style.display = "block";
	}
}

function id(){
	let rand;
	do{
		rand = Math.random().toString().substring(2);
	}while(usedIDs.indexOf(rand) > -1);
	usedIDs.push(rand);
	return rand;
}
