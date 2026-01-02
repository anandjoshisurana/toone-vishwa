document.querySelector(".board").onclick=()=>{
  alert("📋 WHITEBOARD\n\nTOONE VISHWA");
};

document.querySelector(".teacher").onclick=()=>{
  alert("👩‍🏫 Teacher:\nGood Morning Students!");
};

document.querySelector(".students").onclick=()=>{
  alert("👦👧 Students:\nAll students are present.");
};

document.getElementById("settings").onclick=()=>{
  alert("⚙️ Settings (demo)");
};

document.getElementById("record").onclick=()=>{
  alert("🎥 Recording started (demo)");
};

document.getElementById("add").onclick=()=>{
  alert("➕ New student added (demo)");
};

document.getElementById("exit").onclick=()=>{
  if(confirm("Exit classroom?")){
    alert("Exited classroom");
  }
};
