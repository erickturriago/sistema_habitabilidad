import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {nodos} from './main'

//Agregar nodos al grafo
// Inicializar Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const containerGrafo = document.querySelector('.grafo')

const nodeGeometry = new THREE.SphereGeometry(0.4, 20, 20);
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const nodes = [];



nodos.forEach((nodo)=>{

let material;

if(nodo.tipo=="Habitacion"){
  material=new THREE.MeshBasicMaterial({ color: 0x0000FF }); //Azul
}
else if(nodo.tipo=="Ascensor"){
  material=new THREE.MeshBasicMaterial({ color: 0x008000 }); //Verde
}
else if(nodo.tipo=="Pasillo"){
  material=new THREE.MeshBasicMaterial({ color: 0xFF0080 }); //Rosado
}
else if(nodo.tipo=="Escalera"){
  material=new THREE.MeshBasicMaterial({ color: 0xFFD300 }); //Amarillo
}
else if(nodo.tipo=="Terraza"){
  material=new THREE.MeshBasicMaterial({ color: 0xFC4B08 }); //Naranja
}
else{
  material=new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); //Blanco
}

const node = new THREE.Mesh(nodeGeometry,material)
const x = nodo.posX*4;
const y = nodo.posY*4;
const z = nodo.posZ*5;


node.position.set(x, y, z);
scene.add(node);
nodes.push(node);

nodo.nodoThree=node;
})



// Agregar aristas
const edgeMaterial = new THREE.LineBasicMaterial({ 
color: 0xFF0000,
linewidth: 10,
linecap: 'round', //ignored by WebGLRenderer
  linejoin:  'round' //ignored by WebGLRenderer
});
nodos.forEach((nodo)=>{
// console.log("------------------------------------------------")
// console.log(nodo.nombre+" Id: "+nodo.id)
nodo.vecinosNodo.forEach((vecino)=>{
  // console.log(vecino.nombre)
  // console.log(vecino.nodoThree)
  const edgeGeometry = new THREE.BufferGeometry().setFromPoints([nodo.nodoThree.position, vecino.nodoThree.position]);
  const edge = new THREE.Line(edgeGeometry, edgeMaterial);
  scene.add(edge);
})
})

// Posicionar la cámara
// camera.position.set(0, 20, 0);
camera.position.x= 38.63658644561416
camera.position.y= 22.732355219079057
camera.position.z = 89.01457484836797

// Controles de la cámara
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true; // Permitir amortiguación para un movimiento más suave

// Configurar los controles para limitar la rotación vertical
controls.minPolarAngle = 0; // Ángulo mínimo de rotación vertical (en radianes)
controls.maxPolarAngle = Math.PI; // Ángulo máximo de rotación vertical (en radianes)

// Configurar los controles para limitar la distancia
controls.minDistance = 1; // Distancia mínima a la que la cámara puede alejarse del punto de enfoque
controls.maxDistance = 100; // Distancia máxima a la que la cámara puede alejarse del punto de enfoque

let isAnimate=false

const animate = async () =>{
    console.log("animate")
    if(isAnimate){
        renderer.setSize(containerGrafo.offsetWidth, containerGrafo.offsetHeight);
        // console.log(containerGrafo.offsetWidth)
        renderer.setPixelRatio(window.devicePixelRatio)
        containerGrafo.appendChild(renderer.domElement);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    else{

    }
}

const setAnimate = (value)=>{
    isAnimate=value
}


export {animate,setAnimate}