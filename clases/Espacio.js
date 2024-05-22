export default class Espacio{
    constructor(id,nombre,tipo,actividad,cantidadPersonas,tamaño,nivelRiesgo,listaRiesgos,listaPersonas,listaVecinos,coordenadas){
        this.id=id;
        this.nombre=nombre;
        this.tipo=tipo;
        this.actividad=actividad;
        this.cantidadPersonas=cantidadPersonas;
        this.tamaño=tamaño;
        this.nivelRiesgo=nivelRiesgo;
        this.listaRiesgos=listaRiesgos;
        this.listaPersonas=listaPersonas;
        this.listaVecinos=listaVecinos;
        this.coordenadas=coordenadas;
        this.nodoThree=null;
        this.riesgoLocal=0;
        this.riesgoZonal=0;
        this.riesgoGlobal=0;
        this.riesgoTemp=0;
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
    


    // 
    propagarRiesgoGlobal(riesgo,listaEspacios,notificados,idPadre){

        let padre = listaEspacios.find((n)=>n.id==idPadre);
    

        let nodoFueDestino = notificados.filter((n)=>n.destino==parseInt(this.id))

        notificados.push({'origen':parseInt(idPadre),'destino':parseInt(this.id)});

        

        console.log('--------------------------------------')

        console.log("Nodo actual "+this.id)
        console.log(JSON.stringify(nodoFueDestino))
        // console.log(JSON.stringify(notificados))

        this.listaVecinos.forEach(idVecino=>{
            

            let obj = null
            notificados.forEach((n)=>{
                if(n.origen == parseInt(this.id) && n.destino==parseInt(idVecino)){
                    obj = n;
                }
                if(n.origen == parseInt(idVecino) && n.destino==parseInt(this.id)){
                    obj = n;
                }
            })

            if(obj == null){
                if(idPadre==null){
                    this.riesgoTemp=this.riesgoGlobal;
                }
                else if(nodoFueDestino.length==0){
                    console.log("Nodo no ha sido destino")
                    this.riesgoLocal+=padre.riesgoTemp/2;
                    this.riesgoTemp = padre.riesgoTemp/2;
                }
                else{
                    console.log(`Nodo ${this.id} fue destino`)
                    this.riesgoLocal+=padre.riesgoTemp/2;
                }
                if(padre && idPadre==12){
                    console.log(`Aumentando nodo ${this.id} desde padre ${idPadre} en ${padre.riesgoTemp/2}`)
                }
                if(padre && this.id==12){
                    console.log(`Aumentando nodo ${this.id} desde padre ${idPadre} en ${padre.riesgoTemp/2}`)
                }
                let vecino = listaEspacios.find((e)=>e.id==idVecino);
                let mitadRiesgo = 0;
                mitadRiesgo = riesgo/2;
                vecino.propagarRiesgoGlobal(mitadRiesgo,listaEspacios,notificados,this.id);
            }
        })
    }
}