var elasticsearch=require('elasticsearch');
const config = require("./credentials.json");

var client = new elasticsearch.Client( {  
  hosts: [
    `https://${config.username}:${config.password}@${config.server}:${config.port}/`,
  ]
});

/**
 * 
 */
client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
});

/**
 * Creates a index for a document in the elasticsearch
 * @param {*} job_id 
 */
export function createDocument(job_id){
    client.index({  
        index: 'test',
        id: job_id,
        type: 'sub_type',
        body: {
          
        }
      },function(err,resp,status) {
          console.log(resp);
      });
}


/**
 * Delete data of a specific Jenkins job
 * @param {*} job_id - ID of the Jenkins Job 
 * @return {resp} - response from elastic search which denotes of the operation is complete or not 
 */
export function deleteDocument(job_id){
    client.delete({  
        index: 'test',
        id: job_id,
        type: 'sub_type'
      },function(err,resp,status) {
          console.log(resp);
          return resp;
      });
}

 /**
  * Fetches detials of a particular Jenkins Job
  * @param {*} jobID  - Job ID of the jenkins job whose data we want to fetch
  * @returns {response} - returns the data of the job obtained from the elasticsearch
  */
export function searchDocument(jobID){
    client.search({  
        index: 'test',
        type: 'sub_type',
        body: {
          query: {
            match: { "job_id": jobID }
          },
        }
      },function (error, response,status) {
          if (error){
            console.log("search error: "+error)
          }
          else {
            console.log("--- Response ---");
            console.log(response);
            console.log("--- Hits ---");
            response.hits.hits.forEach(function(hit){
              console.log(hit);
            })
            return response;
          }
      });
}