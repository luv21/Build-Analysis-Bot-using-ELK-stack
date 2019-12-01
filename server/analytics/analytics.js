/**
 *
 * @param {*} log
 * @param {*} build_number
 */
function calculateErrors(log, build_number) {
  let analysis = {
    status: "",
    repo_url: "",
    stages: {
      checkout: {
        errors: []
      },
      Building: {
        errors: []
      },
      Testing: {
        errors: []
      }
    }
  };
  let hits = log.hits;
  let repository = "",
    revision_number = "";
  analysis["build_number"] = build_number;
  for (let i = 0; i < hits.length; i++) {
    if (hits[i]["_source"].result) {
      analysis.status = hits[i]["_source"].result;
    }
    if (hits[i]["_source"].repository) {
      repository = hits[i]["_source"].repository;
    }
    if (hits[i]["_source"].revision_number) {
      revision_number = hits[i]["_source"].revision_number;
    }
  }
  if (analysis.status === "FAILURE") {
    for (let i = 0; i < hits.length; i++) {
      let pipeline = hits[i]["_source"].pipeline;
      if (pipeline) {
        let errors = parseErrors(pipeline[pipeline.name].info);
        analysis.stages[pipeline.name] = {
          errors
        };
      }
    }
    if (
      analysis.stages.checkout.errors.length == 0 &&
      analysis.stages.Building.errors.length == 0 &&
      analysis.stages.Testing.errors.length == 0
    ) {
      for (let i = 0; i < hits.length; i++) {
        let pipeline = hits[i]["_source"].pipeline;
        if (pipeline) {
          analysis.stages[pipeline.name] = {
            errors: [pipeline[pipeline.name].info]
          };
        }
      }
    }
  }
  analysis.repo_url = repository + revision_number;
  return analysis;
}

function analyzeProject(data) {
  let result = {};
  for (let [key, value] of Object.entries(data)) {
    result[key] = calculateErrors(value, key);
  }
  return result;
}

/**
 *
 * @param {*} errors
 */
function parseErrors(errors) {
  errors.replace("\n", "\n ");
  errors = errors.split("FAIL:");
  errors.shift();
  return errors;
}

exports.calculateErrors = calculateErrors;
exports.analyzeProject = analyzeProject;
