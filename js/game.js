/* ---- FUNCIONES JUEGO ---- */

//declara variables de la clase Jugador
//let jugador = new Jugador('j');
//let enemigo = new Jugador('e');

let jugFlota = new Flota('j','','','');
let eneFlota = new Flota('e','','','');

	//Constructor tablero
function Game(){
	console.log("Constructor game");
	this.game();
}

Game.prototype.game = function() {
	console.log("Init tablero");

	//Botón crear barcos aleatorios
	//Nota: se deben crear siempre aleatorios para el enemigo
	//Nota: para el jugador solo debe crearse en caso de pulsar el botón
	let botonAle = document.getElementById('place-randomly'); //recoge el elemento con id place-randomly
	botonAle.self = this;
	botonAle.addEventListener('click', this.aleatorio, false); 
	eneFlota.crearBarcosAleatorio(); //Crea los barcos aleatorios siempre para el enemigo

	let botonMan = document.getElementById('place-manual'); //recoge el elemento con id place-manual
	botonMan.self = this;
	botonMan.addEventListener('click', this.manual, false);

	let posiciones = document.getElementsByName("e");
    for (let i = 0; i < posiciones.length; i++) {
	    const element = posiciones[i];
	    element.addEventListener('click', this.dispararJug, true);
    }
	let botonPorta = document.getElementById('barco-porta');
    botonPorta.self = this;
    botonPorta.addEventListener('click', this.barco_porta, false);

    let botonAco = document.getElementById('barco-aco');
    botonAco.self = this;
    botonAco.addEventListener('click', this.barco_aco, false);

    let botonCru = document.getElementById('barco-cruce');
    botonCru.self = this;
    botonCru.addEventListener('click', this.barco_cru, false);

    let botonDes = document.getElementById('barco-des');
    botonDes.self = this;
    botonDes.addEventListener('click', this.barco_des, false);
};

	//Coloca de forma aleatoria los barcos en el tablero
Game.prototype.aleatorio = function(e){
	e.target.removeEventListener(e.type, arguments.callee);
	jugFlota.crearBarcosAleatorio();//solo si se da al botón crea los barcos aleatorios para el jugador
	//e.target.self.readyToPlay = true;
	document.getElementById('roster-sidebar').setAttribute('class', 'hidden');
	this.setAttribute('class', 'hidden');
	console.log("boton automatico");
};
	
Game.prototype.manual = function(e){ //cuando se pulsa debe permitir elegir los barcos y su colocación
	e.target.removeEventListener(e.type, arguments.callee);
	document.getElementById('place-manual').setAttribute('class','hidden');
	document.getElementById('place-randomly').setAttribute('class','hidden');
	document.getElementById('barco-aco').setAttribute('class','barco');
	document.getElementById('barco-porta').setAttribute('class','barco');
	document.getElementById('barco-cruce').setAttribute('class','barco');
	document.getElementById('barco-des').setAttribute('class','barco');
	console.log("boton manual");
};

Game.prototype.barco_porta = function(e){
	//e.target.removeEventListener(e.type, arguments.callee);
	console.log("portaaviones");
	jugFlota = new Flota('j',1,4,0);
	//let a = jugFlotaP.crearBarcoManual();
	//console.log("valor a" +a);
	if(jugFlota.crearBarcoManual() == true){
		console.log("return true3");
		document.getElementById('barco-porta').setAttribute('class','hidden');
		document.getElementById('barco-porta').removeEventListener("click", this.barco_porta, true);
	}
	
}
let bAco = 0;
let bCru = 0;
let bDes = 0;
Game.prototype.barco_aco = function(e){
	//e.target.removeEventListener(e.type, arguments.callee);
	console.log("acorazados");
	jugFlota = new Flota('j',2,3,0);
	jugFlota.crearBarcoManual();
	 bAco = bAco + 1;

	if (bAco < 2){
		console.log("boton-aco" + bAco);
		document.getElementById('barco-aco').removeEventListener("click", this.barco_aco, true);
	}else{
		document.getElementById('barco-aco').setAttribute('class','hidden');
	}
}

Game.prototype.barco_cru = function(e){
	//e.target.removeEventListener(e.type, arguments.callee);
	console.log("cruceros");
	jugFlota = new Flota('j',3,2,0);
	jugFlota.crearBarcoManual();
	 bCru = bCru + 1;

	if (bCru < 3){
		console.log("boton-cru" + bCru);
		document.getElementById('barco-cruce').removeEventListener("click", this.barco_cru, true);
	}else{
		document.getElementById('barco-cruce').setAttribute('class','hidden');
	}
}
Game.prototype.barco_des = function(e){
	//e.target.removeEventListener(e.type, arguments.callee);
	console.log("destructores");
	jugFlota = new Flota('j',4,1,0);
	jugFlota.crearBarcoManual();
	 bDes = bDes + 1;

	if (bDes < 4){
		console.log("boton-des" + bDes);
		document.getElementById('barco-des').removeEventListener("click", this.barco_des, true);
	}else{
		document.getElementById('barco-des').setAttribute('class','hidden');
	}
}

/* disparos
 0 = agua
 1= barco
 2 = celda disparada
  */
Game.prototype.dispararJug = function(e) {
	e.target.removeEventListener(e.type, arguments.callee);
    let idCelda = this.id
    console.log('disparado a ' + idCelda);
    let disparoMapa = this.id.split('-');
    let x = disparoMapa[1];
    let y = disparoMapa[2];

    //TOCADO o HUNDIDO
    if (eneFlota.mapa[x][y] == 1) {
        document.getElementById(idCelda).className = "tocado";
        eneFlota.mapa[x][y] = 2;
    } else if (eneFlota.mapa[disparoMapa[1]][disparoMapa[2]] == 0) {
        document.getElementById(idCelda).className = "agua";
        eneFlota.mapa[x][y] = 2;
    }

    //document.getElementById(idCelda).removeEventListener("click", this.dispararJug, true); //se elimina el evento para poder disparadar de nuevo
    setTimeout(dispararEne, 1000); //cada 1000 ms automaticamente el enemigo dispara

}

dispararEne = function() {
	console.log("disparo enemigo");
    let disparoCertero = false;
    while (!disparoCertero) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let idCelda = `j-${x}-${y}`;

        if (jugFlota.mapa[x][y] !== 2) {
            //TOCADO O HUNDIDO
            if (jugFlota.mapa[x][y] === 1) {
            	console.log("tocado");
                jugFlota.mapa[x][y] = 2;
                document.getElementById(idCelda).className = "tocado";
                //FALLO
            } else {
                document.getElementById(idCelda).className = "agua";
                jugFlota.mapa[x][y] = 2;
            }
            disparoCertero = true;
        }
    }
}
var juegoTablero = new Game();
