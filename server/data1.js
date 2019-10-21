const nock = require("nock")
const got  = require('got');
const data = require("./mock_data/elasticMock.json")
urlRoot = "https://35.208.168.86:9200"

var elasticsearchmock = nock(urlRoot)
	.get("/jenkins/_doc/0?_source=false&pretty")
	.reply(200, JSON.stringify(data.build1))

async function getBuild() {
    const url = urlRoot + "/jenkins/_doc/0?_source=false&pretty";
    const options = {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        },
        json: true
    };
    
    // Send a http request to url
    let response = (await got(url, options)).body;
    return response;
}

exports.getBuild = getBuild;