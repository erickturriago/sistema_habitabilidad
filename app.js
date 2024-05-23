const btnEspacios = document.querySelector('.btnEspacios')
const btnRiesgos = document.querySelector('.btnRiesgos')
const btnPersonas = document.querySelector('.btnPersonas')
const btnAntecedentes = document.querySelector('.btnAntecedentes')
const btnRecomendaciones = document.querySelector('.btnRecomendaciones')

const btnShowGrafo = document.querySelector('.btnShowGrafo')
const divGrafo = document.querySelector('.divGrafo');
const closeGraph = document.querySelector('.closeGraph')

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
            <th>Tipo Esp</th>
            <th>Actividad</th>
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
                <td>${espacio.actividad}</td>
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
            <th>Id</th>
            <th>Descripcion</th>
            <th>Riesgo</th>
            <th>Antecedente</th>
        </tr>
    `
  headTable.innerHTML = headerRecomendaciones
  listaRecomendaciones.forEach((recomendacion) => {
    const fila = `
            <tr>
                <td>${recomendacion.id}</td>
                <td>${recomendacion.descripcion}</td>
                <td>${recomendacion.idRiesgo ? recomendacion.idRiesgo : ''}</td>
                <td>${recomendacion.idAntecedente ? recomendacion.idAntecedente : ''}</td>
            </tr>
        `
    bodyTable.innerHTML += fila
  })
})
btnShowGrafo.addEventListener(('click'), () => {
  divGrafo.removeAttribute('hidden')
  setAnimate(true)
  animate()
})
closeGraph.addEventListener('click', () => {
  divGrafo.setAttribute('hidden', true)
  setAnimate(false)
})

btnPlay.addEventListener('click', () => {
  moverHabitantes(); // Llama a la función moverHabitantes para organizar los habitantes
  riesgosEspacio(); // Llama a la función riesgosEspacio para calcular el riesgo de cada espacio
  setMaterial(); // Llama a la función setMaterial para actualizar el color de los nodos
  btnEspacios.click(); // Actualiza la tabla de espacios para reflejar los cambios
});

btnEspacios.click(); // Carga los espacios al inicio