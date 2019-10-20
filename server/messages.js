module.exports = {
  successMessage: data => {
    message = {
      blocks: [
        {
          type: "section",
          text: `Build ${data.name} is Success!!! Click here to go to the PR`
        }
      ]
    };
    return message;
  },

  faiureMessage: (elastic) => {
    let count = elastic.errors.length;
    let errors = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Build ${elastic.name} Failed with ${count} errors :sad: :sad: :sad: Find details below`
        }
      }
    ];
    elastic.errors.forEach(error => {
      errors.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Type: ${error.text}\n In: ${error.file + " " + error.location}`
        }
      });
    });
    return {blocks:errors}
  }
};
//curl -X POST -H 'Content-type: application/json' --data '{"name": "build1","url": "job/asgard/", "build": {"full_url": "http://localhost:8080/job/asgard/18/", "number": 18,"phase": "COMPLETED","status": "SUCCESsS","url": "job/asgard/18/","scm": {"url": "https://github.ncsu.edu/csc510-fall2019/CSC510-26.git","branch": "origin/master", "commit": "b769b2c1e30e628f1261668bc6ea908e84986291"}}}' localhost:3000/complete