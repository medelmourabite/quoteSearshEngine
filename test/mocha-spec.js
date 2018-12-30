var rewire = require("rewire");
var chai = require("chai");
var expect = chai.expect;
chai.config.includeStack = false;
var exemple = require("../src/math-module");

describe("Mon test unitaire", function() {
  beforeEach(function() {
    //console.log("Test debut");
  });
  afterEach(function() {
    //console.log("Test fin");
  });
  it("Un test qui passe toujours", function(done) {
    expect(true).to.be.equal(true);
    done();
  });

  describe("Module Math", function() {
    describe("addition()", function() {
      it("Retourne la somme de 2 nombres", function() {
        var resultat = exemple.addition(6, 2);
        expect(resultat).to.equal(8);
      });
    });

    // describe("typeDe()", function() {
    //   it("Le type du retour doit etre un entier", function() {
    //     var resultat = exemple.addition(4, 5);
    //     assert.typeOf(resultat, typeof resultat);
    //   });
    // });
  });
});
