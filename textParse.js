class InfoType{
	constructor(name, keyword, style){ //Style is a function
		this.name = name;
		this.keyword = keyword;
		this.style = style;
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

function getType(line){
	for(let infotype of infoTypes){
		if(line.indexOf(infotype.keyword) >= 0){
			return infotype;
		}
	}
	return defaultType;
}

function parseText(box){
  let lines = box.innerText.trim().split("\n");
  types = lines.map((line)=>getType(line));
  let inhtml = "";
  for(let i=0;i<box.childNodes.length;i++){
	let div = box.childNodes[i];
	let type =  getType(div.innerText)
	div.className = type.name;
	div.id = i;
	type.style(div);
  }
  //box.innerHTML = inhtml;
  return types;
}
