import * as THREE from 'three';
import Nodo from './clases/Nodo';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Riesgo from './clases/Riesgo'
import Persona from './clases/Persona'
import Antecedente from './clases/Antecedente';
import Espacio from './clases/Espacio';

//Creación de listas de objetos

//Creacion de personas
import personasData from './data/personas.json'
const listaPersonas = [] //Arreglo de elementos de tipo Persona.
personasData.forEach((personaData)=>{
  const persona = new Persona(personaData.id,personaData.nombre,personaData.edad,[])
  listaPersonas.push(persona)
})

// Creacion antecedentes
import antecedentesData from './data/antecedentes.json'
const listaAntecedentes = []
antecedentesData.forEach((antecedenteData)=>{
  const antecedente = new Antecedente(antecedenteData.id,antecedenteData.nombre,antecedenteData.descripcion,antecedenteData.nivelPeligrosidad)
  listaAntecedentes.push(antecedente)
})


//Creacion riesgos
import riesgosData from './data/riesgos.json'
const listaRiesgos = []
riesgosData.forEach((riesgoData)=>{
  const riesgo = new Riesgo(riesgoData.id,riesgoData.nombre,riesgoData.descripcion,riesgoData.alcanceDelRiesgo,riesgoData.tipoEspacio)
  listaRiesgos.push(riesgo)
})

//Creacion espacios
import espaciosData from './data/espacios.json'
import Espacios from './data/espacios.json'

const listaEspacios = []
espaciosData.edificio.forEach((piso)=>{
  piso.espacios.forEach((espacio)=>{
    // const espacio = new Espacio(espacio)
    // id,tipo,actividad,cantidadPersonas,tamaño,nivelRiesgo,listaRiesgos,listaPersonas
    const espacioMemoria = new Espacio(espacio.id,espacio.nombre,espacio.tipo,"Vivienda",0,200,0,[],[],espacio.vecinos)
    listaEspacios.push(espacioMemoria)
  })
})

const listaRecomendaciones = []

//Cargue de objetos entre listas

//Agregar antecedentes random a personas
let cantidadAntecedentesRandom = 100
for(let i=0;i<cantidadAntecedentesRandom;i++){
  let antecedenteRandom = listaAntecedentes[parseInt(Math.random()*listaAntecedentes.length)]
  let personaRandom;
  do{
    personaRandom=listaPersonas[parseInt(Math.random()*listaPersonas.length)]
  }while(personaRandom.listaAntecedentes.includes(antecedenteRandom))
  // let espacioRandom = listaEspacios[parseInt(Math.random()*listaEspacios.length)]
  personaRandom.listaAntecedentes.push(antecedenteRandom)
}
// console.log(listaPersonas.filter((persona)=>persona.listaAntecedentes.length>1))

//Agregar habitantes a cada Espacio
listaPersonas.forEach((persona)=>{
  let espacioRandom;
  do{
    espacioRandom=listaEspacios[parseInt(Math.random()*listaEspacios.length)]
  }while(espacioRandom.cantidadPersonas>=5 || espacioRandom.listaPersonas.includes(persona) || espacioRandom.tipo!=='Habitacion')
  espacioRandom.listaPersonas.push(persona)
  espacioRandom.cantidadPersonas++;
})

//Agregar riesgos random a cada espacio
let cantidadRiesgosAgregar=30
for(let i=0;i<cantidadRiesgosAgregar;i++){
  let riesgoRandom = listaRiesgos[parseInt(Math.random()*listaRiesgos.length)]
  let espacioRandom;
  do{
    espacioRandom=listaEspacios[parseInt(Math.random()*listaEspacios.length)]
  }while(riesgoRandom.tipoEspacio!==espacioRandom.tipo || espacioRandom.listaRiesgos.includes(riesgoRandom))
  // let espacioRandom = listaEspacios[parseInt(Math.random()*listaEspacios.length)]
  espacioRandom.listaRiesgos.push(riesgoRandom)
}


//Trabajo con grafo 3D

// return 0;

// Inicializar Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const containerGrafo = document.querySelector('.grafo')
renderer.setSize(containerGrafo.offsetWidth, containerGrafo.offsetHeight);
console.log(containerGrafo.offsetWidth)
renderer.setPixelRatio(window.devicePixelRatio)
document.querySelector('.grafo').appendChild(renderer.domElement);

// Crear nodos del grafo
const nodes = [];
const edificio = []
const nodos = []
const alturaEdificio = 10
const nodeGeometry = new THREE.SphereGeometry(0.4, 20, 20);
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const numNodes = 20;
const radius = 5;



//Crear edificio
for(let k=0;k<Espacios.edificio.length;k++){
  const piso = Espacios.edificio[k]
  const arrayPiso = []
  for(let i=0;i<piso.espacios.length;i++){
    const espacio=piso.espacios[i]
    // console.log(espacio)
    const nodo = new Nodo()
    nodo.id=espacio.id
    nodo.posX=espacio.coordenadas.x
    nodo.posY=espacio.coordenadas.y
    nodo.posZ=espacio.coordenadas.z
    nodo.vecinos=espacio.vecinos
    nodo.nombre = espacio.nombre
    nodo.tipo=espacio.tipo
    nodos.push(nodo)
    arrayPiso.push(nodo)
  }
  edificio.push(arrayPiso);
}


//Agregar vecinos de tipo nodo
nodos.forEach((nodo)=>{
  nodo.vecinos.forEach((vecino)=>{
    vecino = nodos.filter((nodo)=>nodo.id==vecino)[0];
    nodo.vecinosNodo.push(vecino)
  })
})


//Agregar nodos al grafo
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

  // console.log(nodeMaterial)

  // const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
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


// // Función para imprimir la posición de la cámara
// function printCameraPosition() {
//   console.log('Posición de la cámara:', camera.position.x, camera.position.y, camera.position.z);
// }
// controls.addEventListener('change', printCameraPosition);
// // Animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}


// animate();


export {listaEspacios,listaRiesgos,listaPersonas,listaAntecedentes,listaRecomendaciones}