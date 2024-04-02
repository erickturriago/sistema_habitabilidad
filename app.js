const btnEspacios = document.querySelector('.btnEspacios')
const btnRiesgos = document.querySelector('.btnRiesgos')
const btnRecomendaciones = document.querySelector('.btnRecomendaciones')

const headTable = document.querySelector('.headTable')
const bodyTable = document.querySelector('.bodyTable')

import { listaEspacios,listaRiesgos} from "./main"

btnEspacios.addEventListener(('click'),()=>{
    headTable.innerHTML=''
    bodyTable.innerHTML=''
    const headerEspacios = `
        <tr>
            <th>Id</th>
            <th>Tipo Esp</th>
            <th>Actividad</th>
            <th># Habitantes</th>
            <th>Tamaño</th>
            <th>Nivel Riesgo</th>
            <th>Riesgos</th>
            <th>Habitantes</th>
        </tr>
    `
    headTable.innerHTML = headerEspacios
    listaEspacios.forEach((espacio)=>{
        const fila = `
            <tr>
                <td>${espacio.id}</td>
                <td>${espacio.tipo}</td>
                <td>${espacio.actividad}</td>
                <td>${espacio.cantidadPersonas}</td>
                <td>${espacio.tamaño}</td>
                <td>${espacio.nivelRiesgo}</td>
                <td>${espacio.listaRiesgos.map((riesgo)=>{return riesgo.id})}</td>
                <td>${espacio.listaPersonas.map((persona)=>{return persona.id})}</td>
            </tr>
        `
        bodyTable.innerHTML+=fila
    })
})
btnRiesgos.addEventListener(('click'),()=>{
    headTable.innerHTML=''
    bodyTable.innerHTML=''
    const headerEspacios = `
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Alcance</th>
            <th>Tipo Espacio</th>
        </tr>
    `
    headTable.innerHTML = headerEspacios
    listaRiesgos.forEach((riesgo)=>{
        const fila = `
            <tr>
                <td>${riesgo.id}</td>
                <td>${riesgo.nombre}</td>
                <td>${riesgo.descripcion}</td>
                <td>${riesgo.alcanceDelRiesgo}</td>
                <td>${riesgo.tipoEspacio}</td>
            </tr>
        `
        bodyTable.innerHTML+=fila
    })
})
btnRecomendaciones.addEventListener(('click'),()=>{
    console.log("click btnRecomendaciones")
})