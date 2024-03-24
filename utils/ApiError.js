class ApiError {
    constructor(status = 500, code = 'INTERNAL_SERVER_ERROR', message = 'Something went wrong', data = null) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

module.exports = ApiError;
