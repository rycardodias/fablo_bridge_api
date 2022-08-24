import { Request, Response, NextFunction } from "express";
import RequestResponse from '../interfaces/RequestResponse'

function ErrorHandler(error: any, req: Request, res: Response<RequestResponse>, next: NextFunction) {

    if (!error.errorList) return res.status(error.status).json({ error: req.t(error.data) })

    else {
        let errorsArray = []

        for (const element of error.errorList) {
            errorsArray.push(req.t(element.type, { field: element.field }))
        }

        return res.status(error.status).json({ error: errorsArray })
    }


}

module.exports = ErrorHandler;