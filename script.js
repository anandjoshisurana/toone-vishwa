// BASIC SETUP
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 10);
camera.lookAt(0, 2, 0);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// GROUND
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0x4caf50 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// SCHOOL
const school = new THREE.Mesh(
  new THREE.BoxGeometry(6, 4, 6),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
school.position.y = 2;
scene.add(school);

// DOOR (CLEAR & VISIBLE)
const door = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 2.5, 0.5),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
door.position.set(0, 1.25, 3.25);
scene.add(door);

// CLASSROOM (INSIDE)
const classroom = new THREE.Mesh(
  new THREE.BoxGeometry(10, 5, 10),
  new THREE.MeshStandardMaterial({
    color: 0xf5deb3,
    side: THREE.BackSide
  })
);
classroom.visible = false;
scene.add(classroom);

// RAYCASTER
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// CLICK EVENT
window.addEventListener("click", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObject(door);

  if (hit.length > 0) {
    enterClassroom();
  }
});

// ENTER CLASSROOM
function enterClassroom() {
  school.visible = false;
  door.visible = false;
  classroom.visible = true;

  camera.position.set(0, 2, 0);
  camera.lookAt(0, 2, -5);
}

// RESIZE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
