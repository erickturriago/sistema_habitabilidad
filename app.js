const btnEspacios = document.querySelector('.btnEspacios')
const btnRiesgos = document.querySelector('.btnRiesgos')
const btnPersonas = document.querySelector('.btnPersonas')
const btnAntecedentes = document.querySelector('.btnAntecedentes')
const btnRecomendaciones = document.querySelector('.btnRecomendaciones')

const btnShowGrafo = document.querySelector('.btnShowGrafo')
const divGrafo = document.querySelector('.divGrafo');
const closeGraph = document.querySelector('.closeGraph')
const closeModal = document.querySelector('.closeModal');

const headTable = document.querySelector('.headTable')
const bodyTable = document.querySelector('.bodyTable')

const btnPlay = document.createElement('button');
btnPlay.innerHTML = '<i class="fas fa-play"></i>';
btnPlay.classList.add('btnPlay');
document.body.appendChild(btnPlay);

import { listaEspacios, listaRiesgos, listaPersonas, listaAntecedentes, listaRecomendaciones, moverHabitantes, riesgosEspacio } from "./main"
import { animate, setAnimate, setMaterial } from './grafo'

btnEspacios.addEventListener(('click'), () => {
  headTable.innerHTML = ''
  bodyTable.innerHTML = ''
  const headerEspacios = `
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Tipo Espacio</th>
            <th># Habitantes</th>
            <th>Tamaño</th>
            <th>Nivel Riesgo</th>
            <th>Riesgos</th>
            <th>Habitantes</th>
            <th>Vecinos</th>
        </tr>
    `
  headTable.innerHTML = headerEspacios
  listaEspacios.forEach((espacio) => {
    const fila = `
            <tr>
                <td>${espacio.id}</td>
                <td>${espacio.nombre}</td>
                <td>${espacio.tipo}</td>
                <td>${espacio.cantidadPersonas}</td>
                <td>${espacio.tamaño}</td>
                <td>${Number(espacio.riesgoLocal.toFixed(2))}</td>
                <td>${espacio.listaRiesgos.map((riesgo) => { return riesgo.id })}</td>
                <td>${espacio.listaPersonas.map((persona) => { return persona.id })}</td>
                <td>${espacio.listaVecinos}</td>
            </tr>
        `
    bodyTable.innerHTML += fila
  })
})
btnRiesgos.addEventListener(('click'), () => {
  headTable.innerHTML = ''
  bodyTable.innerHTML = ''
  const headerRiegos = `
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Alcance</th>
            <th>Tipo Espacio</th>
            <th>Peligrosidad</th>
        </tr>
    `
  headTable.innerHTML = headerRiegos
  listaRiesgos.forEach((riesgo) => {
    const fila = `
            <tr>
                <td>${riesgo.id}</td>
                <td>${riesgo.nombre}</td>
                <td>${riesgo.descripcion}</td>
                <td>${riesgo.alcanceDelRiesgo}</td>
                <td>${riesgo.tipoEspacio}</td>
                <td>${riesgo.factorRiesgo}</td>
            </tr>
        `
    bodyTable.innerHTML += fila
  })
})
btnPersonas.addEventListener(('click'), () => {
  headTable.innerHTML = ''
  bodyTable.innerHTML = ''
  const headerPersonas = `
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Antecedentes</th>
        </tr>
    `
  headTable.innerHTML = headerPersonas
  listaPersonas.forEach((persona) => {
    const fila = `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.edad}</td>
                <td>${persona.listaAntecedentes.map((antecedente) => { return antecedente.id })}</td>
            </tr>
        `
    bodyTable.innerHTML += fila
  })
})
btnAntecedentes.addEventListener(('click'), () => {
  headTable.innerHTML = ''
  bodyTable.innerHTML = ''
  const headerAntecedentes = `
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Peligrosidad</th>
        </tr>
    `
  headTable.innerHTML = headerAntecedentes
  listaAntecedentes.forEach((antecedente) => {
    const fila = `
            <tr>
                <td>${antecedente.id}</td>
                <td>${antecedente.nombre}</td>
                <td>${antecedente.descripcion}</td>
                <td>${antecedente.nivelPeligrosidad}</td>
            </tr>
        `
    bodyTable.innerHTML += fila
  })
})
btnRecomendaciones.addEventListener(('click'), () => {
  headTable.innerHTML = ''
  bodyTable.innerHTML = ''
  const headerRecomendaciones = `
        <tr>
            <th>Espacio</th>
            <th>Riesgo</th>
            <th>Recomendacion</th>
        </tr>
    `
  headTable.innerHTML = headerRecomendaciones
  listaEspacios.forEach((espacio) => {
    if (espacio.listaRiesgos.length > 0) {
      espacio.listaRiesgos.forEach((riesgo)=> {
        const recomendacion = listaRecomendaciones.find((recomendacion) => recomendacion.idRiesgo === riesgo.id)
        if (recomendacion) {
          const fila = `
                  <tr>
                      <td>${espacio.nombre}</td>
                      <td>${riesgo.id}</td>
                      <td>${recomendacion.descripcion}</td>
                  </tr>
              `
          bodyTable.innerHTML += fila
        }
      });
    }
  })
})

