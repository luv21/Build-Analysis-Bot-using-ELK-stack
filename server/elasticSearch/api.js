var elasticsearch=require('elasticsearch');
const config = require("./credentials.json");

var client = new elasticsearch.Client( {  
  hosts: [
    `https://${config.username}:${config.password}@${config.server}:${config.port}/`,
  ]
});

client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
});

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

export function deleteDocument(job_id){
    client.delete({  
        index: 'test',
        id: job_id,
        type: 'sub_type'
      },function(err,resp,status) {
          console.log(resp);
      });
}

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
          }
      });
}