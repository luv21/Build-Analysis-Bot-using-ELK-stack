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
      count += value.errors.length;
      attachments.push({
        text: `*${key} errors: ${value.errors.length}*`
      });
      let errors = new Array(0);
      value.errors.forEach(error => {
        attachments.push({
          text: error
        });
      });

    }
    return {
      text: `Build ${elastic.build_number} Failed with ${count} errors :cry: :cry: :cry: Find details below. \nLink to the commit ${elastic.repo_url}`,
      attachments
    };
  }
};
//curl -X POST -H 'Content-type: application/json' --data '{ "build_no": 1, "build_status": "red", "project": "test" }' localhost:3000/complete
