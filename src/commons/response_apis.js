function successResp(message, result, statusCode) {
    return {
        message: 'OK',
        error: false,
        code: statusCode,
        data: result
    }
}

function errorResp(message, statusCode) {
    let codes = [200, 201, 400, 401, 404, 403, 422, 500];

    //get matched code
    let findCode = codes.find((code) => code === statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
        error: true
    }
}

function simpleSuccessResp(result, statusCode) {
    return successResp('OK', result, statusCode)
}

exports.simpleSuccessResp = simpleSuccessResp
exports.errorResp = errorResp