/* ---- FUNCIONES FLOTA ---- */

class FlotaJugador {
    //Constructor tablero
    constructor(tipoB,long,direc,mapa,inicioH, inicioV, finH, finV){
        this.mapa = mapa;
        this.long = long;
        this.tipoB = tipoB;
        this.direc = direc; //0- horizontal, 1-vertical
        this.inicioH = inicioH, this.inicioV = inicioV, this.finH = finH, this.finV = finV;
        console.log("inicioH1 " + inicioH);
        console.log("finH1 " + finH);
        console.log("inicioV1 " + inicioV);
                console.log("finV1 " + finV);
       // this.iniciarTablero(); //asigna tablero a los jugadores
        this.barcos = [ //Se guardan en un array los barcos disponibles por cada jugador
            [1, new Barco(4)], //1 portaviones de 4 espacios
            [2, new Barco(3)], //2 acorazados de 3 espacios
            [3, new Barco(2)], //3 cruceros de 2 espacios
            [4, new Barco(1)] //4 destructores de 1 espacios
        ];
    } 
    crearBarco(){
        console.log("manual pulsado 1");
        if (this.setBarcoMan(this.inicioH, this.inicioV, this.finH, this.finV, this.barcos[this.tipoB][1]) == true){
            console.log("return true");
            return true;}
    }

    setBarcoMan(inicioH, inicioV, finH, finV, barco) {
        console.log("setBarco 1");
        // Revisamos si existe un barco en esa posicion o en sus alrededores
        
            // guardamos el barco en array de 
        for (let i = inicioH; i <= finH; i++) {
            console.log("inicioH " + inicioH);
            console.log("finH " + finH);
            console.log("inicioV " + inicioV);
                console.log("finV " + finV);
            for (let j = inicioV; j <= finV; j++) {
                console.log("i " + i);
                console.log("j " + j);
                console.log("clases " + `j-${i}-${j}`);
                document.getElementById(`j-${i}-${j}`).className = "colocado";
                this.mapa[i][j] = 1;
                barco.posiciones.set(`j-${i}-${j}`, 1);
            }
        }
        return this.mapa;
    }
}