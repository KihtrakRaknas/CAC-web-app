//THis is a file
function segmentText(text){
//  console.log(text);
  let lines = text.split("\n");
  spans = lines.map( (line)=>{
    let span1 = "", span2 = "";
    if(line.indexOf("<span class='true'>") < 0){
      span1 = "<span class='true'>";
      span2 = "</span>";
    }
    return span1+line+span2;
  })
  return spans.join("\n");
}

function getType(line){
  line = line.substring(line.indexOf('>')+1);
  let keywords = ["=", "is", "because"];
  let types = ["equation", "definition", "causal"];
  for(let i=0;i<keywords.length;i++){
    if(line.indexOf(keywords[i]) >= 0){
      return types[i];
    }
  }
  return "default";
}

function parseText(text){
  let lines = text.split("\n");
  types = lines.map((line)=>getType(line));
  return types;
}
