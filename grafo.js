import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { listaEspacios } from './main';
import {mostrarModalEspacio} from './app'

// Inicializar Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const containerGrafo = document.querySelector('.grafo');

const nodeGeometry = new THREE.SphereGeometry(0.4, 20, 20);
// Crear nodos y materiales según el riesgo
listaEspacios.forEach((espacio) => {
  let material;
  if (espacio.riesgoLocal >= 0 && espacio.riesgoLocal < 25) {
    material = new THREE.MeshBasicMaterial({ color: 0x0E66C4}); // Azul
  } else if (espacio.riesgoLocal >= 25 && espacio.riesgoLocal < 60) {
material = new THREE.MeshBasicMaterial({ color: 0xC4B10E}); // Amarillo
  } else if (espacio.riesgoLocal >= 60 && espacio.riesgoLocal < 80) {
    material = new THREE.MeshBasicMaterial({ color: 0xC4480E}); // Naranja
  } else if (espacio.riesgoLocal >= 80) {
    material = new THREE.MeshBasicMaterial({ color: 0xC40E0E}); // Rojo
  }
  
  const node = new THREE.Mesh(nodeGeometry,material)
  const x = espacio.coordenadas.x*4;
  const y = espacio.coordenadas.y*4;
  const z = espacio.coordenadas.z*5;
  
  node.userData = {id:espacio.id,nombre:espacio.nombre}

  node.position.set(x, y, z);
  node.userData = { espacio }; // Almacenar el espacio en los datos del usuario del nodo
  scene.add(node);
  espacio.nodoThree = node;
});
// Agregar aristas
const edgeMaterial = new THREE.LineBasicMaterial({
  color: 0xFF0000,
  linewidth: 10,
  linecap: 'round', //ignored by WebGLRenderer
  linejoin: 'round' //ignored by WebGLRenderer
});
listaEspacios.forEach((espacio) => {
  espacio.listaVecinos.forEach((idVecino) => {
    const vecino = listaEspacios.filter((espacio) => espacio.id == idVecino)[0];
    const edgeGeometry = new THREE.BufferGeometry().setFromPoints([espacio.nodoThree.position, vecino.nodoThree.position]);
    const edge = new THREE.Line(edgeGeometry, edgeMaterial);
    scene.add(edge);
  });
});

// Posicionar la cámara
camera.position.x= 38.63658644561416
camera.position.y= 22.732355219079057
camera.position.z = 89.01457484836797

// Controles de la cámara
let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Permitir amortiguación para un movimiento más suave
controls.minPolarAngle = 0; // Ángulo mínimo de rotación vertical (en radianes)
controls.maxPolarAngle = Math.PI; // Ángulo máximo de rotación vertical (en radianes)
controls.minDistance = 1; // Distancia mínima a la que la cámara puede alejarse del punto de enfoque
controls.maxDistance = 100; // Distancia máxima a la que la cámara puede alejarse del punto de enfoque

let isAnimate = false;

const animate = async () =>{
    // console.log("animate")
    if(isAnimate){
        renderer.setSize(containerGrafo.offsetWidth, containerGrafo.offsetHeight);
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

function setMaterial(){
  listaEspacios.forEach((espacio) => {
    let material;

    if (espacio.riesgoLocal >= 0 && espacio.riesgoLocal < 20) {
      material = new THREE.MeshBasicMaterial({ color: 0x00FFF7 }); // Verde oscuro
    } else if (espacio.riesgoLocal >= 20 && espacio.riesgoLocal < 40) {
      material = new THREE.MeshBasicMaterial({ color: 0x2BC60C }); // Verde claro
    } else if (espacio.riesgoLocal >= 40 && espacio.riesgoLocal < 60) {
      material = new THREE.MeshBasicMaterial({ color: 0xE2D806 }); // Amarillo
    } else if (espacio.riesgoLocal >= 60 && espacio.riesgoLocal < 80) {
      material = new THREE.MeshBasicMaterial({ color: 0xDF8000 }); // Naranja
    } else if (espacio.riesgoLocal >= 80) {
      material = new THREE.MeshBasicMaterial({ color: 0xDF0000 }); // Rojo
    }

    espacio.nodoThree.material = material;
  });
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousedown', onMouseDown);

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
        console.log(selectedObject)
        console.log(`${selectedObject.userData.espacio.id} was clicked!`);
        
        
        
        // camera.position.x = 0; // Ajuste horizontal
        // camera.position.y = -15; // Ajuste vertical para ver todos los pisos
        // camera.position.z = 0; // Distancia de la cámara al objeto
        // controls.enable = false;
        // controls=null;
        // controls = new OrbitControls(camera, renderer.domElement);
        // controls.enabled = false
        // alert(`Espacio con id ${selectedObject.userData.espacio.id} fue clickeado`)
        mostrarModalEspacio(selectedObject.userData.espacio)
        break; // Romper el bucle si encontramos un objeto de interés
      }
    }
  }
}

export {animate,setAnimate,setMaterial}