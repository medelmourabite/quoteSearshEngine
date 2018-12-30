var rewire = require("rewire");
var chai = require("chai");
var expect = chai.expect;
chai.config.includeStack = false;
describe("My test suite", function() {
  beforeEach(function() {});
  afterEach(function() {});
  it("Test case", function(done) {
    expect(true).to.be.equal(true);
    done();
  });
});
