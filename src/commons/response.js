 class Response{
    constructor(isSuccess, data, error) {
        this.isSuccess= isSuccess;
        this.data = data;
        this.error = error;
    }
}

 module.exports = Response