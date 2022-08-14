class ErrorResponse {
    status: number;
    data: string;
    errorList: Array<any> | undefined;

    constructor(status: number, data: string, errorList: Array<any> | undefined) {
        this.status = status;
        this.data = data;
        this.errorList = errorList
    }

    static badRequest(error: any) {
        if (!error) return new ErrorResponse(400, "bad_request", undefined)

        let errorArray: Array<any> = [];

        for (const element of error) {
            switch (element.type) {
                case 'notNull Violation':
                    errorArray.push({ type: element.type, field: element.path })
                    break;
                case 'Validation error':
                    errorArray.push({ type: element.type, field: element.path })
                    break;
                default:
                    errorArray.push({ type: 'unknown_error', field: element.path })
                    break;
            }
        }

        return new ErrorResponse(400, 'bad_request', errorArray)
    }

    static internal() {
        return new ErrorResponse(500, "internal_server_error", undefined)
    }

    static noDataFound() {
        return new ErrorResponse(404, 'no_data_found', undefined)
    }
}

module.exports = ErrorResponse
