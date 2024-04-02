export default class Riesgo{
    constructor(nombre,descripcion,listaTipoRiesgos){
        this.nombre=nombre;
        this.descripcion=descripcion;
        //this.tipoDeRiesgo=tipoDeRiesgo;
    }
    // Getter y setter para nombre
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }

    // Getter y setter para descripcion
    getDescripcion() {
        return this.descripcion;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    // Getter y setter para listaTipoRiesgos
    getListaTipoRiesgos() {
        return this.listaTipoRiesgos;
    }
    setListaTipoRiesgos(listaTipoRiesgos) {
        this.listaTipoRiesgos = listaTipoRiesgos;
    }
}