/* ---- FUNCIONES BARCO ---- */

class Barco {

    constructor(tipo) {
        this.tipo = tipo;
        this.direccion = 0;
        this.posiciones = new Map();
        this.tocado = false;
        this.hundido = false;		
    }
}