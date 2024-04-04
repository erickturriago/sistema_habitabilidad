export default class Recomendacion{
    constructor(id,descripcion,idRiesgo,idAntecedente){
        this.id=id;
        this.descripcion=descripcion;
        this.idRiesgo=idRiesgo;
        this.idAntecedente=idAntecedente;
    }
     // Getter y setter para id
     getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    // Getter y setter para descripcion
    getDescripcion() {
        return this.descripcion;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    // Getter y setter para idRiesgo
    getIdRiesgo() {
        return this.idRiesgo;
    }
    setIdRiesgo(idRiesgo) {
        this.idRiesgo = idRiesgo;
    }

    // Getter y setter para idAntecedente
    getIdAntecedente() {
        return this.idAntecedente;
    }
    setIdAntecedente(idAntecedente) {
        this.idAntecedente = idAntecedente;
    }
}