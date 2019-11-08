const nock = require("nock")
const got = require('got');
const data = require("./mock_data/elasticMock.json")
const status = require("./mock_data/statusMock.json")
urlRoot_elastic = "https://35.208.168.86:9200"
urlRoot_jenkins = "https://35.208.168.86:8080"
const analytics = require("./analytics/analytics");
const elastic = require('./elasticSearch/api');
const messages = require("./messages");

async function getBuild(job_number) {
    // var elasticsearchmock = nock(urlRoot_elastic)
    //     .persist()
    //     .get("/"+jobname+"/_doc/0?_source=false&pretty")
    //     .reply(200, JSON.stringify(data[jobname]))

    // const url = urlRoot_elastic + "/"+jobname+"/_doc/0?_source=false&pretty";
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     json: true
    // };

    // Send a http request to url
    // let response = (await got(url, options)).body;
    // console.log(response)
    let analysis = analytics.calculateErrors(data["build"+job_number], job_number)
    return analysis
    // elastic.searchDocument(jobname);
    // return response;
}



async function getStatus() {

    var jenkinsmock = nock(urlRoot_jenkins)
    .persist()
    .get("/job/SE-Project-Test/1/api/json?pretty=true&tree=result")
    .reply(200, JSON.stringify(status.result))

    const url = urlRoot_jenkins + "/job/SE-Project-Test/1/api/json?pretty=true&tree=result";
    const options = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": `admin:testtoken`
        },
        json: true
    };

    // Send a http request to url
    let response = (await got(url, options)).body;
    return response;
}

getBuild("1").then(data=>{
    let message = messages.faiureMessage(data)  
    console.log(message)
})


exports.getBuild = getBuild;
exports.getStatus = getStatus;