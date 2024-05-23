import Riesgo from './clases/Riesgo'
import Persona from './clases/Persona'
import Antecedente from './clases/Antecedente';
import Espacio from './clases/Espacio';

//Creación de listas de objetos

//Creacion de personas
import personasData from './data/personas.json'
const listaPersonas = [] //Arreglo de elementos de tipo Persona.
personasData.forEach((personaData)=>{
  const persona = new Persona(personaData.id,personaData.nombre,personaData.edad,personaData.listaAntecedentes)
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
  const riesgo = new Riesgo(riesgoData.id,riesgoData.nombre,riesgoData.descripcion,riesgoData.alcanceDelRiesgo,riesgoData.tipoEspacio,riesgoData.factorRiesgo)
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
    let cantidadRiesgosAgregar = 30;
    for (let i = 0; i < cantidadRiesgosAgregar; i++) {
      let riesgoRandom = listaRiesgos[parseInt(Math.random() * listaRiesgos.length)];
      let espaciosFiltrados = listaEspacios.filter(espacio => espacio.tipo === riesgoRandom.tipoEspacio);
      let espacioRandom;
      do {
        espacioRandom = espaciosFiltrados[parseInt(Math.random() * espaciosFiltrados.length)];
      } while (espacioRandom.listaRiesgos.includes(riesgoRandom));

      espacioRandom.listaRiesgos.push(riesgoRandom);
    }
    
      
      // animate();
//________________________________________________________________________________________________________________________________
// Asignar riesgo inicial a cada espacio
  // listaEspacios.forEach(espacio => {
  //   let riesgoTotal = 0;

  //   // Sumar los factores de riesgo de los riesgos en el espacio
  //   riesgoTotal += espacio.getRiesgoInicial();

  //   // Sumar los factores de riesgo de los riesgos en el espacio
  //   espacio.listaRiesgos.forEach(riesgo => {
  //     riesgoTotal += riesgo.factorRiesgo;
  //   });
    
  //   // Sumar los niveles de peligrosidad de los antecedentes de las personas en el espacio
  //   espacio.listaPersonas.forEach(persona => {
  //     persona.listaAntecedentes.forEach(antecedente => {
  //       riesgoTotal += antecedente.nivelPeligrosidad;
  //     });
  //   });

  //   // Asignar el riesgo total al espacio
  //   espacio.setRiesgoInicial(espacio.getRiesgoInicial() + riesgoTotal);
  //   espacio.setNivelRiesgo(espacio.getRiesgoInicial());
  //   console.log(`Nombre ${espacio.getNombre()} Riesgo Inicial: ${espacio.getRiesgoInicial()}`)
  // });
  //________________________________________________________________________________________________________________________________
  //Propagacion
  // listaEspacios.forEach(espacio => {
  //   let riesgoInicial = espacio.getRiesgoInicial();
  //   let riesgoPropagacion = riesgoInicial * 0.25;
    
  //   espacio.listaRiesgos.forEach(riesgo => {
  //     if (riesgo.alcanceDelRiesgo === 'Zonal') {
  //       // Propagar a vecinos
  //       espacio.listaVecinos.forEach(idVecino => {
  //         let vecino = listaEspacios.find(esp => esp.id === idVecino);
  //         if (vecino) {
  //           vecino.setRiesgoInicial(vecino.getRiesgoInicial() + riesgoPropagacion);
  //         }
  //       });
  //     } else if (riesgo.alcanceDelRiesgo === 'Global') {
  //       // Propagar a todos los espacios
  //       listaEspacios.forEach(esp => {
  //         esp.setRiesgoInicial(esp.getRiesgoInicial() + riesgoPropagacion);
  //       });
  //     }
  //   });
  //   //espacio.setNivelRiesgo(Math.floor(espacio.getRiesgoInicial()));
  //   console.log(`Nombre ${espacio.getNombre()} Riesgo Total: ${espacio.getRiesgoInicial()}`)
  // });

  //Asignar riesgo local
listaEspacios.forEach((espacio)=>{
    let riesgosLocales = espacio.listaRiesgos.filter((riesgo)=>riesgo.alcanceDelRiesgo=='Local');
    espacio.listaPersonas.forEach(persona => {
      persona.listaAntecedentes.forEach(antecedente => {
        espacio.riesgoLocal += antecedente.nivelPeligrosidad;
      });
    });
    riesgosLocales.forEach((riesgo)=>{
      espacio.riesgoLocal += riesgo.factorRiesgo;
    })
  })


  //Asignar riesgo Zonal
  let nodosNotificados = []
  listaEspacios.forEach((espacio)=>{
    let riesgosZonales = espacio.listaRiesgos.filter((riesgo)=>riesgo.alcanceDelRiesgo=='Zonal');
    // console.log("------------------------------------------")
    // console.log("Espacio "+espacio.id)
    // console.log(riesgosZonales)
    
    riesgosZonales.forEach((riesgo)=>{
      espacio.riesgoZonal += riesgo.factorRiesgo;
      espacio.riesgoLocal += riesgo.factorRiesgo;
    })
    
    if(espacio.listaRiesgos.filter((riesgo)=>riesgo.alcanceDelRiesgo=='Zonal').length >0){
      espacio.listaVecinos.forEach((vecino)=>{
        let vecinoMemoria = listaEspacios.find((n)=>n.id == vecino);
        vecinoMemoria.riesgoLocal += espacio.riesgoZonal*0.25;
        // console.log(`Vecino ${vecinoMemoria.id} recibe ${espacio.riesgoZonal*0.25} riesgo de ${espacio.id}`)
      })
    }
  })

  //Asignar riesgo Global
  let listaEspaciosConRiesgoGlobal = []
  let notificados = []
  listaEspacios.forEach((espacio)=>{
    let riesgosGlobales = espacio.listaRiesgos.filter((riesgo)=>riesgo.alcanceDelRiesgo=='Global');

    riesgosGlobales.forEach((riesgo)=>{
      espacio.riesgoGlobal += riesgo.factorRiesgo;
      espacio.riesgoLocal += riesgo.factorRiesgo;
      if(!listaEspaciosConRiesgoGlobal.includes(espacio)){
        listaEspaciosConRiesgoGlobal.push(espacio);
      }
    })
  })

  console.log('----------------------------------------')
  console.log(`Espacios con riegos globales ${listaEspaciosConRiesgoGlobal.map((e)=>e.id)}`)

  listaEspaciosConRiesgoGlobal.forEach((espacio)=>{
    let nodosVecinos = [...espacio.listaVecinos];
    let riesgo = espacio.riesgoGlobal;
    console.log('---------------------------------------------')
    console.log(`Espacio ${espacio.id} riesgo ${riesgo}`);
    let listaVisitados = []
    listaVisitados.push(parseInt(espacio.id))
    do {
      let nuevosVecinos = [];
  
      riesgo = riesgo / 2;
  
      nodosVecinos.forEach((idVecino) => {
        let vecino = listaEspacios.find((e) => parseInt(e.id) == parseInt(idVecino));
  
        if (vecino && !listaVisitados.includes(parseInt(idVecino))) {
          vecino.riesgoLocal += riesgo;
          console.log(`Vecino actualizado ${vecino.id} con riesgo ${riesgo}`);
          listaVisitados.push(parseInt(idVecino));
  
          vecino.listaVecinos.forEach((v) => {
            if (!listaVisitados.includes(parseInt(v)) && !nuevosVecinos.includes(parseInt(v))) {
              // console.log(`Id entra ${v} por ${vecino.id}`)
              nuevosVecinos.push(parseInt(v));
            }
          });
        }
      });
      console.log(`Lista visitados ${listaVisitados}`)
      console.log(`Nuevos vecinos ${nuevosVecinos}`);
      nodosVecinos = nuevosVecinos;
  
    } while (nodosVecinos.length > 0);

  })

export {listaEspacios,listaRiesgos,listaPersonas,listaAntecedentes,listaRecomendaciones}