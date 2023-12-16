import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import troi from '../img/troi.jpg';
import desertTexturePattern from "../img/samac.jpg";
import pyramidTexturePattern from "../img/giza.jpg";
import startTexure from "../img/startTexture.jpg";
import {fieldWidth, sizeFactor} from "./module.js";
import {Khufu_height} from "./module.js";
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(100, 60, 100);
orbit.update();

console.log(fieldWidth);


const fieldHeight = 150;

const Khufu_height = 150.0;
const Khufu_baseEdge = 230.0;

const Khafre_height = 136.4;
const Khafre_baseEdge = 215.5;0

const Menkaur_height = 61.0;
const Menkaur_baseEdge = 108.5;

const lightColor = 0xffffff;
const sun_max_intensity = 5;
const sun_position_X = -100;
const sun_position_Y = 50;
const sun_position_Z = 40;

const moon_max_intensity = 1;
const moon_position_X = -15;
const moon_position_Y = 65;
const moon_position_Z = -30;

const start_size = 0.5;

const Alnitak_height_form_Khufu = 95.0 * 2.3;
const Alnilam_height_form_Khafre = 60.0 * 2.3;
const Mintaka_height_form_Menkaur = 156.0 * 2.3;

const Alnilam_far_form_Alnitakr= 130.0; 
const Mintaka_far_form_Alnilam_Z = 92.0; 
const Mintaka_far_form_Alnilam_X = 148.0; 

const ratePixleMeter = 2.5;

const speedDefault =1/5000;

const sandColor = 0x8B4513;

const pyramidColor = 0xFF7F24;

const textureLoader = new THREE.TextureLoader();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// MẶT ĐẤT VÀ BẦU TRỜI

scene.background = textureLoader.load(troi);

const planeGeometry = new THREE.PlaneGeometry(fieldWidth, fieldHeight);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: sandColor,
    side: THREE.DoubleSide,
    map: textureLoader.load(desertTexturePattern)
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//CÁC KIM TỰ THÁP và CÁC VÌ SAO
/*
B1. Do trên thực tế chẳng ai đo góc trên đỉnh hình chóp mà ConGeometry cần
nên phải viết hàm tự tính đỉnh hình chóp với cạnh đáy và chiều cao đã biết.
B2. Xoay kim tự tháp 45 độ.
B3. Tâm kim tự tháp là ngay mặt đất => dịch kim tự tháp 1 đoạn = 1/2 chiều cao.
B4. Dời kim tự tháp về tọa độ tương ứng. Lấy tạo độ sao Alnilam a.k.a Kim tự số 2 làm tọa độ trung tâm.
*/

function angle(height, baseEdge){
    return  Math.atan((baseEdge/2)/height) * 16 ;
}

const pyramidMaterial = new THREE.MeshStandardMaterial( {color: pyramidColor, map: textureLoader.load(pyramidTexturePattern)} );
const startMeterial = new THREE.MeshStandardMaterial({map: textureLoader.load(startTexure)});
const startGeo = new THREE.SphereGeometry(start_size);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Kim tự tháp Khufu
const pyramid1Geometry = new THREE.ConeGeometry( angle(Khufu_height, Khufu_baseEdge), Khufu_height * sizeFactor, 4);
const pyramid1 = new THREE.Mesh(pyramid1Geometry, pyramidMaterial );
pyramid1.position.x += (Alnilam_far_form_Alnitakr*sizeFactor*ratePixleMeter)  ;
pyramid1.position.z += (Alnilam_far_form_Alnitakr*sizeFactor*ratePixleMeter);
pyramid1.position.y += (Khufu_height/2)*sizeFactor;
pyramid1.rotation.y = Math.PI / 4;
pyramid1.castShadow =true;
scene.add(pyramid1);

//Ngôi sao Alnitak
const star1 = new THREE.Mesh(startGeo,startMeterial);
star1.position.x = pyramid1.position.x;
star1.position.z = pyramid1.position.z;
star1.position.y +=  sizeFactor * (Alnitak_height_form_Khufu  + Khufu_height) + moon_position_Y/4;
scene.add(star1);

//Kim tự tháp Khafre
const pyramid2Geometry = new THREE.ConeGeometry( angle(Khafre_height, Khafre_baseEdge), Khafre_height * sizeFactor, 4);
const pyramid2 = new THREE.Mesh(pyramid2Geometry, pyramidMaterial );
scene.add(pyramid2);
pyramid2.position.y += (Khafre_height/2)*sizeFactor;
pyramid2.rotation.y = Math.PI / 4;
pyramid2.castShadow =true;

