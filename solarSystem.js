//Import
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

let isPaused = false;

const pauseBtn = document.getElementById("pauseBtn");
pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-50, 90, 150);

const orbit = new OrbitControls(camera, renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const starTexture = textureLoader.load("./image/stars.jpg");
const sunTexture = textureLoader.load("./image/sun.jpg");
const mercuryTexture = textureLoader.load("./image/mercury.jpg");
const venusTexture = textureLoader.load("./image/venus.jpg");
const earthTexture = textureLoader.load("./image/earth.jpg");
const marsTexture = textureLoader.load("./image/mars.jpg");
const jupiterTexture = textureLoader.load("./image/jupiter.jpg");
const saturnTexture = textureLoader.load("./image/saturn.jpg");
const uranusTexture = textureLoader.load("./image/uranus.jpg");
const neptuneTexture = textureLoader.load("./image/neptune.jpg");
const saturnRingTexture = textureLoader.load("./image/saturn_ring.png");
const uranusRingTexture = textureLoader.load("./image/uranus_ring.png");

const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
  starTexture, starTexture, starTexture,
  starTexture, starTexture, starTexture,
]);
scene.background = cubeTexture;

const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

let isDark = true;
document.getElementById("themeBtn").addEventListener("click", () => {
  isDark = !isDark;
  ambientLight.intensity = isDark ? 0 : 0.5;
  scene.background = isDark ? cubeTexture : new THREE.Color(0xf0f0f0);
  const guiDom = document.querySelector(".dg");
  if (guiDom) {
    guiDom.style.backgroundColor = isDark ? "#2f2f2f" : "#f5f5f5";
    guiDom.style.color = isDark ? "#fff" : "#000";
  }
});

const sungeo = new THREE.SphereGeometry(15, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sungeo, sunMaterial);
scene.add(sun);

const path_of_planets = [];
function createLineLoopWithMesh(radius, color, width) {
  const material = new THREE.LineBasicMaterial({ color, linewidth: width });
  const geometry = new THREE.BufferGeometry();
  const points = [];
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * Math.PI * 2;
    points.push(radius * Math.cos(angle), 0, radius * Math.sin(angle));
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  const lineLoop = new THREE.LineLoop(geometry, material);
  scene.add(lineLoop);
  path_of_planets.push(lineLoop);
}

const genratePlanet = (size, planetTexture, x, ring) => {
  const geometry = new THREE.SphereGeometry(size, 50, 50);
  const material = new THREE.MeshStandardMaterial({ map: planetTexture });
  const planet = new THREE.Mesh(geometry, material);
  const planetObj = new THREE.Object3D();
  planet.position.set(x, 0, 0);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
    const ringMat = new THREE.MeshBasicMaterial({ map: ring.ringmat, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI;
    planetObj.add(ringMesh);
  }
  planetObj.add(planet);
  scene.add(planetObj);
  createLineLoopWithMesh(x, 0xffffff, 3);
  return { planetObj, planet };
};

const planets = [
  { name: "Mercury", ...genratePlanet(3.2, mercuryTexture, 28), rotaing_speed_around_sun: 0.004, self_rotation_speed: 0.004 },
  { name: "Venus", ...genratePlanet(5.8, venusTexture, 44), rotaing_speed_around_sun: 0.015, self_rotation_speed: 0.002 },
  { name: "Earth", ...genratePlanet(6, earthTexture, 62), rotaing_speed_around_sun: 0.01, self_rotation_speed: 0.02 },
  { name: "Mars", ...genratePlanet(4, marsTexture, 78), rotaing_speed_around_sun: 0.008, self_rotation_speed: 0.018 },
  { name: "Jupiter", ...genratePlanet(12, jupiterTexture, 100), rotaing_speed_around_sun: 0.002, self_rotation_speed: 0.04 },
  { name: "Saturn", ...genratePlanet(10, saturnTexture, 138, { innerRadius: 10, outerRadius: 20, ringmat: saturnRingTexture }), rotaing_speed_around_sun: 0.0009, self_rotation_speed: 0.038 },
  { name: "Uranus", ...genratePlanet(7, uranusTexture, 176, { innerRadius: 7, outerRadius: 12, ringmat: uranusRingTexture }), rotaing_speed_around_sun: 0.0004, self_rotation_speed: 0.03 },
  { name: "Neptune", ...genratePlanet(7, neptuneTexture, 200), rotaing_speed_around_sun: 0.0001, self_rotation_speed: 0.032 }
];

var GUI = dat.gui.GUI;
const gui = new GUI();
planets.forEach((planet) => {
  gui.add(planet, "rotaing_speed_around_sun", 0, 0.05).name(`${planet.name} Orbit`);
  gui.add(planet, "self_rotation_speed", 0, 0.05).name(`${planet.name} Spin`);
});
const options = { "Real view": true, "Show path": true, speed: 1 };
gui.add(options, "Real view").onChange((e) => {
  ambientLight.intensity = e ? 0 : 0.5;
});
gui.add(options, "Show path").onChange((e) => {
  path_of_planets.forEach((dpath) => { dpath.visible = e; });
});
gui.add(options, "speed", 0, 20);

// Tooltip logic
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById("tooltip");
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate(time) {
  requestAnimationFrame(animate);

  if (!isPaused) {
    sun.rotateY(0.004);
    planets.forEach(({ planetObj, planet, rotaing_speed_around_sun, self_rotation_speed }) => {
      planetObj.rotateY(rotaing_speed_around_sun);
      planet.rotateY(self_rotation_speed);
    });
  }

  // Tooltip hover detection
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.planet));
  if (intersects.length > 0) {
    const planet = intersects[0].object;
    const matched = planets.find(p => p.planet === planet);
    if (matched) {
      tooltip.innerText = matched.name;
      tooltip.style.left = `${mouse.x * window.innerWidth * 0.5 + window.innerWidth / 2}px`;
      tooltip.style.top = `${-mouse.y * window.innerHeight * 0.5 + window.innerHeight / 2}px`;
      tooltip.style.display = "block";
    }
  } else {
    tooltip.style.display = "none";
  }

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});