var rewire = require("rewire");
var chai = require("chai");
var expect = chai.expect;
chai.config.includeStack = false;
describe("Mon test unitaire", function() {
  beforeEach(function() {
	  //console.log("Test debut");
  });
  afterEach(function() {
	  	  //console.log("Test fin");

  });
  it("Un test qui passe toujours", function(done) {
    expect(true).to.be.equal(false);
    done();
  });
});
