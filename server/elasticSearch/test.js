var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '34.67.233.131:9200/se_project-7/_search?pretty&filter_path=hits.hits._source.pipeline,hits.hits._source.revision_number,hits.hits._source.user_name,hits.hits._source.repository,hits.hits._source.result,hits.hits._source.commit_message'
  log: 'trace',
  apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

const response = await client.search({
  index: 'se_project-7',
  type: '_doc',
  body: {
        "query" : 
            { "query_string": { 
                                "query": "*", 
                                "fields" : [ "revision_number", "user_name", "result", "commit_message", "repository", "pipeline" ] 
                              } 
            }
        }
  })
