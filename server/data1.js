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
async function getBuild(project_name, job_number) {
  try {
    let build_data = await elastic.searchDocument(project_name, job_number);
    // console.log(build_data.hits)
    let analysis = await analytics.calculateErrors(build_data, job_number);
    return analysis;
  } catch (error) {
    return undefined
  }
}

async function getProjectData(projectName) {
  return analytics.analyzeProject(data);
}


exports.getBuild = getBuild;
// exports.getProjectData = getProjectData;
