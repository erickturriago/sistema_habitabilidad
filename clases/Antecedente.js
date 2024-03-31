export default class Antecedente{
    constructor(id,nombre,descripcion,nivelPeligrosidad){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.nivelPeligrosidad=nivelPeligrosidad;
    }
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getNivelPeligrosidad() {
        return this.nivelPeligrosidad;
    }

    setNivelPeligrosidad(nivelPeligrosidad) {
        this.nivelPeligrosidad = nivelPeligrosidad;
    }
}