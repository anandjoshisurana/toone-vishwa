// ===== BASIC =====
const canvas = document.getElementById("scene");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// CAMERA
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 8);
camera.lookAt(0, 2, 0);

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.DirectionalLight(0xffffff, 0.8);
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
  new THREE.MeshStandardMaterial({color:0xff0000})
);
door.position.set(0,1,2.15);
scene.add(door);

// ===== CLASSROOM GROUP =====
const classroom = new THREE.Group();
classroom.visible = false;
scene.add(classroom);

// FLOOR
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10),
  new THREE.MeshStandardMaterial({color:0xe0cda9})
);
floor.rotation.x = -Math.PI/2;
classroom.add(floor);

// WALLS
const wallMaterial = new THREE.MeshStandardMaterial({color:0xfff3cd});
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10,4), wallMaterial);
backWall.position.set(0,2,-5);
classroom.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(10,4), wallMaterial);
leftWall.rotation.y = Math.PI/2;
leftWall.position.set(-5,2,0);
classroom.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(10,4), wallMaterial);
rightWall.rotation.y = -Math.PI/2;
rightWall.position.set(5,2,0);
classroom.add(rightWall);

// ===== WHITEBOARD =====
const board = new THREE.Mesh(
  new THREE.PlaneGeometry(4,2),
  new THREE.MeshStandardMaterial({color:0xffffff})
);
board.position.set(0,2.3,-4.9);
classroom.add(board);

// BOARD TEXT
const canvasText = document.createElement("canvas");
canvasText.width = 512;
canvasText.height = 256;
const ctx = canvasText.getContext("2d");
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,512,256);
ctx.fillStyle = "#000000";
ctx.font = "bold 48px Arial";
ctx.textAlign = "center";
ctx.fillText("TOONE VISHWA",256,140);

const boardTexture = new THREE.CanvasTexture(canvasText);
board.material.map = boardTexture;
board.material.needsUpdate = true;

// ===== TEACHER =====
const teacher = new THREE.Mesh(
  new THREE.CylinderGeometry(0.3,0.3,1.6),
  new THREE.MeshStandardMaterial({color:0x1565c0})
);
teacher.position.set(0,0.8,-3.5);
classroom.add(teacher);

// ===== CHILDREN =====
function createStudent(x,z){
  const s = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25,0.25,1.2),
    new THREE.MeshStandardMaterial({color:0xff8f00})
  );
  s.position.set(x,0.6,z);
  classroom.add(s);
}
createStudent(-1, -1);
createStudent(0, -1);
createStudent(1, -1);
createStudent(-1, -2);
createStudent(1, -2);

// ===== RAYCAST =====
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
  camera.position.set(0,2,4);
  camera.lookAt(0,2,-4);
}

const exitBtn = document.querySelector(".menu div:last-child");
exitBtn.onclick = ()=>{
  classroom.visible=false;
  school.visible=true;
  door.visible=true;
  camera.position.set(0,2,8);
  camera.lookAt(0,2,0);
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
