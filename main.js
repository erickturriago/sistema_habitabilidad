
import Nodo from './clases/Nodo';
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


// Crear nodos del grafo
const edificio = []
const nodos = []
const alturaEdificio = 10

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





// animate();


export {listaEspacios,listaRiesgos,listaPersonas,listaAntecedentes,listaRecomendaciones,nodos}