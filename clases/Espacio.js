export default class Espacio{
    constructor(id,tipo,actividad,cantidadPersonas,tamaño,nivelRiesgo,listaRiesgos,listaPersonas){
        this.id=id;
        this.tipo=tipo;
        this.actividad=actividad;
        this.cantidadPersonas=cantidadPersonas;
        this.tamaño=tamaño;
        this.nivelRiesgo=nivelRiesgo;
        this.listaRiesgos=listaRiesgos;
        this.listaPersonas=listaPersonas;
    };
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    // Getter y setter para tipo
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }

    // Getter y setter para actividad
    getActividad() {
        return this.actividad;
    }
    setActividad(actividad) {
        this.actividad = actividad;
    }

    // Getter y setter para cantidadPersonas
    getCantidadPersonas() {
        return this.cantidadPersonas;
    }
    setCantidadPersonas(cantidadPersonas) {
        this.cantidadPersonas = cantidadPersonas;
    }

    // Getter y setter para tamaño
    getTamaño() {
        return this.tamaño;
    }
    setTamaño(tamaño) {
        this.tamaño = tamaño;
    }

    // Getter y setter para nivelRiesgo
    getNivelRiesgo() {
        return this.nivelRiesgo;
    }
    setNivelRiesgo(nivelRiesgo) {
        this.nivelRiesgo = nivelRiesgo;
    }

    // Getter y setter para listaRiesgos
    getListaRiesgos() {
        return this.listaRiesgos;
    }
    setListaRiesgos(listaRiesgos) {
        this.listaRiesgos = listaRiesgos;
    }

    // Getter y setter para listaPersonas
    getListaPersonas() {
        return this.listaPersonas;
    }
    setListaPersonas(listaPersonas) {
        this.listaPersonas = listaPersonas;
    }
}