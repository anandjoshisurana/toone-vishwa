const canvas = document.getElementById("scene");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbde7ff);

// CAMERA
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 1));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,10,5);
scene.add(light);

// =======================
// FALLBACK CLASSROOM (TEMP)
// =======================

// FLOOR
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(12,12),
  new THREE.MeshStandardMaterial({ color: 0xe6d3a3 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// WALL
const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(12,4),
  new THREE.MeshStandardMaterial({ color: 0xfff1cc })
);
wall.position.set(0,2,-6);
scene.add(wall);

// WHITEBOARD
const board = new THREE.Mesh(
  new THREE.PlaneGeometry(4,2),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
board.position.set(0,2.3,-5.9);
scene.add(board);

// BOARD TEXT
const txt = document.createElement("canvas");
txt.width = 512;
txt.height = 256;
const ctx = txt.getContext("2d");
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,512,256);
ctx.fillStyle = "#000000";
ctx.font = "bold 48px Arial";
ctx.textAlign = "center";
ctx.fillText("TOONE VISHWA",256,140);
board.material.map = new THREE.CanvasTexture(txt);

// TEACHER (TEMP)
const teacher = new THREE.Mesh(
  new THREE.CylinderGeometry(0.35,0.4,1.5),
  new THREE.MeshStandardMaterial({ color: 0x1565c0 })
);
teacher.position.set(0,0.75,-4.5);
scene.add(teacher);

// STUDENTS (TEMP)
for(let i=-2;i<=2;i+=2){
  const student = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25,0.3,1.2),
    new THREE.MeshStandardMaterial({ color: 0xff9800 })
  );
  student.position.set(i,0.6,-2);
  scene.add(student);
}

// =======================
// TRY LOADING REAL MODELS
// =======================
const loader = new THREE.GLTFLoader();

loader.load(
  "models/classroom.glb",
  (gltf)=>{
    scene.add(gltf.scene);
    console.log("✅ classroom.glb loaded");
  },
  undefined,
  (err)=>{
    console.warn("❌ classroom.glb NOT found, using fallback");
  }
);

// RESIZE
window.onresize = ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// LOOP
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();
