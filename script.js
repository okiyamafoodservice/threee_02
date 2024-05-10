//モジュールの読み込み
import * as THREE from "https://cdn.skypack.dev/three@0.132";
import OrbitControls from "https://cdn.skypack.dev/threejs-orbit-controls";
//モジュールの追加
import Stats from "https://cdn.skypack.dev/stats.js.fps";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";

//スタッツの追加
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

//GUIの追加
const gui = new GUI();

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
//torusの追加
const TorusGeometry = new THREE.TorusGeometry(0.5, 0.1, 32, 20, 4.5);

const material = new THREE.MeshNormalMaterial({ wireframe: false });
const box = new THREE.Mesh(boxGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);
const Torus = new THREE.Mesh(TorusGeometry, material);

// バッファジオメトリーの追加
const count = 30;
const bufferGeometry = new THREE.BufferGeometry();

// 三角形の座標９点*count分の配列を用意する
const vertices = new Float32Array(count * 9);

// for文でランダムな値を代入
for (let i = 0; i < 9 * count; i++) {
  vertices[i] = (Math.random() - 0.5) * 2;
}
// 配列を生成し、頂点座標の値を代入
// const vertices = new Float32Array([0, 1, 0, 1, 1, 0, 1, 0, 0]);
// 頂点座標の属性を追加
bufferGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const bufferMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
const buffer = new THREE.Mesh(bufferGeometry, bufferMaterial);
// scene.add(buffer);

//位置の調整
sphere.position.set(2, 0, 0);
plane.position.set(0, -0.5, 0);
plane.rotation.x = Math.PI * -0.5;
Torus.position.set(-2, 0.1, 0);
Torus.rotation.z = Math.PI * 0.3;

scene.add(box, sphere, plane, Torus);

// 数値コントーラーの追加
gui.add(box.position, "y", -3, 3, 0.1).name("translateX");
gui.add(box.position, "x", -3, 3).name("translateY");
gui.add(box.position, "z", -3, 3).name("translateZ");
gui.add(box.rotation, "x", 0, Math.PI * 2, Math.PI / 180).name("rotateX"); // 0°から360°まで、1°ずつ
gui.add(box.rotation, "y", 0, Math.PI * 2, Math.PI / 180).name("rotateY"); // 0°から360°まで、1°ずつ
gui.add(box.rotation, "z", 0, Math.PI * 2, Math.PI / 180).name("rotateZ"); // 0°から360°まで、1°ずつ
gui.add(box, "visible");
gui.add(material, "wireframe");

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
