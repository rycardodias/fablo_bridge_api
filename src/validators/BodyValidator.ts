import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";
const ErrorResponse = require('./ErrorResponse')


function BodyValidator(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(ErrorResponse.badRequestBodyValidator(errors.array()))
    }

    next()

}

export default BodyValidator;
