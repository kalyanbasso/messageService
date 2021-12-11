var axios = require('axios');

async function getInfo(parametro, identificador){
    var url = process.env.END2
    if(parametro === 0){
        url = process.env.END1
    }
    var config = {
        method: 'get',
        url: url+"?identificador=" + identificador,
        headers: { }
    };
    var response = false;
    try {
        response = await axios(config)
        response = response.data
    } catch(err){
        console.log(err);
        response = false;
    }
    return response;
    
}


module.exports = {
    getInfo
}



