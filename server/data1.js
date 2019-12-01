const nock = require("nock");
const got = require("got");
const data = require("./mock_data/elasticMock.json");
const analytics = require("./analytics/analytics");
const elastic = require("./elasticSearch/api");
const charts = require("./analytics/charts");
const messages = require("./messages");

/**
 *
 * @param {*} job_number
 */
async function getBuild(job_number) {
  let analysis = analytics.calculateErrors(data[job_number], job_number);
  return analysis;
  // elastic.searchDocument(jobname);
  // return response;
}


async function getProjectData(projectName) {
    return analytics.analyzeProject(data)
}

// getBuild(1).then(result=>{
//     messages.faiureMessage(result)
// })
    


exports.getBuild = getBuild;
exports.getProjectData = getProjectData
