class ApiResponse {
    constructor(status, code = 'SUCCESS', data = null, message = 'Success', metadata = null) {
        this.status = status;
        this.code = code;
        this.message = message; 
        this.data = data;
        this.metadata = metadata;
    }
}

module.exports = ApiResponse;
