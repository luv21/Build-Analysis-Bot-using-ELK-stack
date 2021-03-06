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
    let build_data = await elastic.searchDocument(project_name, job_number)    
    let analysis = await analytics.calculateErrors(build_data, job_number);
    return analysis;
  } catch (error) {
    return undefined
  }
}

async function getProjectData(projectName) {
  try {
    let project_data = await elastic.getAllDocuments(projectName)
    let analysis = analytics.analyzeProject(project_data);
    return analysis
  } catch (error) {
    return undefined
  }
}

// getProjectData("se_project").then(data=>{
//   // console.log(data)
// })

exports.getBuild = getBuild;
exports.getProjectData = getProjectData;
