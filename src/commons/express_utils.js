const CONTENT_TYPE = 'Content-Type'
const APPLICATION_JSON = 'application/json'
const HTTP_CODE_OK = 200

function responseData(res, data){
    res.setHeader(CONTENT_TYPE, APPLICATION_JSON);
    res.status(HTTP_CODE_OK).send(JSON.stringify(data));
}

exports.responseSuccessData = responseData
