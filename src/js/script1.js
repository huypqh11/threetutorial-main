import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import giza from '../img/giza.jpg';
import * as dat from 'dat.gui';
import stars from '../img/stars.jpg';


const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-30, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//scene.add(box);

var textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;

var desertGeometry = new THREE.PlaneGeometry(60,60);
var desertMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c }); // Màu cát sa mạc
var desert = new THREE.Mesh(desertGeometry, desertMaterial);
desert.rotation.x = -0.5 * Math.PI; // Xoay 90 độ
scene.add(desert);

const gui = new dat.GUI();
const options = {
    wireframe: false,
};

gui.add(options, 'wireframe').onChange(function(e){
    pyramid1.material.wireframe = e;
    pyramid2.material.wireframe = e;
    pyramid3.material.wireframe = e;
})
const gridHelper = new THREE.GridHelper(60);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// var sunLight = new THREE.DirectionalLight(0xffffff, 2); // Màu trắng, cường độ 1
// sunLight.position.set(30, 20, 30); // Vị trí của mặt trời
// scene.add(sunLight);

// const dLightHelper = new THREE.DirectionalLightHelper(sunLight, 0.01);

// // // Tạo mặt trăng - Directional Light
// var moonLight = new THREE.DirectionalLight(0xffffff, 0); // Màu trắng, cường độ thấp hơn
// moonLight.position.set(-10, 15, -10); // Vị trí của mặt trăng
// scene.add(moonLight);
// const dLightHelper2 = new THREE.DirectionalLightHelper(moonLight, 0.01);


var pyramidGeometry1 = new THREE.CylinderGeometry(0, 5, 8, 4);
pyramidGeometry1.rotateY(Math.PI / 4);
var pyramidMaterial1 = new THREE.MeshStandardMaterial({ map: textureLoader.load(giza),wireframe: false});
var pyramid1 = new THREE.Mesh(pyramidGeometry1, pyramidMaterial1);
pyramid1.scale.set(0.5, 0.5, 0.5); // Tỉ lệ kích thước của kim tự tháp
pyramid1.position.set(-10, 2, -18); // Đặt vị trí của kim tự tháp đầu tiên
pyramid1.castShadow = true;
scene.add(pyramid1);

var pyramidGeometry23 = new THREE.CylinderGeometry(0, 7, 10, 4);
pyramidGeometry23.rotateY(Math.PI / 4); // Xoay 45 độ (Math.PI là 180 độ)

var pyramidMaterial23 = new THREE.MeshStandardMaterial({ map: textureLoader.load(giza),  });

var pyramid2 = new THREE.Mesh(pyramidGeometry23, pyramidMaterial23);
pyramid2.scale.set(0.75, 0.75, 0.75); // Tỉ lệ kích thước của kim tự tháp 2
pyramid2.position.set(0, 3.75, 0); // Đặt vị trí của kim tự tháp thứ hai
pyramid2.castShadow = true;
scene.add(pyramid2);

var pyramid3 = new THREE.Mesh(pyramidGeometry23, pyramidMaterial23);
pyramid3.scale.set(0.75, 0.75, 0.75); // Tỉ lệ kích thước của kim tự tháp 3
pyramid3.position.set(15, 3.75, 15); // Đặt vị trí của kim tự tháp thứ ba
pyramid3.castShadow = true;
scene.add(pyramid3);



var starLight1 = new THREE.PointLight(0xffffff, 0.2);
starLight1.position.set(-10, 20, -18); // Vị trí ngôi sao 1
scene.add(starLight1);

var starLight2 = new THREE.PointLight(0xffffff, 0.2);
starLight2.position.set(0, 18.75, 0); // Vị trí ngôi sao 2
scene.add(starLight2);

var starLight3 = new THREE.PointLight(0xffffff, 0.2);
starLight3.position.set(15, 19, 15); // Vị trí ngôi sao 3
scene.add(starLight3);


function createOrionStar(x, y, z) {
    var starGeometry = new THREE.SphereGeometry(0.5); // Tạo hình cầu với bán kính 0.5
    var starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Màu trắng

    var star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(x, y, z); // Đặt vị trí của ngôi sao
    scene.add(star);
}

// Tạo các ngôi sao của chòm Orion trên mỗi kim tự tháp tương ứng
createOrionStar(-10, 5, -18); // Ngôi sao trên kim tự tháp đầu tiên
createOrionStar(0, 9, 0); // Ngôi sao trên kim tự tháp thứ hai
createOrionStar(15, 9, 15); // Ngôi sao trên kim tự tháp thứ ba

var sunGeometry = new THREE.SphereGeometry(5, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Màu vàng
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(60, 60, 60); // Đặt vị trí mặt trời
scene.add(sun);

var sunLight = new THREE.DirectionalLight(0xffffff, 0.3);
sunLight.position.set(60, 60, 60); // Vị trí của mặt trời
scene.add(sunLight);


var moonGeometry = new THREE.SphereGeometry(3, 32, 32);
var moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa }); // Màu xám
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-30,30, -30); // Đặt vị trí mặt trăng
scene.add(moon);

var moonLight = new THREE.PointLight(0xffffff, 0.5);
moonLight.position.set(-10, 15, -10); // Vị trí của mặt trăng
scene.add(moonLight);


camera.lookAt(scene.position);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
