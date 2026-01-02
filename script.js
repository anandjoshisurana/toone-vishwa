// ===== BASIC SETUP =====
const canvas = document.getElementById("scene");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// CAMERA (straight view)
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 2, 8);
camera.lookAt(0, 2, 0);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// ===== GROUND =====
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x4caf50 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ===== SCHOOL =====
const school = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 4),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
school.position.set(0, 1.5, 0);
scene.add(school);

// ===== DOOR (BIG & CLEAR) =====
const door = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 2, 0.3),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
door.position.set(0, 1, 2.15);
scene.add(door);

// ===== CLASSROOM (INSIDE BOX) =====
const classroom = new THREE.Mesh(
  new THREE.BoxGeometry(10, 4, 10),
  new THREE.MeshStandardMaterial({
    color: 0xfff3cd,
    side: THREE.BackSide
  })
);
classroom.visible = false;
scene.add(classroom);

// ===== RAYCASTER =====
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// CLICK HANDLER (MOST IMPORTANT PART)
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();

  mouse.x =
    ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y =
    -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(door);

  if (intersects.length > 0) {
    enterClassroom();
  }
});

// ===== ENTER CLASSROOM =====
function enterClassroom() {
  school.visible = false;
  door.visible = false;
  classroom.visible = true;

  camera.position.set(0, 2, 0);
  camera.lookAt(0, 2, -4);
}

// ===== RESIZE =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== LOOP =====
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
function exitClassroom() {
  classroom.visible = false;
  school.visible = true;
  door.visible = true;

  camera.position.set(0, 2, 8);
  camera.lookAt(0, 2, 0);
}
const exitBtn = document.querySelector(".menu div:last-child");

exitBtn.addEventListener("click", () => {
  exitClassroom();
});

