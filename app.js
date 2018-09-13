let notes = document.getElementById("content");

let updater = setInterval(()=>{
  //notes.innerHTML = segmentText(notes.innerText);
  console.log(parseText(notes));
}, 100);
