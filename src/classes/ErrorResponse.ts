class ErrorResponse {
    status: number;
    data: string;

    constructor(status: number, data: string) {
        this.status = status;
        this.data = data;
    }

    static badRequest() {
        return new ErrorResponse(400, "bad_request")
    }

    static internal() {
        return new ErrorResponse(500, "Internal Server Error")
    }

    static noDataFound() {
        return new ErrorResponse(404, 'no_data_found')
    }
}

module.exports = ErrorResponse
