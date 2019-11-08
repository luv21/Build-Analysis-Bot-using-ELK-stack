module.exports = {
  /**
   * 
   */
  successMessage: data => {
    message = {
      text: `Build build+${data.build_no} is Success!!! Click here to go to the PR`
    };
    return message;
  },

  /**
   * 
   */
  faiureMessage: elastic => {
    let count = 0;
    let attachments = new Array(0);
    for (let [key, value] of Object.entries(elastic.stages)) {
      count += value.errors.length
      let stage = {
        text: `${key} errors: ${value.errors.length}`
      }
      let errors = new Array(0);
      value.errors.forEach(error => {
        errors.push({
          text: error
        });
      });
      stage['attachments'] = errors 
      attachments.push(stage) 
    }
    return {
      text: `Build ${elastic.build_number} Failed with ${count} errors :cry: :cry: :cry: Find details below. \nLink to the commit ${elastic.repo_url}`,
      attachments
    };
  },

};
//curl -X POST -H 'Content-type: application/json' --data '{"name": "build1","url": "job/asgard/", "build": {"full_url": "http://localhost:8080/job/asgard/18/", "number": 18,"phase": "COMPLETED","status": "SUCCESsS","url": "job/asgard/18/","scm": {"url": "https://github.ncsu.edu/csc510-fall2019/CSC510-26.git","branch": "origin/master", "commit": "b769b2c1e30e628f1261668bc6ea908e84986291"}}}' localhost:3000/complete
