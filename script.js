// ===== BASIC SETUP =====
const canvas = document.getElementById("scene");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// CAMERA
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 2.2, 6);
camera.lookAt(0, 1.8, -4);

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.DirectionalLight(0xffffff, 0.9);
light.position.set(5,10,5);
scene.add(light);

// ===== SCHOOL OUTSIDE =====
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial({color:0x4caf50})
);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

const school = new THREE.Mesh(
  new THREE.BoxGeometry(4,3,4),
  new THREE.MeshStandardMaterial({color:0xffffff})
);
school.position.set(0,1.5,0);
scene.add(school);

const door = new THREE.Mesh(
  new THREE.BoxGeometry(1.2,2,0.3),
  new THREE.MeshStandardMaterial({color:0x8b4513})
);
door.position.set(0,1,2.15);
scene.add(door);

// ===== CLASSROOM GROUP =====
const classroom = new THREE.Group();
classroom.visible = false;
scene.add(classroom);

// FLOOR
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(12,12),
  new THREE.MeshStandardMaterial({color:0xe6d3a3})
);
floor.rotation.x = -Math.PI/2;
classroom.add(floor);

// WALLS
const wallMat = new THREE.MeshStandardMaterial({color:0xfff1cc});
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(12,4), wallMat);
backWall.position.set(0,2,-6);
classroom.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(12,4), wallMat);
leftWall.rotation.y = Math.PI/2;
leftWall.position.set(-6,2,0);
classroom.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(12,4), wallMat);
rightWall.rotation.y = -Math.PI/2;
rightWall.position.set(6,2,0);
classroom.add(rightWall);

// ===== WHITEBOARD =====
const board = new THREE.Mesh(
  new THREE.PlaneGeometry(4.5,2.2),
  new THREE.MeshStandardMaterial({color:0xffffff})
);
board.position.set(0,2.4,-5.95);
classroom.add(board);

// BOARD TEXT
const txtCanvas = document.createElement("canvas");
txtCanvas.width = 512;
txtCanvas.height = 256;
const ctx = txtCanvas.getContext("2d");
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,512,256);
ctx.fillStyle = "#000000";
ctx.font = "bold 48px Arial";
ctx.textAlign = "center";
ctx.fillText("TOONE VISHWA",256,140);
board.material.map = new THREE.CanvasTexture(txtCanvas);

// ===== TEACHER (HUMAN LIKE) =====
const teacherGroup = new THREE.Group();

// body
const tBody = new THREE.Mesh(
  new THREE.CylinderGeometry(0.35,0.4,1.4),
  new THREE.MeshStandardMaterial({color:0x1565c0})
);
tBody.position.y = 0.7;
teacherGroup.add(tBody);

// head
const tHead = new THREE.Mesh(
  new THREE.SphereGeometry(0.25),
  new THREE.MeshStandardMaterial({color:0xffdbac})
);
tHead.position.y = 1.6;
teacherGroup.add(tHead);

teacherGroup.position.set(0,0,-4.5);
classroom.add(teacherGroup);

// ===== BENCH + STUDENT FUNCTION =====
function createBenchWithStudent(x,z){
  // bench
  const bench = new THREE.Mesh(
    new THREE.BoxGeometry(1.6,0.2,0.6),
    new THREE.MeshStandardMaterial({color:0x8d6e63})
  );
  bench.position.set(x,0.4,z);
  classroom.add(bench);

  // student body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25,0.3,1.1),
    new THREE.MeshStandardMaterial({color:0xff9800})
  );
  body.position.set(x,0.95,z);
  classroom.add(body);

  // head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22),
    new THREE.MeshStandardMaterial({color:0xffdbac})
  );
  head.position.set(x,1.6,z);
  classroom.add(head);
}

// STUDENTS ROWS
createBenchWithStudent(-2, -2);
createBenchWithStudent(0, -2);
createBenchWithStudent(2, -2);

createBenchWithStudent(-2, -3.5);
createBenchWithStudent(0, -3.5);
createBenchWithStudent(2, -3.5);

// ===== RAYCAST DOOR =====
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener("click",(e)=>{
  mouse.x = (e.clientX/window.innerWidth)*2-1;
  mouse.y = -(e.clientY/window.innerHeight)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hit = raycaster.intersectObject(door);
  if(hit.length>0) enterClassroom();
});

// ===== ENTER / EXIT =====
function enterClassroom(){
  school.visible=false;
  door.visible=false;
  classroom.visible=true;
  camera.position.set(0,2.2,4);
  camera.lookAt(0,2,-5);
}

const exitBtn = document.querySelector(".menu div:last-child");
exitBtn.onclick = ()=>{
  classroom.visible=false;
  school.visible=true;
  door.visible=true;
  camera.position.set(0,2.2,6);
  camera.lookAt(0,1.8,0);
};

// ===== RESIZE =====
window.onresize=()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
};

// LOOP
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();
