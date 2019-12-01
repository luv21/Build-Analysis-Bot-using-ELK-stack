const messages = require("./messages");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const config = require("./credentials.json");
const data1 = require("./data1.js");
const charts = require("./analytics/charts");
const analytics = require("./analytics/analytics");

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
  let build_number = req.body.text.split(" ")[1];
  let action_name = req.body.text.split(" ")[0];

  res.send();

  if (action_name && build_number) {
    switch (action_name) {
      case "analysis": {
        if (!build_number) {
          data1.getProjectData("test-se").then(result => {
            charts.generateProjectChart(result);
          });
        } else {
          data1.getBuild(build_number).then(results => {
            charts.generatePieChart(results);
          });
        }
        break;
      }
      case "vis": {
        data1.getBuild(build_number).then(results => {
          if (results.status === "SUCCESS") {
            body = messages.successMessage({
              build_no: build_number,
              repo_url: results.repo_url
            });
          } else {
            body = messages.faiureMessage(results);
          }
          request.post(
            {
              headers: { "content-type": "application/json" },
              url: req.body.response_url,
              body: JSON.stringify(body)
            },
            (error, response, body) => {
              console.log(response.statusCode);
            }
          );
        });
        break;
      }
      default: {
        request.post(
          {
            headers: { "content-type": "application/json" },
            url: req.body.response_url,
            body: JSON.stringify(messages.invalidAction())
          },
          (error, response, body) => {
            console.log(response.statusCode);
          }
        );
        break;
      }
    }
  } else {
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: req.body.response_url,
        body: JSON.stringify(messages.invalidSyntax())
      },
      (error, response, body) => {
        console.log(response.statusCode);
      }
    );
  }
});

app.post("/complete", (req, res) => {
  let body;
  data1.getBuild(req.body.build_no).then(function(results) {
    if (req.body.build_status === "green") {
      body = messages.successMessage({
        build_no: req.body.build_no,
        repo_url: results.repo_url
      });
    } else {
      body = messages.faiureMessage(results);
    }
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: config.HOOK_URL,
        body: JSON.stringify(body)
      },
      (error, response, body) => {
        console.log("response: ", response.statusCode);
        // res.send(response);
      }
    );
  });
});

app.post("/jenkins", (req, res) => {
  let body;
  console.log(req.body);
  res.send("OK");
});
