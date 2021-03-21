module.exports =  class Error {
    constructor(statusCode, keyMessage, message) {
        this.statusCode = statusCode;
        this.keyMessage = keyMessage;
        this.message = message;
    }
}