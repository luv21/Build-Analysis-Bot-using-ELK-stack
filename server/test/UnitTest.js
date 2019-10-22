const chai = require("chai");
const expect = chai.expect;
const nock = require("nock");
const data1 = require("../data1.js");


// Load mock data
// const elastic_mock = require("../mock_data/elasticMock.json");
// const jenkins_mock = require("../mock_data/elasticMock.json");

///////////////////////////
// TEST SUITE FOR MOCHA
///////////////////////////

describe('testMain', function () {

  // MOCK SERVICE
  //  var mockService = nock("https://api.github.com")
  //    .persist() // This will persist mock interception for lifetime of program.
  //    .get("/repos/testuser/Hello-World/issues")
  //    .reply(200, JSON.stringify(data.issueList) );

  describe('#getStatus', function () {
    // TEST CASE
   	// it('should return Status of last Build', function(done) {

    //   data1.getStatus().then(function (results) 
    //   {
    //     expect(results).to.have.property("result");

    //     let result = results.result;

    //     // Call back to let mocha know that test case is done. Need this for asychronous operations.
    //     done();
    //   });

    // });

    // TEST CASE...
    it('should find build status as FAILURE', async function () {
      // it is also possible to just return a promise, without using done.mostFrequentAssigneemostFrequentAssignee
      let getStatus = await data1.getStatus();
      expect(getStatus.result).to.equal("FAILURE");
    });

  });

  describe('getBuild()', function () {

    it('should return Build report', async function () {
      let getBuild = await data1.getBuild();
      expect(getBuild).to.equal(4);
    });

  });

});
