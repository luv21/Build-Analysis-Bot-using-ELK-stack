const { CanvasRenderService } = require("chartjs-node-canvas");
const fs = require("fs");
var Slack = require("node-slack-upload");
const config = require("../credentials.json");

async function generatePieChart(analysis) {
  const width = 400; //px
  const height = 400; //px
  let labels = new Array(0);
  let stage_data = new Array(0);
  count = 0;
  for (let [key, value] of Object.entries(analysis.stages)) {
    stage_data.push(value.errors.length);
    count += value.errors.length;
  }
  for (let [key, value] of Object.entries(analysis.stages)) {
    labels.push(key + " " + (value.errors.length * 100) / count + "%");
  }
  //   console.log(stage_data, labels)
  const configuration = {
    type: "polarArea",
    data: {
      datasets: [
        {
          data: stage_data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 159, 64, 0.6)"
          ]
        }
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: labels
    }
  };
  const canvasRenderService = new CanvasRenderService(
    width,
    height,
    ChartJS => {}
  );
  const image = await canvasRenderService.renderToBuffer(configuration);
  fs.writeFile("image.png", image, err => {
    // throws an error, you could also catch it here
    if (err) throw err;
    var slack = new Slack(config.BOT_OAUTH_ACCESS_TOKEN);
    slack.uploadFile(
      {
        file: fs.createReadStream("image.png"),
        filetype: "auto",
        title: "Build analysis",
        initialComment: "Build specific analysis",
        channels: config.SLACK_CHANNEL
      },
      function(err, data) {
        if (err) {
          console.error(err);
        } else {
        }
      }
    );
    // success case, the file was saved
    console.log("Image saved");
  });
}

async function generateLineChart(data) {
  const width = 400; //px
  const height = 400; //px
  let labels = new Array(0);
  let stage_data = {
    checkout: [],
    Building: [],
    Testing: []
  };
  for (let [key, value] of Object.entries(data)) {
    labels.push("Build "+key);
    for (let [stage, obj] of Object.entries(value.stages)) {
      stage_data[stage].push(obj.errors.length);
    }
  }
  let data1 = {
    labels: labels,
    datasets: [
      {
        label: "checkout",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "blue", // The main line color
        borderCapStyle: "square",
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: stage_data.checkout,
        spanGaps: true
      },
      {
        label: "Building",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "green", // The main line color
        borderCapStyle: "square",
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: stage_data.Building,
        spanGaps: true
      },
      {
        label: "Testing",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(255, 159, 64)",
        borderColor: "red", // The main line color
        borderCapStyle: "square",
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: stage_data.Testing,
        spanGaps: true
      }
    ]
  };

  let options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "Errors",
            fontSize: 20
          }
        }
      ]
    }
  };

  const configuration = {
    type:"line",
    data: data1,
    options
  };
  const canvasRenderService = new CanvasRenderService(
    width,
    height,
    ChartJS => {}
  );
  const image = await canvasRenderService.renderToBuffer(configuration);
  fs.writeFile("image.png", image, err => {
    // throws an error, you could also catch it here
    if (err) throw err;
    var slack = new Slack(config.BOT_OAUTH_ACCESS_TOKEN);
    slack.uploadFile(
      {
        file: fs.createReadStream("image.png"),
        filetype: "auto",
        title: "Project-Analysis",
        initialComment: "Build-wise analysis of failures",
        channels: config.SLACK_CHANNEL
      },
      function(err, data) {
        if (err) {
          console.error(err);
        } else {
        }
      }
    );
    // success case, the file was saved
    console.log("Image saved");
  });
}

function generateProjectChart(data) {
  generateLineChart(data);
}


exports.generatePieChart = generatePieChart;
exports.generateProjectChart = generateProjectChart;
