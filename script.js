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
camera.position.set(0, 5, 10);

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

// SCHOOL BUILDING (temporary box)
const school = new THREE.Mesh(
  new THREE.BoxGeometry(6, 4, 6),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
school.position.y = 2;
scene.add(school);

// Zoom In / Out
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
  school.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