const mostrarModalEspacio = (espacio)=>{
  const backModal = document.querySelector('.backgroundModal')
  backModal.classList.remove('modalOculto');
  console.log(espacio)

  const modal = document.querySelector('.modalInfoEspacio');
  modal.innerHTML = ``

  let templateString =``
  templateString +=
  `
    <h2>${espacio.nombre}</h2>
    <div>
      <p>Tipo: ${espacio.tipo}</p>
      <p>Riesgo: ${espacio.riesgoLocal}</p>
    </div>
  `;

  templateString +=
  `
  <h3>Habitantes</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Antecedente</th>
        <th>Peligro</th>
      </tr>
    </thead>
    <tbody>
      ${
        espacio.listaPersonas.flatMap((p) => {
          return p.listaAntecedentes.map((a) => {
            return `
              <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${a.nombre}</td>
                <td>${a.nivelPeligrosidad}</td>
              </tr>
            `;
          });
        }).join('') // Agregar join para unir las filas de la tabla
      }
    </tbody>
  </table>
  `;

  templateString +=
  `
  <h3>Riesgos</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Alcance</th>
        <th>Riesgo</th>
      </tr>
    </thead>
    <tbody>
      ${espacio.listaRiesgos.map((r) => {
        return `
          <tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.alcanceDelRiesgo}</td>
            <td>${r.factorRiesgo}</td>
          </tr>
        `;
      }).join('')} <!-- Agregar join para unir las filas de la tabla -->
    </tbody>
  </table>
  `;
  

  templateString +=
  `
  <h3>Recomendaciones</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Descripción</th>
        <th>Riesgo</th>
        <th>Antecedente</th>
      </tr>
    </thead>
    <tbody>
    ${espacio.listaRecomendaciones.map((r) => {
      // Buscar la descripción del riesgo por su ID
      const riesgo = listaRiesgos.find((riesgo) => riesgo.id === r[0].idRiesgo);
      // Buscar la descripción del antecedente por su ID
      const antecedente = listaAntecedentes.find((antecedente) => antecedente.id === r[0].idAntecedente);
      
      // Renderizar la fila de la tabla con las descripciones encontradas
      return `
        <tr>
          <td>${r[0].descripcion}</td>
          <td>${riesgo ? riesgo.descripcion : 'No disponible'}</td>
          <td>${antecedente ? antecedente.descripcion : 'No disponible'}</td>
        </tr>
      `;
    }).join('')}
    </tbody>
  </table>
  `;
  

  modal.innerHTML+=templateString;
}
btnShowGrafo.addEventListener(('click'), () => {
  divGrafo.removeAttribute('hidden')
  setAnimate(true)
  animate()
})
closeGraph.addEventListener('click', () => {
  divGrafo.setAttribute('hidden', true)
  setAnimate(false)
})

closeModal.addEventListener('click', () => {
  const backModal = document.querySelector('.backgroundModal')
  backModal.classList.add('modalOculto');
})

btnPlay.addEventListener('click', () => {
  moverHabitantes(); // Llama a la función moverHabitantes para organizar los habitantes
  riesgosEspacio(); // Llama a la función riesgosEspacio para calcular el riesgo de cada espacio
  setMaterial(); // Llama a la función setMaterial para actualizar el color de los nodos
  btnEspacios.click(); // Actualiza la tabla de espacios para reflejar los cambios
});

btnEspacios.click(); // Carga los espacios al inicio


export {mostrarModalEspacio}