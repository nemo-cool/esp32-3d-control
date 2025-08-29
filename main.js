// 修改這裡 → 換成你的 ESP32 IP
const ESP32_IP = "http://192.168.50.238/";

// --- LED 控制 ---
function ledOn() { fetch(`${ESP32_IP}/api/led/on`); }
function ledOff() { fetch(`${ESP32_IP}/api/led/off`); }
function setBrightness(val) { fetch(`${ESP32_IP}/api/brightness?value=${val}`); }

// --- 3D 場景 ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById("viewer").appendChild(renderer.domElement);

// 燈光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,5,5).normalize();
scene.add(light);

// 載入 GLTF 模型
const loader = new THREE.GLTFLoader();
loader.load("mymodel.glb", function(gltf){
  scene.add(gltf.scene);
}, undefined, function(error){
  console.error(error);
});

// 相機位置
camera.position.z = 3;

// 控制器
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// 動畫
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();