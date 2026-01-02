// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 12);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0x4caf50 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// SCHOOL BUILDING
const school = new THREE.Mesh(
  new THREE.BoxGeometry(8, 5, 8),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
school.position.y = 2.5;
scene.add(school);

// DOOR (ROOM ENTRY)
const door = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 2.5, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x654321 })
);
door.position.set(0, 1.25, 4.01);
scene.add(door);

// CLASSROOM (inside)
const classroom = new THREE.Mesh(
  new THREE.BoxGeometry(10, 5, 10),
  new THREE.MeshStandardMaterial({
    color: 0xf5deb3,
    side: THREE.BackSide
  })
);
classroom.visible = false;
scene.add(classroom);

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// CLICK EVENT
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([door]);

  if (intersects.length > 0) {
    enterClassroom();
  }
});

// ENTER CLASSROOM FUNCTION
function enterClassroom() {
  classroom.visible = true;
  school.visible = false;
  door.visible = false;

  camera.position.set(0, 2, 0);
}

// Zoom
window.addEventListener("wheel", (e) => {
  camera.position.z += e.deltaY * 0.01;
});

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
