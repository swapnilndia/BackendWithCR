class ApiError {
    constructor(status = 500, message = 'Something Went Wrong'){
        this.status = status
        this.message = message;
    }
}

module.exports = ApiError;