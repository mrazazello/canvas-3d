import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css'

const canvas = document.querySelector('#mainField');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
canvas.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true  } );
const figure = new THREE.Mesh( geometry, material );
scene.add( figure );

const addStar = () => {
	const starGeometry = new THREE.SphereGeometry(0.25)
	const starMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	const starFigure = new THREE.Mesh( starGeometry, starMaterial );
	const [x, y, z] = new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
	starFigure.position.set(x, y, z);
	scene.add( starFigure );
}

const starsCoords = new Array(1000);
for (let i = 0; i < starsCoords.length; i++) {
	addStar();
}

let filterStrength = 20;
let frameTime = 0, lastLoop = new Date, thisLoop;

const animate = () => {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );

	let thisFrameTime = (thisLoop=new Date) - lastLoop;
	frameTime+= (thisFrameTime - frameTime) / filterStrength;
	lastLoop = thisLoop;
}

animate();

let fpsOut = document.getElementById('fps');
setInterval(()=> {
  fpsOut.innerHTML = "FPS: " + (1000/frameTime).toFixed(1);
}, 1000);
