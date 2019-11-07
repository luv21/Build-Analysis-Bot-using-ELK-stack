//npm init --yes
//npm install request
//"116377b0664c6134c003dca90ab543d280"
var request = require('request');

var jenkins_config = {username:"admin",token:process.env.JENKINSTOKEN}

function getDefaultOptions(jobname,endpoint)
{
	var options = {
        url: "http://162.222.180.32:8080/job/"+jobname+"/api/"+endpoint,
        auth:{
            user : jenkins_config.username,
            password : jenkins_config.token
        }

	};
	return options;
}

async function get_job(jobname,endpoint){

    var options = getDefaultOptions(jobname,endpoint);
    //console.log(options);
    request(options, function(error, response, body){
        //console.log(options)
        if (!error && response.statusCode == 200) {
            console.log(body)
            obj = JSON.parse(body);
            current_build = obj.lastBuild.number;
            console.log(current_build)
            current_build_status = 1;
            console.log(obj.lastBuild.url);
            console.log(obj.color);

            // console.log(obj) // Print the json
          }
        });
}

get_job("se_p","json?pretty=true").then(data=>{
    // console.log(data);
});