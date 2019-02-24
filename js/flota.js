/* ---- FUNCIONES FLOTA ---- */

class Flota {
    //Constructor tablero
    constructor(player,tipoB,long,direc) {
        this.mapa = [];
        this.player = player;
        this.long = long;
        this.tipoB = tipoB;
        this.direc = direc; //0- horizontal, 1-vertical
        this.iniciarTablero(); //asigna tablero a los jugadores
        this.barcos = [ //Se guardan en un array los barcos disponibles por cada jugador
            [1, new Barco(4)], //1 portaviones de 4 espacios
            [2, new Barco(3)], //2 acorazados de 3 espacios
            [3, new Barco(2)], //3 cruceros de 2 espacios
            [4, new Barco(1)] //4 destructores de 1 espacios
        ];
    } 

    iniciarTablero() { //asigna tablero a los jugadores
        for (let i = 0; i <= 9; i++) {
            this.mapa[i] = [];
            for (let j = 0; j <= 9; j++) {
                this.mapa[i][j] = 0;
            }
        }
        console.log("inicia tablero a " + this.player);
    }

    crearBarcoManual(){
        console.log("manual pulsado");
        let posicion;
        let x,y;
        var tipoBarco = this.tipoB, longBarco = this.long, direcBarco = this.direc, mapaB = this.mapa;
        let inicioH = 0, inicioV = 0, finH = 0, finV = 0;
        let td, mouseout = 0;

        tablaj.onmouseover = function(e) {
            posicion = e.target.id;
            x = parseInt(posicion.substr(2,1));
            y = parseInt(posicion.substr(4,1));
            console.log("posicion x: " + x);
            console.log("posicion y: " + y);

            //console.log("longitud barco " + longBarco);
            //console.log("direccón barco " +  direcBarco);
            td = document.getElementById(`j-${x}-${y}`);
            if (isNaN(x) || isNaN(y)){
            
            } else{
                if (direcBarco === 0){
                    let calcx = x + longBarco;
                    inicioH = x;
                    inicioV = y;
                    finV = y;
                    if (calcx > 10) {
                        //si la longitud es mayor que l tablero no permite colocar el barco
                        for (let i = 0; i < longBarco; i++){//recorre la longitud del barco
                            console.log(`getelemententbyid  j-${x}-${y}`);
                            document.getElementById(`j-${x}-${y}`).className = "tocado";
                            x = x + 1;
                        }
                    }else{ 
                        for (let i = 0; i < longBarco; i++){//recorre la longitud del barco
                            console.log(`getelemententbyid  j-${x}-${y}`);
                            document.getElementById(`j-${x}-${y}`).className = "colocado";
                            x = x + 1;
                            finH = x - 1;
                        }
                        if (td != null) {
                            console.log(td);
                            td.onclick = function () { 
                                console.log("click");
                                let flotaJ;
                                
                                if (tipoBarco == 4) { //destructor
                                    flotaJ = new FlotaJugador(tipoBarco,longBarco,direcBarco,mapaB,inicioH, inicioV, inicioH, inicioV);
                                }else {
                                    flotaJ = new FlotaJugador(tipoBarco,longBarco,direcBarco,mapaB,inicioH, inicioV, finH, finV);
                                 }
                                 flotaJ.crearBarco();
                                mouseout = 1;
                                console.log("return true1");
                                return true;
                            };
                        }
                    }
                }else{
                    let calcy = y + longBarco;
                    if (calcx > 10) {
                        for (let i = 0; i < longBarco; i++){//recorre la longitud del barco
                            console.log("posición dentro del for: " + y);
                            document.getElementById(`j-${x}-${y}`).className = "tocado";
                            console.log(`getelemententbyid  j-${x}-${y}`);
                            y = y + 1;
                        }
                    }else{
                        for (let i = 0; i < longBarco; i++){//recorre la longitud del barco
                            console.log("posición dentro del for: " + y);
                            document.getElementById(`j-${x}-${y}`).className = "colocado";
                            console.log(`getelemententbyid  j-${x}-${y}`);
                            y = y + 1;
                        }
                    }
                }
            }
        }
    
        tablaj.onmouseout = function(event) {
            x = parseInt(posicion.substr(2,1));
            y = parseInt(posicion.substr(4,1));
            console.log("longBarco1 " + longBarco);
            if (isNaN(x) || isNaN(y)){
            
            } else{
                if (mouseout == 0){
                    for (let i = 0; i < longBarco; i++){//recorre la longitud del barco
                        console.log("posición dentro del for: " + y);
                        document.getElementById(`j-${x}-${y}`).className = 'grid-cell grid-cell-' + x + '-' + y;
                        console.log(`getelemententbyid  j-${x}-${y}`);
                        if (direcBarco === 0){
                            console.log("direccion horizontal. Suma posición");
                            x = x + 1;
                        }else {
                            y = y + 1;
                        }
                    }
                }else{
                    mouseout = 0;
                    return true;}
            }
        }
        return true;
    }
    //crea barcos aleatorios al pulsar el botón aleatorio
    crearBarcosAleatorio() {
        console.log("pulsado crearBarcosAleatorio");
        let inicioH = 0,
            inicioV = 0,
            finH = 0,
            finV = 0;
           // console.log("this.barcos.length " + this.barcos.length);
        for (let i = 0; i < this.barcos.length; i++) {
            for (let j = 0; j < this.barcos[i][0]; j++) {
                inicioH = Math.floor(Math.random() * 10); // 0 a 9
                inicioV = Math.floor(Math.random() * 10);
                // un barco de una sola casilla
                if (this.barcos[i][1].tipo == 1) {
                    if (this.setBarco(inicioH, inicioV, inicioH, inicioV, this.barcos[i][1]) == false) {
                        //Reintento colocar barco
                        j--;
                    }
                } else {
                    let direccion = Math.floor(Math.random() * 2);
                    if (direccion == 0) {
                        // derecha fin Horizontal será punto inicioH + huecos que ocupa el barco-1 
                        finH = inicioH + this.barcos[i][1].tipo - 1;
                        finV = inicioV;
                        this.barcos[i][1].direccion = 0;
                    } else if (direccion == 1) {
                        // abajo 
                        finH = inicioH;
                        finV = inicioV + this.barcos[i][1].tipo - 1;
                        this.barcos[i][1].direccion = 1;
                    }
                    if (this.setBarco(inicioH, inicioV, finH, finV, this.barcos[i][1]) == false) {
                        j--;
                    }
                }
            }
        }
    }

