var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{
        done();
      }
    });
});

describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Juego.crearGrilla();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.grilla.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.grilla[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });

  describe('Posición válida ',function(){
    it('El movimiento es correcto', function() {
      //Evaluo casos
      //Fila negativa devuelva falso
      expect(Juego.posicionValida(-1,0)).to.equal(false);
      //Columna negativa devuelva falso
      expect(Juego.posicionValida(0,-1)).to.equal(false);
      //Fila y Columna negativa devuelva falso
      expect(Juego.posicionValida(-1,-1)).to.equal(false);
      //Fila mayor a cantidadDePiezasPorLado  devuelva falso
      expect(Juego.posicionValida(Juego.cantidadDePiezasPorLado + 1, 0)).to.equal(false);
      //Columna mayor a cantidadDePiezasPorLado  devuelva falso
      expect(Juego.posicionValida( 0, Juego.cantidadDePiezasPorLado + 1)).to.equal(false);
      //Fila y Columna mayor a cantidadDePiezasPorLado  devuelva falso
      expect(Juego.posicionValida( Juego.cantidadDePiezasPorLado + 1 , Juego.cantidadDePiezasPorLado + 1)).to.equal(false);
      //Fila y Columna positiva en tablero de almenos 1 piezas
      for (var i = 0; i < Juego.cantidadDePiezasPorLado; i++) {
        for (var j = 0; j < Juego.cantidadDePiezasPorLado; j++) {
          expect(Juego.posicionValida(i,j)).to.equal(true);
          }
        }
    });
  });
});
