const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

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
