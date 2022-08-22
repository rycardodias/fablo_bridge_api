import { Request, Response, NextFunction } from "express";

function ErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {

    if (!error.errorList)
        return res.status(error.status).json({ error: req.t(error.data) })

    let errorsArray = []
    
    for (const element of error.errorList) {
        errorsArray.push(req.t(element.type, { field: element.field }))
    }

    return res.status(error.status).json({ error: errorsArray })
}

module.exports = ErrorHandler;