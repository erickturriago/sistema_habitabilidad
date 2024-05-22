export default class Riesgo{
    constructor(id,nombre,descripcion,alcanceDelRiesgo,tipoEspacio,factorRiesgo){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.alcanceDelRiesgo=alcanceDelRiesgo;
        this.tipoEspacio=tipoEspacio;
        this.factorRiesgo=factorRiesgo;
    }
    // Getter y setter para id
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
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

    // Getter y setter para alcanceDelRiesgo
    getAlcanceDelRiesgo() {
        return this.alcanceDelRiesgo;
    }
    setAlcanceDelRiesgo(alcanceDelRiesgo) {
        this.alcanceDelRiesgo = alcanceDelRiesgo;
    }

    // Getter y setter para tipoEspacio
    getTipoEspacio() {
        return this.tipoEspacio;
    }
    setTipoEspacio(tipoEspacio) {
        this.tipoEspacio = tipoEspacio;
    }
    // Getter y setter para factorRiesgo
    getFactorRiesgo() {
        return this.factorRiesgo;
    }
    setFactorRiesgo(factorRiesgo) {
        this.factorRiesgo = factorRiesgo;
    }
}