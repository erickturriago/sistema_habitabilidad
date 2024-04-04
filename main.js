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
    const espacioMemoria = new Espacio(espacio.id,espacio.nombre,espacio.tipo,"Vivienda",0,200,0,[],[],espacio.vecinos,espacio.coordenadas)
    listaEspacios.push(espacioMemoria)
  })
})

console.log(listaEspacios)

import recomendacionesData from './data/recomendaciones.json'
import Recomendacion from './clases/Recomendacion';
const listaRecomendaciones = []
recomendacionesData.RiesgosRecomendaciones.forEach((recomendacion)=>{
  const recomendacionMemoria = new Recomendacion(recomendacion.id,recomendacion.descripcion,recomendacion.idRiesgo,recomendacion.idAntecedente)
  listaRecomendaciones.push(recomendacionMemoria)
})

recomendacionesData.AntecedentesRecomendaciones.forEach((recomendacion)=>{
  const recomendacionMemoria = new Recomendacion(recomendacion.id,recomendacion.descripcion,recomendacion.idRiesgo,recomendacion.idAntecedente)
  listaRecomendaciones.push(recomendacionMemoria)
})
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

// animate();


export {listaEspacios,listaRiesgos,listaPersonas,listaAntecedentes,listaRecomendaciones}