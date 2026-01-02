// ===== HOTSPOT ACTIONS =====
document.querySelector(".hotspot.board").onclick = () => {
  alert("Whiteboard:\nTOONE VISHWA\nWelcome to the Classroom!");
};

document.querySelector(".hotspot.teacher").onclick = () => {
  alert("Teacher:\nHello Students 👩‍🏫");
};

document.querySelector(".hotspot.students").onclick = () => {
  alert("Students:\nAll students are present 👦👧");
};

// ===== ICON ACTIONS =====
document.getElementById("settings").onclick = () => {
  alert("Settings:\n• Sound ON/OFF\n• Zoom Reset");
};

document.getElementById("record").onclick = async () => {
  if (!navigator.mediaDevices) {
    alert("Recording not supported");
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  alert("🎤 Recording started (demo)");
  stream.getTracks().forEach(t => t.stop());
};

document.getElementById("add").onclick = () => {
  alert("➕ Add Student:\nNew student added (demo)");
};

document.getElementById("exit").onclick = () => {
  if (confirm("Exit classroom?")) {
    alert("Exited");
  }
};
