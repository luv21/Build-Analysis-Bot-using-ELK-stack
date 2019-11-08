
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
  let hits = log.hits
  analysis.repo_url = hits[1]["_source"].repository+"/commit/"+hits[0]["_source"].revision_number
  analysis['build_number'] = build_number 
  for(let i=2;i<hits.length-1;i++){
      let pipeline = hits[i]["_source"].pipeline
      if(pipeline){
          let errors = parseErrors(pipeline[pipeline.name].info)
          analysis.stages[pipeline.name] = {
              errors
          }

      }

  }
  analysis.status = hits[hits.length-1]["_source"].result
  return analysis
}

/**
 * 
 * @param {*} errors 
 */
function parseErrors(errors){
    errors.replace("\n", "\n ")
    errors = errors.split("FAIL:");
    errors.shift();
    return errors;
}

exports.calculateErrors = calculateErrors;
