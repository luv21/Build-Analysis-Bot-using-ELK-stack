var elasticsearch = require("elasticsearch");
const config = require("./credentials.json");

/**
 * Creates a index for a document in the elasticsearch
 * @param {*} job_id
 */
function createDocument(job_id) {
  let client = new elasticsearch.Client({
    hosts: [
      `https://${config.username}:${config.password}@${config.server}:${config.port}/`
    ]
  });
  client.index(
    {
      index: "test",
      id: job_id,
      type: "sub_type",
      body: {}
    },
    function(err, resp, status) {
      console.log(resp);
    }
  );
}

/**
 * get All job details of a project
 * @param {*} project_name - Name of the project
 * @return {resp} - response from elastic search which denotes of the operation is complete or not
 */
function getAllDocuments(project_name) {
  let client = new elasticsearch.Client({
    hosts: [`${config.server}:${config.port}`]
  });
  return client
    .search({
      index: project_name + "-*", //{project_name}-{buildno}
      type: "_doc",
      size: 10000,
      body: {
        query: {
          query_string: {
            query: "*",
            fields: [
              "revision_number",
              "user_name",
              "result",
              "commit_message",
              "repository",
              "pipeline"
            ]
          }
        }
      }
    })
    .then(response => {    
      let data = {};
      for(let i=0;i<response.hits.hits.length;i++){
        let obj = response.hits.hits[i]['_source'];
        let hits = (data[obj.build_number])?data[obj.build_number].hits:[];
        hits.push({"_source": obj})
        data[obj.build_number] = {hits};
      }      
      return data;
    });
}

/**
 * Fetches detials of a particular Jenkins Job
 * @param {*} jobID  - Job ID of the jenkins job whose data we want to fetch
 * @returns {response} - returns the data of the job obtained from the elasticsearch
 */
function searchDocument(project_name, build_number) {
  let client = new elasticsearch.Client({
    hosts: [`${config.server}:${config.port}`]
  });
  return client
    .search({
      index: project_name + "-" + build_number, //{project_name}-{buildno}
      type: "_doc",
      body: {
        query: {
          query_string: {
            query: "*",
            fields: [
              "revision_number",
              "user_name",
              "result",
              "commit_message",
              "repository",
              "pipeline"
            ]
          }
        }
      }
    })
    .then(response => {
      let hits = [];
      for(let i=0;i<response.hits.hits.length;i++){
        let obj = response.hits.hits[i];
        hits.push({"_source": obj['_source']})
      }      
      return {hits};
    });
}

// async function test() {
//   try {
//     x = await getAllDocuments("se_project")
//     console.log(x);
//     // return (x)
    
//   } catch (error) {
//     // return [];
//   }
// }

// test()
// exports.createDocument = createDocument;
// exports.deleteDocument = deleteDocument;
exports.searchDocument = searchDocument;
exports.getAllDocuments = getAllDocuments;
