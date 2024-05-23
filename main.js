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
let cantidadAntecedentesRandom = 150
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
    let cantidadRiesgosAgregar = 20;
    for (let i = 0; i < cantidadRiesgosAgregar; i++) {
      let riesgoRandom = listaRiesgos[parseInt(Math.random() * listaRiesgos.length)];
      let espaciosFiltrados = listaEspacios.filter(espacio => espacio.tipo === riesgoRandom.tipoEspacio);
      let espacioRandom;
      do {
        espacioRandom = espaciosFiltrados[parseInt(Math.random() * espaciosFiltrados.length)];
      } while (espacioRandom.listaRiesgos.includes(riesgoRandom));

      espacioRandom.listaRiesgos.push(riesgoRandom);
    }
  
  //Cargar recomendaciones al espacio por riesgo
  let espaciosConRiesgos = listaEspacios.filter((e)=>e.listaRiesgos.length>0);
  espaciosConRiesgos.forEach((e)=>{
    let listaRecomendacionesRiesgo;
    e.listaRiesgos.forEach((r)=>{
      listaRecomendacionesRiesgo = listaRecomendaciones.filter((reco)=>reco.idRiesgo==r.id);
    })

    e.listaRecomendaciones = [...e.listaRecomendaciones,listaRecomendacionesRiesgo]
  })


  //Cargar recomendaciones al espacio por antecedente
  let espaciosConPersonas = listaEspacios.filter((e)=>e.listaPersonas.length>0);
  espaciosConPersonas.forEach((e)=>{
    let recomendacionesPorAntecedente;
    let personasConAntecedentes = e.listaPersonas.filter((p)=>p.listaAntecedentes.length>0);
    personasConAntecedentes.forEach((persona)=>{
      let recomendaciones
      persona.listaAntecedentes.forEach((antecedente)=>{
        recomendaciones = listaRecomendaciones.filter((r)=>r.idAntecedente==antecedente.id);
        
      })
      e.listaRecomendaciones = [...e.listaRecomendaciones,recomendaciones];
    })
  })

