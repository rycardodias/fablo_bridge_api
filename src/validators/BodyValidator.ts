import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";
import ErrorResponse from './ErrorResponse'

export default function BodyValidator(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(ErrorResponse.badRequestBodyValidator(errors.array()))
    }

    next()
}

