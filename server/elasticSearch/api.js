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
 * Delete data of a specific Jenkins job
 * @param {*} job_id - ID of the Jenkins Job
 * @return {resp} - response from elastic search which denotes of the operation is complete or not
 */
function deleteDocument(job_id) {
  let client = new elasticsearch.Client({
    hosts: [`${config.server}:${config.port}/`]
  });
  client.delete(
    {
      index: "test",
      id: job_id,
      type: "sub_type"
    },
    function(err, resp, status) {
      console.log(resp);
      return resp;
    }
  );
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

async function test() {
  try {
    x = await searchDocument("se_project", "7")
    console.log(x);
    // return (x)
    
  } catch (error) {
    // return [];
  }
}

// test()
// exports.createDocument = createDocument;
// exports.deleteDocument = deleteDocument;
exports.searchDocument = searchDocument;