// Método para mover a los habitantes y organizarlos por nivel de peligrosidad
function moverHabitantes() {
  // Calcular el riesgo total de cada habitante
  listaPersonas.forEach(persona => {
    persona.riesgoTotal = persona.listaAntecedentes.reduce((total, antecedente) => total + antecedente.nivelPeligrosidad, 0);
  });

  // Ordenar a los habitantes por riesgo total de manera descendente
  const habitantesOrdenados = [...listaPersonas].sort((a, b) => b.riesgoTotal - a.riesgoTotal);

  // Filtrar las habitaciones y ordenarlas de la más alta a la más baja
  const habitacionesOrdenadas = listaEspacios.filter(espacio => espacio.tipo === 'Habitacion').sort((a, b) => parseInt(b.id) - parseInt(a.id));

  // Limpiar los habitantes actuales de las habitaciones
  habitacionesOrdenadas.forEach(habitacion => {
    habitacion.listaPersonas = [];
    habitacion.cantidadPersonas = 0;
  });

  // Asignar los habitantes a las habitaciones
  let indexHabitacion = 0;
  habitantesOrdenados.forEach(habitante => {
    let habitacionActual = habitacionesOrdenadas[indexHabitacion];
    if (habitacionActual.cantidadPersonas < 5) {
      habitacionActual.listaPersonas.push(habitante);
      habitacionActual.cantidadPersonas++;
    } else {
      indexHabitacion++;
      habitacionActual = habitacionesOrdenadas[indexHabitacion];
      habitacionActual.listaPersonas.push(habitante);
      habitacionActual.cantidadPersonas++;
    }
  });
};
function riesgosEspacio(){
  //Asignar riesgo local
  listaEspacios.forEach((espacio)=>{
    espacio.riesgoLocal = 0;
    espacio.riesgoZonal = 0;
    espacio.riesgoGlobal = 0;
    // console.log(`Espacio ${espacio.id} 
    // locales ${espacio.riesgoLocal}
    // zonales ${espacio.riesgoZonal}
    // globales ${espacio.riesgoGlobal}`)
  });
  listaEspacios.forEach((espacio)=>{
    
    let riesgosLocales = espacio.listaRiesgos.filter((riesgo)=>riesgo.alcanceDelRiesgo=='Local');
    riesgosLocales.forEach((riesgo)=>{
      espacio.riesgoLocal += riesgo.factorRiesgo;
    })
    // console.log(`Espacio ${espacio.id} Riesgos locales ${espacio.riesgoLocal}`)
    espacio.listaPersonas.forEach(persona => {
      persona.listaAntecedentes.forEach(antecedente => {
        espacio.riesgoZonal += antecedente.nivelPeligrosidad;
        espacio.riesgoLocal += antecedente.nivelPeligrosidad;
      });
    });
    // console.log(`Espacio ${espacio.id} Riesgos Personas ${espacio.riesgoZonal}`)
  })

  //Asignar riesgo Zonal
  let nodosNotificados = []
  listaEspacios.forEach((espacio)=>{
    let riesgosZonales = espacio.listaRiesgos.filter((riesgo)=>riesgo.alcanceDelRiesgo=='Zonal');
    riesgosZonales.forEach((riesgo)=>{
      espacio.riesgoZonal += riesgo.factorRiesgo;
      espacio.riesgoLocal += riesgo.factorRiesgo;
    })
    // console.log(`Espacio ${espacio.id} Riesgos Zonales (Persona+Zonales) ${espacio.riesgoZonal}`)
    
    if(espacio.listaRiesgos.filter((riesgo)=>riesgo.alcanceDelRiesgo=='Zonal').length >0){
      espacio.listaVecinos.forEach((vecino)=>{
        let vecinoMemoria = listaEspacios.find((n)=>n.id == vecino);
        vecinoMemoria.riesgoLocal += espacio.riesgoZonal*0.25;
        // console.log(`Espacio ${vecinoMemoria.id} recibe ${espacio.riesgoZonal*0.25} riesgo de ${espacio.id}`)
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

  listaEspaciosConRiesgoGlobal.forEach((espacio)=>{
    let nodosVecinos = [...espacio.listaVecinos];
    let riesgo = espacio.riesgoGlobal;
    let listaVisitados = []
    listaVisitados.push(parseInt(espacio.id))
    do {
      let nuevosVecinos = [];
      
      riesgo = riesgo / 2;

      nodosVecinos.forEach((idVecino) => {
        let vecino = listaEspacios.find((e) => parseInt(e.id) == parseInt(idVecino));
        
        if (vecino && !listaVisitados.includes(parseInt(idVecino))) {
          vecino.riesgoLocal += riesgo;
          listaVisitados.push(parseInt(idVecino));
          
          // console.log(`Espacio ${vecino.id} recibe ${riesgo} Riesgo Global de ${espacio.id}`)
          vecino.listaVecinos.forEach((v) => {
            if (!listaVisitados.includes(parseInt(v)) && !nuevosVecinos.includes(parseInt(v))) {
              // console.log(`Id entra ${v} por ${vecino.id}`)
              nuevosVecinos.push(parseInt(v));
            }
          });
        }
      });
      nodosVecinos = nuevosVecinos;

    } while (nodosVecinos.length > 0);

  })
  // listaEspacios.forEach((espacio)=>{
  //   console.log(`Espacio ${espacio.id} 
  //   locales ${espacio.riesgoLocal}
  //   zonales ${espacio.riesgoZonal}
  //   globales ${espacio.riesgoGlobal}`)
  // });
}
riesgosEspacio()
export {listaEspacios,listaRiesgos,listaPersonas,listaAntecedentes,listaRecomendaciones, moverHabitantes, riesgosEspacio}
