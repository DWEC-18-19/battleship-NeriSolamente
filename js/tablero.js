/* ---- FUNCIONES TABLERO ---- */

	//Constructor tablero
function Tablero(size){
	console.log("Constructor tablero");
	Tablero.size = size;
	this.crearTablero()
	//this.init();
}

Tablero.size = 10; //valor por defecto

//Dibuja en la pantalla el tablero en función de los elementos grid encontrados, para el jugador y el enemigo
Tablero.prototype.crearTablero = function(){
	var gridDiv = document.querySelectorAll('.grid'); //devuelve una lista de todos los elementos .grid
	//console.log("valor .grid " + gridDiv.length);
	//console.log("se llama a la funcion que crea el tablero");
	for (var grid = 0; grid < gridDiv.length; grid++) {
		if (grid == 0){ var juegoTablero = "j";}else{var juegoTablero = "e";}
			var tabla = document.createElement('table');
			tabla.setAttribute('id','tabla' + juegoTablero);
			//console.log("entra el for porque ha encontrado elementos grid");
			//gridDiv[grid].removeChild(gridDiv[grid].querySelector('.no-js')); // Removes the no-js warning
			for (var i = 0; i < Tablero.size; i++) {
				var fila = document.createElement('tr');
				//console.log("entra en el for para crear tablero");
				for (var j = 0; j < Tablero.size; j++) {
					//console.log("entra en el for2 para crear tablero");
					var column = document.createElement('td');
					column.setAttribute('data-x', j);
					column.setAttribute('data-y', i);
					column.setAttribute('id', juegoTablero +"-" + j + '-' + i);
					column.setAttribute('class', 'grid-cell grid-cell-' + j + '-' + i);
					column.setAttribute('name', juegoTablero);
					fila.appendChild(column);
				}
				tabla.appendChild(fila);	
			}
		gridDiv[grid].appendChild(tabla);
	}
};

var juegoTablero = new Tablero(10);
	