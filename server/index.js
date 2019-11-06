const messages = require("./messages");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const config = require("./credentials.json");
const data1 = require("./data1.js");

let mock1;
// Creates express app
const app = express(); // The port used for Express server
const PORT = 3000; // Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log("Bot is listening on port " + PORT);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/", (req, res) => {
  let body;
  let build_name = req.body.text.split(" ")[0];
  // console.log(build_name);
  let action_name = req.body.text.split(" ")[1];
  // console.log(action_name); //action name is status
  data1.getBuild(build_name).then(temp => {
    //extract b-name from request //command <build2> - extract
    //console.log("name",action_name)
    if (action_name==="analysis") {
      body = messages.composeDashboardURL(build_name, temp.dashboard_url);
    } else {
      if (temp.status === "SUCCESS") {
        body = messages.successMessage(temp);
      } else {
        body = messages.faiureMessage(temp);
      }
    }

    request.post(
      {
        headers: { "content-type": "application/json" },
        url: req.body.response_url,
        body: JSON.stringify(body)
      },
      (error, response, body) => {
        // console.log("response: ", response.statusCode);
        //console.log("response: ", response.statusCode);
        res.send(temp.dashboard_url);
      }
    );
  });
});

app.post("/complete", (req, res) => {
  let body;
  if (req.body.build.status === "SUCCESS") {
    body = messages.successMessage(req.body);
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: config.HOOK_URL,
        body: JSON.stringify(body)
      },
      (error, response, body) => {
        console.log("response: ", response.statusCode);
        res.send(response);
      }
    );
  } else {
    let temp = data1.getBuild(req.body.name);
    temp.then(function(results) {
      body = messages.faiureMessage(results);
      request.post(
        {
          headers: { "content-type": "application/json" },
          url: config.HOOK_URL,
          body: JSON.stringify(body)
        },
        (error, response, body) => {
          mock1 = response.statusCode;
          // console.log(mock1)
          //console.log("response: ", response.statusCode);
          res.send(response);
        }
      );
    });
  }
});