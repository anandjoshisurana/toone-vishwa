// ===== BASIC =====
const canvas = document.getElementById("scene");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbde7ff);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 2, 6);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.9));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// ===== GLTF LOADER =====
const loader = new THREE.GLTFLoader();

// ===== LOAD CLASSROOM =====
loader.load("models/classroom.glb", (gltf) => {
  const classroom = gltf.scene;
  classroom.scale.set(1.2, 1.2, 1.2);
  scene.add(classroom);
});

// ===== LOAD TEACHER =====
loader.load("models/teacher.glb", (gltf) => {
  const teacher = gltf.scene;
  teacher.position.set(0, 0, -2.5);
  teacher.scale.set(0.9, 0.9, 0.9);
  scene.add(teacher);
});

// ===== LOAD STUDENTS =====
const studentPositions = [
  [-2, 0, -1],
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1],
  [-2, 0, -2],
  [0, 0, -2],
  [2, 0, -2]
];

studentPositions.forEach((pos) => {
  loader.load("models/student.glb", (gltf) => {
    const student = gltf.scene;
    student.position.set(pos[0], pos[1], pos[2]);
    student.scale.set(0.8, 0.8, 0.8);
    scene.add(student);
  });
});

// ===== EXIT BUTTON =====
const exitBtn = document.querySelector(".menu div:last-child");
exitBtn.onclick = () => {
  alert("Exit Classroom");
};

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
