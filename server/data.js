const elasticData = require('./mock_data/elasticMock.json')

module.exports = {
    getBuild : (id) => {
        const data = elasticData[id];
        return data;
    }   
}

