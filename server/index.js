const data  = require('./data');
const messages = require('./messages')
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const config = require('./credentials.json');
const data1 = require('./data1.js')

// Creates express app
const app = express(); // The port used for Express server
const PORT = 3000; // Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log("Bot is listening on port " + PORT);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/", (req, res) => {
  let body = {
    text: "Botwa to the rescue :rhinoceros:",
    attachments: [
      {
        text: "Let's defeat Thanos!!! :dog: :dog: :dog:"
      }
    ]
  };

  request.post(
    {
      headers: { "content-type": "application/json" },
      url: req.body.response_url,
      body: JSON.stringify(body)
    },
    (error, response, body) => {
      console.log("response: ", response.statusCode);
      res.json();
    }
  );
});

app.post("/complete", (req, res) => {

  let body;
  if(req.body.build.status==='SUCCESS'){
    body =  messages.successMessage(req.body)
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: config.HOOK_URL,
        body: JSON.stringify(body)
      },
      (error, response, body) => {
        console.log("response: ", response.statusCode);
        res.json();
      }
    );
  }
  else{
    let temp =  data1.getBuild(req.body.name);
    temp.then(function(results){
      body = messages.faiureMessage(results)
      request.post(
       {
          headers: { "content-type": "application/json" },
          url: config.HOOK_URL,
          body: JSON.stringify(body)
        },
        (error, response, body) => {
          console.log("response: ", response.statusCode);
          res.json();
        }
      );
    })
  }
});