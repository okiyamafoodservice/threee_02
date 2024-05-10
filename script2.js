//モジュールの読み込み
import * as THREE from "https://cdn.skypack.dev/three@0.132";
import OrbitControls from "https://cdn.skypack.dev/threejs-orbit-controls";
import Stats from "https://cdn.skypack.dev/stats.js.fps";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";

//スタッツの追加
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

//シーンの追加
const scene = new THREE.Scene();

//カメラの追加
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラーの追加
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//マウス操作機能の追加
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.4;

//物体の追加
//   const boxGeometry = new THREE.BoxGeometry();
const CapsuleGeometry = new THREE.CylinderGeometry(0.25, 0.5, 2.4, 10);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const sphereGeometry2 = new THREE.SphereGeometry(0.5, 32, 16);
const maru1 = new THREE.SphereGeometry(0.3, 32, 16);
const maru2 = new THREE.SphereGeometry(0.3, 32, 16);

const material = new THREE.MeshNormalMaterial({ wireframe: false });

const capsule = new THREE.Mesh(CapsuleGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);
const sphere2 = new THREE.Mesh(sphereGeometry2, material);
const MeshMaru = new THREE.Mesh(maru1, material);
const MeshMaru2 = new THREE.Mesh(maru2, material);

sphere.position.set(0.8, -1, 0);
sphere2.position.set(-0.8, -1, 0);
plane.position.set(0, -2.5, 0);
plane.rotation.x = -Math.PI * 0.5;
MeshMaru.position.set(-0.1, 1.1, -0.01);
MeshMaru2.position.set(0.1, 1.1, -0.01);

gui.add(capsule.rotation, "z", 0, Math.PI * 2, Math.PI / 180).name("rotateZ"); // 0°から360°まで、1°ずつ

scene.add(capsule, sphere, plane, sphere2, MeshMaru, MeshMaru2);

//ライトの追加
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

//アニメーション関数
function animate() {
  stats.begin();
  controls.update();
  renderer.render(scene, camera);

  stats.end();
  requestAnimationFrame(animate);
}

//アニメーションを実行
animate();

//ウィンドウリサイズ時の処理
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize);
