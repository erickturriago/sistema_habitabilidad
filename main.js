import * as THREE from 'three';
import Nodo from './clases/Nodo';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Riesgo from './clases/Riesgo'
import Persona from './clases/Persona'
import Antecedente from './clases/Antecedente';

// Riesgos locativos: Puertas dañadas o defectuosas, Pisos dañados o resbaladizos, Techos dañados o con filtraciones, Escaleras desgastadas o en mal estado, Instalaciones eléctricas inseguras, Sistemas de fontanería defectuosos, Presencia de plagas

// Riesgos sociales: Barrio peligroso o inseguro, Vecinos con antecedentes criminales, Falta de comunidad cohesionada, Presencia de pandillas o grupos delictivos, Acceso limitado a servicios y recursos comunitarios


//Creacion de personas
import personasData from './data/personas.json'
const listaPersonas = [] //Arreglo de elementos de tipo Persona.
personasData.forEach((personaData)=>{
  const persona = new Persona(personaData.id,personaData.nombre,personaData.edad)
  listaPersonas.push(persona)
})
// console.log(listaPersonas)

// Creacion antecedentes
import antecedentesData from './data/antecedentes.json'
const listaAntecedentes = []
antecedentesData.forEach((antecedenteData)=>{
  const antecedente = new Antecedente(antecedenteData.id,antecedenteData.nombre,antecedenteData.descripcion,antecedenteData.nivelPeligrosidad)
  listaAntecedentes.push(antecedente)
})
// console.log(listaAntecedentes)


//Creacion riesgos
import riesgosData from './data/riesgos.json'
const listaRiesgos = []
riesgosData.forEach((riesgoData)=>{
  const riesgo = new Riesgo(riesgoData.id,riesgoData.nombre,riesgoData.descripcion,riesgoData.tipoDeRiesgo)
})
// console.log(listaAntecedentes)






// return 0;

// Inicializar Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

// Crear nodos del grafo
const nodes = [];
const edificio = []
const alturaEdificio = 10
const nodeGeometry = new THREE.SphereGeometry(0.4, 20, 20);
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const numNodes = 20;
const radius = 5;


//Crear edificio
for(let k=0;k<alturaEdificio;k++){
  const array = new Array(10);
  for(let i=0;i<array.length;i++){
    const array2=new Array(10)
    for(let j=0;j<array2.length;j++){
      const nodo = new Nodo()
      nodo.posX=j
      nodo.posY=i
      nodo.posZ=k

      nodo.nombre = `Nodo piso ${nodo.posZ} ${nodo.posY} ${nodo.posX}`

      array2[j]=nodo
    }
    array[i]=array2
  }
  edificio.push(array);
}

// Agregar vecinos a cada nodo
for(let k=0;k<alturaEdificio;k++){
  const piso =edificio[k]
  for(let i=0;i<piso.length;i++){
    for(let j=0;j<piso[i].length;j++){
        const nodo = edificio[k][i][j]

        //Agregar vecino de arriba y abajo
        if(k>0 && k<alturaEdificio-1){
          nodo.vecinos.push(edificio[k-1][i][j])
          nodo.vecinos.push(edificio[k+1][i][j])
        }
        else if(k==0 && k<alturaEdificio-1){
          nodo.vecinos.push(edificio[k+1][i][j])
        }
        else if(k==alturaEdificio-1 && alturaEdificio>0){
          nodo.vecinos.push(edificio[k-1][i][j])
        }

        if(i>0 && i<piso.length-1){
          nodo.vecinos.push(edificio[k][i-1][j])
          nodo.vecinos.push(edificio[k][i+1][j])
        }

        if(j>0 && j<piso[i].length-1){
          nodo.vecinos.push(edificio[k][i][j-1])
          nodo.vecinos.push(edificio[k][i][j+1])
        }
    }
  }
}

//Agregar nodos al grafo
edificio.forEach((piso)=>{
  for(let i=0;i<piso.length;i++){
    for(let j=0;j<piso[i].length;j++){
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

          const x = piso[i][j].posX*4;
          const y = piso[i][j].posY*4;
          const z = piso[i][j].posZ*5;

          node.position.set(x, y, z);
          scene.add(node);
          nodes.push(node);

          piso[i][j].nodoThree=node;
          // console.log(piso[i][j].nombre)
    }
  }
})

// Agregar aristas
const edgeMaterial = new THREE.LineBasicMaterial({ 
  color: 0xFF0000,
  linewidth: 10,
  linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
});
edificio.forEach((piso)=>{
  for(let i=0;i<piso.length;i++){
    for(let j=0;j<piso[i].length;j++){
        const nodo = piso[i][j]

        for (let l=0;l<nodo.vecinos.length;l++){
          const vecino = nodo.vecinos[l]
          const edgeGeometry = new THREE.BufferGeometry().setFromPoints([nodo.nodoThree.position, vecino.nodoThree.position]);
          const edge = new THREE.Line(edgeGeometry, edgeMaterial);
          scene.add(edge);
          // console.log("Vecino: "+vecino.nombre)
        }
    }
  }
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

animate();