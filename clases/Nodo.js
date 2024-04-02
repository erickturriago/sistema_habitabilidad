export default class Nodo{
    constructor(){
        this.id=undefined
        this.nombre=undefined
        this.vecinos=[]
        this.vecinosNodo=[]
        this.posX=undefined
        this.posY=undefined
        this.posZ=undefined
        this.nodoThree=undefined
        this.tipo=undefined
    };
    // Getter y setter para nombre
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }

    // Getter y setter para vecinos
    getVecinos() {
        return this.vecinos;
    }
    setVecinos(vecinos) {
        this.vecinos = vecinos;
    }

    // Getter y setter para posX
    getPosX() {
        return this.posX;
    }
    setPosX(posX) {
        this.posX = posX;
    }

    // Getter y setter para posY
    getPosY() {
        return this.posY;
    }
    setPosY(posY) {
        this.posY = posY;
    }

    // Getter y setter para posZ
    getPosZ() {
        return this.posZ;
    }
    setPosZ(posZ) {
        this.posZ = posZ;
    }

    // Getter y setter para nodoThree
    getNodoThree() {
        return this.nodoThree;
    }
    setNodoThree(nodoThree) {
        this.nodoThree = nodoThree;
    }
}