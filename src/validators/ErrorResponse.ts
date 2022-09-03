class ErrorResponse {
    status: number;
    data: string;
    errorList: Array<any> | undefined;

    constructor(status: number, data: string, errorList: Array<any> | undefined) {
        this.status = status;
        this.data = data;
        this.errorList = errorList
    }

    static validationErrorItem(info: any) {
        let objectResponse = {}
        switch (info.type) {
            case "notnull violation":
                break;
            case "string violation":
                break;
            case "unique violation":
                objectResponse = {
                    translationName: "SequelizeValidationErrorItem_must_be_unique", field: info.path
                }
                break;
            case "Validation error": {
                switch (info.validatorKey) {
                    case "notEmpty":
                        objectResponse = { translationName: "SequelizeValidationErrorItem_validation_error_not_empty", field: info.path }
                        break;
                    case "isNumeric":
                        objectResponse = { translationName: "SequelizeValidationErrorItem_validation_error_is_numeric", field: info.path }
                        break;
                }

                break;
            }
            default:
                return new ErrorResponse(400, "bad_request", undefined)
        }

        return new ErrorResponse(400, "bad_request", [objectResponse])
    }

    static badRequest(error: any) {
        if (!error) return new ErrorResponse(400, "bad_request", undefined)

        switch (error.name) {
            case "SequelizeUniqueConstraintError": {
                const info = error.errors[0]
                return ErrorResponse.validationErrorItem(info)
            }
            case "SequelizeDatabaseError": {
                break;
            }
            case "SequelizeValidationError": {
                const info = error.errors[0]
                return ErrorResponse.validationErrorItem(info)

            }

            default:
                return new ErrorResponse(400, "bad_request", undefined)
        }


        if (!error.errors) {
            let message = error.original.message

            let type = message.trim().split(':')[0].split(" ")
            let msgError = message.split(':')[0].replace(type[type.length - 1], " ").trim()
            let field = message.split(':')[1].replaceAll('"', '').trim()

            switch (msgError) {
                case 'invalid input syntax for type':
                    return new ErrorResponse(400, "bad_request", [{ translationName: "invalid_input_syntax", type: type[type.length - 1], value: field }])
                default:
                    return new ErrorResponse(400, "bad_request", undefined)
            }

        }

        let errorArray: Array<any> = [];

        for (const element of error.errors) {

            switch (element.type) {
                case 'notNull Violation':
                    errorArray.push({ translationName: element.type, field: element.path })
                    break;
                case 'Validation error':
                    errorArray.push({ translationName: element.type, field: element.path })
                    break;
                default:
                    errorArray.push({ translationName: 'unknown_error', field: element.path })
                    break;
            }
        }

        return new ErrorResponse(400, 'bad_request', errorArray)
    }

    static badRequestBodyValidator(error: any) {
        if (!error) return new ErrorResponse(400, "bad_request", undefined)

        let errorArray: Array<any> = [];

        for (const element of error) {
            switch (element.msg) {
                case 'Invalid value':
                    errorArray.push({ translationName: element.msg, field: element.param })
                    break;
                default:
                    errorArray.push({ translationName: 'unknown_error', field: element.path })
                    break;
            }
        }

        return new ErrorResponse(400, 'bad_request', errorArray)

    }

    static invalidDelete() {
        return new ErrorResponse(401, 'invalid_delete', undefined)
    }
    static invalidUpdate() {
        return new ErrorResponse(401, 'invalid_update', undefined)
    }

    static forbidden() {
        return new ErrorResponse(403, 'forbidden', undefined)
    }

    static noDataFound() {
        return new ErrorResponse(404, 'no_data_found', undefined)
    }

    static internal() {
        return new ErrorResponse(500, "internal_server_error", undefined)
    }
}

module.exports = ErrorResponse
