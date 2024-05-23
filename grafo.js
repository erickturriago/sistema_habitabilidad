import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {listaEspacios} from './main'

//Agregar nodos al grafo
// Inicializar Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const containerGrafo = document.querySelector('.grafo')

const nodeGeometry = new THREE.SphereGeometry(0.4, 20, 20);

listaEspacios.forEach((espacio)=>{

  let material;

  if(espacio.tipo=="Habitacion"){
    material=new THREE.MeshBasicMaterial({ color: 0x0000FF }); //Azul
  }
  else if(espacio.tipo=="Ascensor"){
    material=new THREE.MeshBasicMaterial({ color: 0x008000 }); //Verde
  }
  else if(espacio.tipo=="Pasillo"){
    material=new THREE.MeshBasicMaterial({ color: 0xFF0080 }); //Rosado
  }
  else if(espacio.tipo=="Escalera"){
    material=new THREE.MeshBasicMaterial({ color: 0xFFD300 }); //Amarillo
  }
  else if(espacio.tipo=="Terraza"){
    material=new THREE.MeshBasicMaterial({ color: 0xFC4B08 }); //Naranja
  }
  else{
    material=new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); //Blanco
  }

  const node = new THREE.Mesh(nodeGeometry,material)
  const x = espacio.coordenadas.x*4;
  const y = espacio.coordenadas.y*4;
  const z = espacio.coordenadas.z*5;

  node.userData = {id:espacio.id,nombre:espacio.nombre}

  node.position.set(x, y, z);
  scene.add(node);
  // nodes.push(node);
  espacio.nodoThree=node;
})



// Agregar aristas
const edgeMaterial = new THREE.LineBasicMaterial({ 
color: 0xFF0000,
linewidth: 10,
linecap: 'round', //ignored by WebGLRenderer
  linejoin:  'round' //ignored by WebGLRenderer
});
listaEspacios.forEach((espacio)=>{
  // console.log("Nodo: "+espacio.nombre)
  espacio.listaVecinos.forEach((idVecino)=>{
    const vecino = listaEspacios.filter((espacio)=>espacio.id==idVecino)[0]
    const edgeGeometry = new THREE.BufferGeometry().setFromPoints([espacio.nodoThree.position, vecino.nodoThree.position]);
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
    // console.log("animate")
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


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
  // Calcular las coordenadas del ratón normalizadas (-1 a +1)
  const rect = containerGrafo.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // Establecer el rayo desde la cámara a través del punto del ratón
  raycaster.setFromCamera(mouse, camera);

  // Calcular intersecciones con los objetos en la escena
  const intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0) {
    for (let i = 0; i < intersections.length; i++) {
      const selectedObject = intersections[i].object;
      if (selectedObject.geometry.type === 'SphereGeometry') {
        const color = new THREE.Color(Math.random(), Math.random(), Math.random());
        selectedObject.material.color.set(color);
        console.log(selectedObject)
        console.log(`${selectedObject.userData.nombre} was clicked!`);
        alert(`Espacio con id ${selectedObject.userData.id} fue clickeado`)
        break; // Romper el bucle si encontramos un objeto de interés
      }
    }
  }
}


export {animate,setAnimate}