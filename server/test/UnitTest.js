const chai = require("chai");
const expect = chai.expect;
const data1 = require("../data1.js");
const index1 = require("../index.js");
const request = require("request");

// ///////////////////////////
// // TEST SUITE FOR MOCHA
// ///////////////////////////

describe('testMain', function () {

  describe('getBuild()', function () {
    // TEST CASE
    it('should return valid Build properties', function (done) {

      data1.getBuild("build1").then(function (results) {
        expect(results).to.have.property("name");
        expect(results).to.have.property("status");
        expect(results).to.have.property("dashboard_url");
        expect(results).to.have.property("errors");

        // Call back to let mocha know that test case is done. Need this for asychronous operations.
        done();
      });

    });

    // TEST CASE...
    it('should find build1 status as FAILURE', async function () {
      // it is also possible to just return a promise, without using done.mostFrequentAssigneemostFrequentAssignee
      let getBuild = await data1.getBuild("se-project", "1");
      expect(getBuild.status).to.equal("FAILURE");
    });

    it('should find build2 status as SUCCESS - Alternate Flow', async function () {
      // it is also possible to just return a promise, without using done.mostFrequentAssigneemostFrequentAssignee
      let getBuild = await data1.getBuild("se-project", "2");
      expect(getBuild.status).to.equal("SUCCESS");
    });

  });

  describe('Analysis()', function () {
    // runs before all tests in this block1
    let data = { "text": "build1 analysis"}

    it('Post Dashboard URL to slack channel to access build information ', function (done) {
      request.post(
        {
          headers: { "content-type": "application/json" },
          url: "http://localhost:3000",
          body: JSON.stringify(data)
        },
        (error, response, body) => {
          //console.log(response.body)
          expect(response.body).to.equal("http://se-slack-botwa.s3-website-us-east-1.amazonaws.com");
      });
      done();
    });
  });

  describe('JenkinsTrigger()', function () {
      // runs before all tests in this block1
      let data = { "name": "build1", "url": "job/asgard/", "build": { "full_url": "http://localhost:8080/job/asgard/18/", "number": 18, "phase": "COMPLETED", "status": "FAILURE", "url": "job/asgard/18/", "scm": { "url": "https://github.ncsu.edu/csc510-fall2019/CSC510-26.git", "branch": "origin/master", "commit": "b769b2c1e30e628f1261668bc6ea908e84986291" } } }

    it('Post Build status to slack channel once the execution is completed', function (done) {
      request.post(
        {
          headers: { "content-type": "application/json" },
          url: "http://localhost:3000/complete",
          body: JSON.stringify(data)
        },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
        }
      )
      done();
    });
  });
});
