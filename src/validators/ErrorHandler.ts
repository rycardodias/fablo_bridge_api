import { Request, Response, NextFunction } from "express";
import RequestResponse from '../interfaces/RequestResponse'

let response: RequestResponse;

function ErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    

    if (!error.errorList) {
        response = {
            error: req.t(error.data)
        }
        
    } else {
        let errorsArray = []
        
        for (const element of error.errorList) {
            errorsArray.push(req.t(element.type, { field: element.field }))
        }

        response = {
            error: errorsArray
        }

    }

    return res.status(error.status).json(response)
}

module.exports = ErrorHandler;