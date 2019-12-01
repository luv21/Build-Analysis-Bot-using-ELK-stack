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
  },
  invalidAction: () => {
    return {
      text: "Invalid action. Please use either `bot-assemble analysis {project-name} {build-number}` or `bot-assemble vis {project-name} {build-number}`"
    };
  },
  invalidSyntax: () => {
    return {
      text: "Invalid Syntax. Please use `bot-assemble {action} {project-name} {build-number}` to get the details"
    };
  }
};
