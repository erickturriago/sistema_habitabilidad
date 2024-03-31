export default class Persona{
    constructor(id,nombre,edad,listaAntecedentes){
        this.id=id;
        this.nombre=nombre;
        this.edad=edad;
        this.listaAntecedentes=listaAntecedentes;
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

    getEdad() {
        return this.edad;
    }

    setEdad(edad) {
        this.edad = edad;
    }

    getListaAntecedentes() {
        return this.listaAntecedentes;
    }

    setListaAntecedentes(listaAntecedentes) {
        this.listaAntecedentes = listaAntecedentes;
    }
}