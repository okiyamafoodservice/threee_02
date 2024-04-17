//モジュールの読み込み
import * as THREE from "https://cdn.skypack.dev/three@0.132";
import OrbitControls from "https://cdn.skypack.dev/threejs-orbit-controls";
//モジュールの追加
import Stats from "https://cdn.skypack.dev/stats.js.fps";

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
controls.enableDamping = true; //滑らかに（徐々に）動かす
controls.dampingFactor = 0.2; //慣性力の設定

//物体の追加
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const planeGeometry = new THREE.PlaneGeometry(16, 16);

const material = new THREE.MeshNormalMaterial({ wireframe: false });
const box = new THREE.Mesh(boxGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);

//位置の調整

sphere.position.set(2, 0, 0);
plane.position.set(0, -0.5, 0);
plane.rotation.x = Math.PI * -0.5;

scene.add(box, sphere, plane);

//ライトの追加
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

//アニメーション関数
function animate() {
  stats.begin(); //追加
  controls.update(); //コントローラーをアップデート
  renderer.render(scene, camera);
  stats.end(); //追加
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
