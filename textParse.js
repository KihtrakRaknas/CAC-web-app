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
	constructor(HTMLElement, infoType){
		this.html = HTMLElement;
		this.info = HTMLElement.innerText;
		this.type = infoType;
		this.id = id();
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

//////////////////////////////
notes.onkeydown = (event)=>{
	let key = event.which || event.charCode;
	if(key === 13){
			console.log(getCaretPos());
		if(getCaretPos().offset === 0){
			notes.childNodes[getCaretPos().rowID].dataset.uid = id();
		}
	}
}
//////////////////////////////
function parseText(box){
  let lines = box.innerText.trim().split("\n");
  types = lines.map((line)=>getType(line));
  let inhtml = "";
  labels.innerText = "";
  defaultType.style(labels);
  for(let i=0;i<box.childNodes.length;i++){
		let div = box.childNodes[i];
		let type =  getType(div.innerText)
		div.className = type.name;
		div.id = i;
		
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

		type.style(div);
		let lDiv = document.createElement("div");
		lDiv.innerText = type.name==="default"?"\n":type.name
		type.style(lDiv);
		lDiv.style.textAlign = "center";
		labels.appendChild(lDiv);
  }
  //box.innerHTML = inhtml;

  return types;
}

function id(){
	let rand;
	do{
		rand = Math.random().toString().substring(2);
	}while(usedIDs.indexOf(rand) > -1);
	usedIDs.push(rand);
	return rand;
}