//Ngôi sao Alnilam
const star2 = new THREE.Mesh(startGeo,startMeterial);
star2.position.x = pyramid2.position.x;
star2.position.z = pyramid2.position.z;
star2.position.y += sizeFactor * (Alnilam_height_form_Khafre  + Khafre_height) + moon_position_Y/4;
scene.add(star2);

//Kim tự tháp Menkaur
const pyramid3Geometry = new THREE.ConeGeometry( angle(Menkaur_height, Menkaur_baseEdge), Menkaur_height * sizeFactor, 4);
const pyramid3 = new THREE.Mesh(pyramid3Geometry, pyramidMaterial );
scene.add(pyramid3);
pyramid3.position.y += (Menkaur_height/2)*sizeFactor;
pyramid3.rotation.y = Math.PI / 4;
pyramid3.position.x -= (Mintaka_far_form_Alnilam_X*sizeFactor*ratePixleMeter)  ;
pyramid3.position.z -= (Mintaka_far_form_Alnilam_Z*sizeFactor*ratePixleMeter);
pyramid3.castShadow =true;

//Ngôi sao Mintaka
const star3 = new THREE.Mesh(startGeo,startMeterial);
star3.position.x = pyramid3.position.x;
star3.position.z = pyramid3.position.z;
star3.position.y += sizeFactor * (Mintaka_height_form_Menkaur  + Menkaur_height) + moon_position_Y/4;
scene.add(star3);

const mark = 15;

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 


//MẶT TRĂNG
const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // Màu xám
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(moon_position_X, moon_position_Y, moon_position_Z); // Đặt vị trí mặt trăng
scene.add(moon);

const spotLight = new THREE.SpotLight(0xFFFFFF, moon_max_intensity);
scene.add(spotLight);
spotLight.position.set(moon_position_X, moon_position_Y, moon_position_Z);;
spotLight.castShadow = true;
spotLight.angle = 0.65;
spotLight.penumbra = 0.5;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// MẶT TRỜI
const sun = new THREE.DirectionalLight( lightColor);
scene.add( sun );

sun.position.set(sun_position_X,sun_position_Y,sun_position_Z);
sun.castShadow = true;
sun.shadow.camera.bottom = -40;
sun.shadow.camera.top = 80;
sun.shadow.camera.right = (fieldWidth*sizeFactor)/2;
sun.shadow.camera.left = (fieldWidth*sizeFactor)/-2;

const sunHelper = new THREE.DirectionalLightHelper(sun, 5);
scene.add(sunHelper);
const sunlLightShadowHelper = new THREE.CameraHelper(sun.shadow.camera);
scene.add(sunlLightShadowHelper);
const sunGeometry1 = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Màu vàng
const sun1 = new THREE.Mesh(sunGeometry1, sunMaterial1);
sun1.position.set(sun_position_X,sun_position_Y,sun_position_Z); // Đặt vị trí mặt trời
scene.add(sun1);

let mixer;

const gui = new dat.GUI();

const options = {
    wirefame: false,
    angle: 2,
    penumbra: 0.5,
    intensity: 2,};

gui.add(options, 'wirefame').onChange(function(e){
    pyramid1.material.wireframe = e;
    pyramid2.material.wireframe = e;
    pyramid3.material.wireframe = e;

})
gui.add(options,'angle',0,2).onChange(function(e){
    spotLight.angle = e;
})
gui.add(options,'penumbra',0,1).onChange(function(e){
    spotLight.penumbra = e;
})
gui.add(options,'intensity',0,10).onChange(function(e){
    spotLight.intensity = e;
    sun.intensity = e;
})

var AirPlane = function() {
	
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(60,50,50,1,1,1);
	var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
	
	// Create the engine
	var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
	var matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	var engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);
	
	// Create the tail
	var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
	var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-35,25,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);
	
	// Create the wing
	var geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
	var matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);
	
	// propeller
	var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
	var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;
	
	// blades
	var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
	var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
	
	var blade = new THREE.Mesh(geomBlade, matBlade);
	blade.position.set(8,0,0);
	blade.castShadow = true;
	blade.receiveShadow = true;
	this.propeller.add(blade);
	this.propeller.position.set(50,0,0);
	this.mesh.add(this.propeller);
};
let step = 0;

const clock = new THREE.Clock();
function animate(time) {

    if(mixer) mixer.update(clock.getDelta());
    
    step = time*speedDefault;
    spotLight.intensity = moon_max_intensity * Math.abs(Math.cos(step));
    sun.intensity =  sun_max_intensity * Math.abs(Math.sin(step));
    cube.position.y = -2*mark +(mark * Math.sin(step));
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});