    setBarco(inicioH, inicioV, finH, finV, barco) {
        //console.log("setBarco" + barco);
        // Revisamos si existe un barco en esa posicion o en sus alrededores
        if (this.existeBarco(inicioH, inicioV, finH, finV) == false) {
            // guardamos el barco en array de 
            for (let i = inicioH; i <= finH; i++) {
                console.log("inicioH " + inicioH);
                console.log("finH " + finH);
                for (let j = inicioV; j <= finV; j++) {
                    console.log("inicioV " + inicioV);
                    console.log("finV " + finV);
                    if (this.player === 'j') {
                        document.getElementById(`j-${i}-${j}`).className = "colocado";
                        //document.getElementById(`j-${i}-${j}`).innerHTML = "O";
                        this.mapa[i][j] = 1;
                        barco.posiciones.set(`j-${i}-${j}`, 1);
                    } else {
                        this.mapa[i][j] = 1;
                        barco.posiciones.set(`e-${i}-${j}`, 1);
                    }

                }
            }
            return true;
        }
        return false;
    }

    //comprueba posición de barco cuando se crea de forma aleatoria
    existeBarco(inicioH, inicioV, finH, finV) {
        //Fuera del tablero 
        if (finH > 9 || finV > 9){
            return true;
        }

        inicioH = inicioH > 0 ? inicioH - 1 : inicioH;
        inicioV = inicioV > 0 ? inicioV - 1 : inicioV;
        finH = finH < 9 ? finH + 1 : finH;
        finV = finV < 9 ? finV + 1 : finV;
        for (let i = inicioH; i <= finH; i++) {
            for (let j = inicioV; j <= finV; j++) {
                if (this.mapa[i][j] == 1) {
                    return true;
                }
            }
        }
        return false;
    }
}
