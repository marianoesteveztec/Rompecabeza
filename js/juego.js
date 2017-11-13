// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

//variable para ver si gano
var gano = false;

/* Estas dos variables son para guardar la posición
de la pieza vacía. Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;


// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (grilla[i][j] != (i * 3)+ (j + 1)){
        return false;
      }
    }
  }
  return true;
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("Ganaste!");
}

// Intercambia posiciones grilla y en el DOM
/* Esta función puede ser pensada por partes, incluso separarse en dos funciones, para
separar el manejo de posición de la grilla y, por otro lado, el manejo del DOM.

1) Lo primero que hay que pensar es como intercambiar dos posiciones en un arreglo de arreglos.
Para que tengas en cuenta:
si queremos intercambiar las posiciones [1,2] con la [0, 0]
si hacemos
arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];

En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
Se te ocurre cómo solucionar esto con algo temporal?

2) Como segunda parte tenemos que pensar el intercambio en el dom.
Para eso, tenés que recordar todas las funciones aprendidas en los videos.

getElementyById: para obtener los elementos que queremos intercambiar
parentNode: para obtener el padre de un elemento.
cloneNode: para clonar un elemento
replaceChild(elem1, elem2): para reemplazar el elem1 por elem2

y recordar cómo es la estructura de árbol del DOM para entender como cada una de estas
funciones lo modifica. Esto lo podés ver en las clases
teóricas: https://www.acamica.com/cursos/254/javascript-manipulando-dom.

*/
function intercambiarPosiciones(filaPos1, columnaPos1, filaPos2, columnaPos2){

    var posicion1 = grilla[filaPos1][columnaPos1];
    var posicion2 = grilla[filaPos2][columnaPos2];

    /*Intercambio posicion logica*/
    grilla[filaPos1][columnaPos1] = posicion2;
    grilla[filaPos2][columnaPos2] = posicion1;


    /*intercambio visual en el DOM*/
    var imagen1 = document.getElementById(posicion1);
    var clonImagen1 = imagen1.cloneNode(true);
    var imagen2 = document.getElementById(posicion2);
    var clonImagen2 = imagen2.cloneNode(true);
    var padre = imagen1.parentNode;
    padre.replaceChild(clonImagen2, imagen1);
    var padre = imagen2.parentNode;
    padre.replaceChild(clonImagen1, imagen2);

}

// Actualiza la posición dess la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if((fila>=0 && fila<3) && (columna >=0 && columna<3)){
    return true;
  } else {
    return false;
  }
}

/* Movimiento de fichas, en este caso la que se mueve
es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa:
arriba, abajo, izquierda, derecha */
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = filaVacia-1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = filaVacia+1;
    nuevaColumnaPiezaVacia = columnaVacia;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia+1;
  }

  /* Se chequea si la nueva posición es válida, si lo es, se intercambia.
   Para que esta parte del código funcione correctamente deberás haber implementado
   las funciones posicionValida, intercambiarPosiciones y actualizarPosicionVacia */
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(filaVacia, columnaVacia,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

    //Pongo variable en falso ya que hubo un movimiento, luego valido
    //si es ganadora o no
    gano = false;

  }

}



/* Las funciones que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */


/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora,
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      /* Modifique este método  si estoy en una posicion ganadora,
      y realizo un movimiento que no se puede realizar, vuelve a salir la alerta
      que gané la partida. De esta forma solo muestra la alerta
      al llegar a gananar con un nuevo movimiento */

      if (gano == false){
        gano = chequearSiGano();
        if(gano){
          setTimeout(function(){
            mostrarCartelGanador();
          },500);
        }
      }



      evento.preventDefault();
    }
  })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces
y ejecutando la función para que se capturen las teclas que
presiona el usuario */
function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();
