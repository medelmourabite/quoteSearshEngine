var expect = require("chai").expect;
var assert = require("chai").assert;
var exemple = require("../src/math-module");

describe("Module Math", function() {
  describe("addition()", function() {
    it("Retourne la somme de 2 nombres", function() {
      var resultat = exemple.addition(6, 2);
      expect(resultat).to.equal(8);
    });
  });

  describe("typeDe()", function() {
    it("Le type du retour doit etre un entier", function() {
      var resultat = exemple.addition(4, 5);
      assert.typeOf(resultat, "number");
    });
  });
});
