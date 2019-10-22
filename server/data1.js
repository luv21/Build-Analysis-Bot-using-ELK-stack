const nock = require("nock")
const got = require('got');
const data = require("./mock_data/elasticMock.json")
const status = require("./mock_data/statusMock.json")
const token = "11773feb2a68f9bf46dc09be04f432b9cc"
urlRoot_elastic = "https://35.208.168.86:9200"
urlRoot_jenkins = "https://35.208.168.86:8080"

async function getBuild(jobname) {
    var elasticsearchmock = nock(urlRoot_elastic)
        .persist()
        .get("/build1/_doc/0?_source=false&pretty")
        .reply(200, JSON.stringify(data[jobname]))

    const url = urlRoot_elastic + "/"+jobname+"/_doc/0?_source=false&pretty";
    const options = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        },
        json: true
    };

    // Send a http request to url
    let response = (await got(url, options)).body;
    console.log(response)
    return response;
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
            "Authorization": `admin:${token}`
        },
        json: true
    };

    // Send a http request to url
    let response = (await got(url, options)).body;
    return response;
}

exports.getBuild = getBuild;
exports.getStatus = getStatus;