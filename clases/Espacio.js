export default class Espacio{
    constructor(id,nombre,tipo,actividad,cantidadPersonas,tamaño,nivelRiesgo,listaRiesgos,listaPersonas,listaVecinos,coordenadas){
        this.id=id;
        this.nombre=nombre;
        this.tipo=tipo;
        this.actividad=actividad;
        this.cantidadPersonas=cantidadPersonas;
        this.tamaño=tamaño;
        this.listaRiesgos=listaRiesgos;
        this.listaPersonas=listaPersonas;
        this.listaVecinos=listaVecinos;
        this.coordenadas=coordenadas;
        this.nodoThree=null;
        this.riesgoLocal=0;
        this.riesgoZonal=0;
        this.riesgoGlobal=0;
        this.riesgoTemp=0;
        this.listaRecomendaciones=[]
    };
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getNombre(){
        return this.nombre;
    }
    setNombre(nombre){
        this.nombre=nombre;
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

    // Getter y setter para riesgo local
    getRiesgoLocal() {
        return this.riesgoLocal;
    }
    setRiesgoLocal(riesgoLocal) {
        this.riesgoLocal = riesgoLocal;
    }

    // Getter y setter para riesgo zonal
    getRiesgoZonal() {
        return this.riesgoZonal;
    }
    setRiesgoZonal(riesgoZonal) {
        this.riesgoZonal = riesgoZonal;
    }

    // Getter y setter para riesgo global
    getRiesgoGlobal() {
        return this.riesgoGlobal;
    }
    setRiesgoGlobal(riesgoGlobal) {
        this.riesgoGlobal = riesgoGlobal;
    }
    
}