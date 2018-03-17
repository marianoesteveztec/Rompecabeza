  var Juego = {

      //variable para ver si gano
      gano : false,
      movimientos : 40,
      realizoMovimiento:false,
      // Configuracion de canvas
      configurarCanvas : function(){
        this.juegoCanvas = document.getElementById("juegoCanvas");
        this.contexto = this.juegoCanvas.getContext("2d");
      },

      //se carga la imagen del rompecabezas
      cargarImagen: function (e) {
          //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600).
          this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
          this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
          //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
          this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
          this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
          this.configurarCanvas();


        },

      //funcion que carga la imagen
      iniciarImagen: function (callback) {
        this.imagen = new Image();
        var self = this;
        //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
        this.imagen.addEventListener('load', function () {
          self.cargarImagen.call(self);
          callback();
        }, false);
        this.imagen.src = "images/homer.jpg";

      },

      // Continuo usando grilla para ver si gano (no lo guardo en el arreglo de piezas)
      crearGrilla :  function(){

        this.filaVacia = this.cantidadDePiezasPorLado - 1;
        this.columnaVacia = this.cantidadDePiezasPorLado - 1;
        for(var i=0; i<this.cantidadDePiezasPorLado; i++ ){
          this.grilla.push([]);
        }
        for(var i=1; i<=this.cantidadDePiezasPorLado; i++ ){
          for(var j=0; j<this.cantidadDePiezasPorLado; j++ ){
            this.grilla[j].push(i + this.cantidadDePiezasPorLado * j);
          }
        }
      },

      //Armo arreglo con la posicion de las piezas
      definirPiezas: function(){
        for(var i = 0; i < this.cantidadDePiezasPorLado; i++){
          this.piezas[i] = [];
          for(var j = 0; j < this.cantidadDePiezasPorLado; j++){
            this.piezas[i][j] = [];
            this.piezas[i][j].xActual = i;
            this.piezas[i][j].yActual = j;
          }
        }
      },

      //Contruccion de las imagenes de las piezas con sus posiciones
      construirPiezas: function(){
        for(i = 0; i < this.cantidadDePiezasPorLado; i++){
          for(j = 0; j < this.cantidadDePiezasPorLado; j++){
            var x = this.piezas[i][j].xActual;
            var y = this.piezas[i][j].yActual;
            this.contexto.drawImage(this.imagen, x * this.anchoPiezas, y * this.altoPiezas, this.anchoPiezas, this.altoPiezas, i * this.anchoPiezas, j * this.altoPiezas, this.anchoPiezas, this.altoPiezas);
          }
        }
        this.piezaVacia();
      },

      //Construccion del lugar vacio
      piezaVacia : function(){
        this.img2 = new Image();
        this.img2.src = "images/krusty.jpg";
        this.contexto.drawImage(this.img2, this.filaVacia * this.anchoPiezas, this.columnaVacia * this.altoPiezas, this.anchoPiezas, this.altoPiezas);
      },

      //una vez elegido el nivel, se inicia el juego
      iniciar: function (cantMovimientos) {

        this.movimientosTotales = cantMovimientos;
        this.contadorDeMovimientos = cantMovimientos;
        this.piezas = [];
        this.grilla = [];
        document.getElementById("movimientos").getContext = Juego.movimientos;
        this.cantidadDePiezasPorLado = Number(document.getElementById('cantidadPiezasPorLado').textContent);

        //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
        var self = this;

        this.crearGrilla();
        this.elegirNivel();
        //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
        this.filaVacia = this.cantidadDePiezasPorLado - 1;
        this.columnaVacia = this.cantidadDePiezasPorLado - 1;
        this.botonMezclar();
        //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
          this.iniciarImagen(function () {
            self.definirPiezas();
            self.construirPiezas();
            //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
            var cantidadDeMezclas = Math.pow(self.cantidadDePiezasPorLado, 3);
            self.mezclarPiezas(cantidadDeMezclas);
            self.capturarTeclas();
            self.moverClick();

          });
        }
      };

    // Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
      Juego.chequearSiGano = function (){
        for (var i = 0; i < this.cantidadDePiezasPorLado; i++) {
          for (var j = 0; j < this.cantidadDePiezasPorLado; j++) {
            if (Juego.grilla[i][j] != (i * this.cantidadDePiezasPorLado)+ (j + 1)){
              Juego.movimientos --;
              document.getElementById('movimientos').textContent = Juego.movimientos;
              if (Juego.movimientos == 0){
                if(self.cantidadDePiezasPorLado==3){
                  self.movimientos = 40;
                }else if(self.cantidadDePiezasPorLado == 4){
                  self.movimientos = 60;
                } else{
                  self.movimientos = 90;
                };
                Juego.mostrarCartelPerdedor();
                document.getElementById('movimientos').textContent = Juego.movimientos;
              }
              return false;
            }
          }
        }
        Juego.movimientos --;
        document.getElementById('movimientos').textContent = Juego.movimientos;
        return true;
      }



    // ganador
    Juego.mostrarCartelGanador = function (){
      swal("Ganaste :)", "Felicitaciones", "success",);

    }

    // Perdedor
    Juego.mostrarCartelPerdedor = function (){
      swal('Perdiste :(', 'Intentar otra vez', 'error');

    }

    // Intercambia posiciones grilla y en Canvas
    Juego.intercambiarPosiciones = function (filaPos1, columnaPos1, filaPos2, columnaPos2){

        //Modifico las posiciones en grilla
        var posicion1 = Juego.grilla[filaPos1][columnaPos1];
        var posicion2 = Juego.grilla[filaPos2][columnaPos2];

        /*Intercambio posicion logica*/
        this.grilla[filaPos1][columnaPos1] = posicion2;
        this.grilla[filaPos2][columnaPos2] = posicion1;


        /*intercambio visual Canvas con aux*/
        var aux = [];
        aux = this.piezas[filaPos1][columnaPos1];
        this.piezas[filaPos1][columnaPos1] = this.piezas[filaPos2][columnaPos2];
        this.piezas[filaPos2][columnaPos2] = aux;

        //Dibujo piezas, actualizo posicion vacia y la dibujo
        this.actualizarPosicionVacia(filaPos2, columnaPos2);
        this.construirPiezas();
        this.piezaVacia();


    }

    // Actualiza la posición de la pieza vacía
    Juego.actualizarPosicionVacia = function (nuevaFila,nuevaColumna){
      Juego.filaVacia = nuevaFila;
      Juego.columnaVacia = nuevaColumna;
    }


    // Para chequear si la posicón está dentro de la grilla.
    Juego.posicionValida = function (fila, columna){
      if((fila>=0 && fila< this.cantidadDePiezasPorLado) && (columna >=0 && columna<this.cantidadDePiezasPorLado)){
        return true;
      } else {
        return false;

      }
    }

    /* Movimiento de fichas, en este caso la que se mueve
    es la blanca intercambiando su posición con otro elemento.
    Las direcciones están dadas por números que representa:
    arriba, abajo, izquierda, derecha */
    Juego.moverEnDireccion = function (direccion){

      var nuevaFilaPiezaVacia;
      var nuevaColumnaPiezaVacia;

      // Intercambia pieza blanca con la pieza que está arriba suyo
      if(direccion == 40){
        nuevaFilaPiezaVacia = Juego.filaVacia;
        nuevaColumnaPiezaVacia = Juego.columnaVacia+1;
      }
      // Intercambia pieza blanca con la pieza que está abajo suyo
      else if (direccion == 38) {
        nuevaFilaPiezaVacia = Juego.filaVacia;
        nuevaColumnaPiezaVacia = Juego.columnaVacia-1;

      }
      // Intercambia pieza blanca con la pieza que está a su izq
      else if (direccion == 39) {
        nuevaFilaPiezaVacia = Juego.filaVacia+1;
        nuevaColumnaPiezaVacia = Juego.columnaVacia;
      }
      // Intercambia pieza blanca con la pieza que está a su der
      else if (direccion == 37) {
        nuevaFilaPiezaVacia = Juego.filaVacia-1;
        nuevaColumnaPiezaVacia = Juego.columnaVacia;
      }
      this.realizoMovimiento = false;
      // Se chequea si la nueva posición es válida, si lo es, se intercambia.
      if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        this.realizoMovimiento = true;
        this.intercambiarPosiciones(Juego.filaVacia, Juego.columnaVacia,
        nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      //Pongo variable en falso ya que hubo un movimiento, luego valido
      //si es ganadora o no
      Juego.gano = false;
      }
    }


    /* Función que mezcla las piezas del tablero una cantidad de veces dada.
    Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
    se mezclará todo el tablero. */

    Juego.mezclarPiezas = function (veces){
      if(veces<=0){
        if(self.cantidadDePiezasPorLado==3){
          self.tiempo = 40;
        }else if(self.cantidadDePiezasPorLado == 4){
          self.tiempo = 120;
        } else{
          self.tiempo = 200;
        };
        return;}
      var direcciones = [40, 38, 39, 37];
      var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
      this.moverEnDireccion(direccion);

      setTimeout(function(){
        Juego.mezclarPiezas(veces-1);
      },50);
    }

    Juego.capturarTeclas = function (){
      var self = this;
      document.body.onkeydown = (function(evento) {
        if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
          self.moverEnDireccion(evento.which);

          /* Modifique este método ya que si estoy en una posicion ganadora,
          y realizo un movimiento que no se puede realizar, vuelve a salir la alerta
          que gané la partida. De esta forma solo muestra la alerta
          al llegar a ganar con un nuevo movimiento */

          if (Juego.gano == false && Juego.realizoMovimiento == true){
            Juego.realizoMovimiento =  false;
            Juego.gano = self.chequearSiGano();
            if(Juego.gano){
              setTimeout(function(){
                self.mostrarCartelGanador();
                self.iniciar();
                  if(self.cantidadDePiezasPorLado==3){
                    self.movimientos = 40;
                  }else if(self.cantidadDePiezasPorLado == 4){
                    self.movimientos = 60;
                  } else{
                    self.movimientos = 90;
                  };
                  document.getElementById('movimientos').textContent = Juego.movimientos;
              },500);
            }
          }
          evento.preventDefault();
        }
      })
    }

    //Funciones para click
    //Validar que la ficha este en la misma fila o columna que la vacia, y que sea contigua
    Juego.contigua = function(xVacia, yVacia, xClick, yClick){
       return Math.abs(xVacia - xClick) + Math.abs(yVacia - yClick);
     };

     //Tomo coordenada x e y de donde hice click
    Juego.posicionClick = function(){
      self = this;
      document.getElementById('juegoCanvas').onmousemove = function(e){
        self.posicionClick.x = (Math.floor((e.pageX - this.offsetLeft) / self.anchoPiezas)) - 1;
        self.posicionClick.y = Math.floor((e.pageY - this.offsetTop) / self.altoPiezas);
      }
    };


    Juego.moverClick = function(){
      this.posicionClick();
      self = this;
        self.juegoCanvas.addEventListener("click", function(){
        if (self.contigua(self.filaVacia, self.columnaVacia, self.posicionClick.x, self.posicionClick.y) == 1){
            self.intercambiarPosiciones(self.filaVacia, self.columnaVacia, self.posicionClick.x, self.posicionClick.y);
            self.actualizarPosicionVacia(self.posicionClick.x, self.posicionClick.y);
            if (Juego.gano == false){
              Juego.gano = self.chequearSiGano();
              if(Juego.gano){
                setTimeout(function(){
                  self.mostrarCartelGanador();
                  self.iniciar();
                    if(self.cantidadDePiezasPorLado==3){
                      self.movimientos = 40;
                    }else if(self.cantidadDePiezasPorLado == 4){
                      self.movimientos = 60;
                    } else{
                      self.movimientos = 90;
                    };
                    document.getElementById('movimientos').textContent = Juego.movimientos;
                },500);
              }
            }
        }
      });
    };

    //Seleccion niveles de dificultad
    Juego.elegirNivel =  function(){
      var valor = $( "input:checked" ).val();
      var self = this;

      $( "#facil" ).on( "click", function() {

        this.cantidadDePiezasPorLado = 3;
        document.getElementById('cantidadPiezasPorLado').textContent = this.cantidadDePiezasPorLado;
        document.getElementById('movimientos').textContent = 40;
        self.movimientos = 40;
        self.iniciar();

      });

      $( "#intermedio" ).on( "click", function() {

        this.cantidadDePiezasPorLado = 4;
        document.getElementById('cantidadPiezasPorLado').textContent = this.cantidadDePiezasPorLado;
        document.getElementById('movimientos').textContent = 60;
        self.movimientos = 60;
        self.iniciar();
      });
      $( "#dificil" ).on( "click", function() {

        this.cantidadDePiezasPorLado = 5;
        document.getElementById('cantidadPiezasPorLado').textContent = this.cantidadDePiezasPorLado;
        document.getElementById('movimientos').textContent = 90;
        self.movimientos = 90;
        self.iniciar();
      });
    };



        Juego.botonMezclar = function(){
          var self = this;
          $("#mezclar").on( "click", function() {
            if(self.cantidadDePiezasPorLado==3){
              self.movimientos = 40;
            }else if(self.cantidadDePiezasPorLado == 4){
              self.movimientos = 60;
            } else{
              self.movimientos = 90;
            }
            document.getElementById('movimientos').textContent = Juego.movimientos;
            self.iniciar();

          });
        },



    // Ejecutamos la función iniciar
    Juego.iniciar();
