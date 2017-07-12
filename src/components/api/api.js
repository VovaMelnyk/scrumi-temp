let axios = require('axios');

function processData(url, data) {
    return axios({
        method: 'get',
        url: url,
        // data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
}

export default {
    processData: processData,
}
