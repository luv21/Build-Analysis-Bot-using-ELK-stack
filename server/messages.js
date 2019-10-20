module.exports = {
  successMessage: data => {
    message = {
      text: `Build ${data.name} is Success!!! Click here to go to the PR`
    };
    return message;
  },

  faiureMessage: elastic => {
    let count = elastic.errors.length;
    let errors = new Array(0);
    elastic.errors.forEach(error => {
      errors.push({
        text: `Type: ${error.text}\n In: ${error.file + " " + error.location}`
      });
    });
    return {
      text: `Build ${elastic.name} Failed with ${count} errors :cry: :cry: :cry: Find details below`,
      attachments: errors
    };
  }
};
//curl -X POST -H 'Content-type: application/json' --data '{"name": "build1","url": "job/asgard/", "build": {"full_url": "http://localhost:8080/job/asgard/18/", "number": 18,"phase": "COMPLETED","status": "SUCCESsS","url": "job/asgard/18/","scm": {"url": "https://github.ncsu.edu/csc510-fall2019/CSC510-26.git","branch": "origin/master", "commit": "b769b2c1e30e628f1261668bc6ea908e84986291"}}}' localhost:3000/complete
