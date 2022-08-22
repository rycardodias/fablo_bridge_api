import { Request, Response, NextFunction } from "express";
const ErrorResponse = require('./ErrorResponse')

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) next()
    else next(ErrorResponse.forbidden())
}

module.exports = isAuthenticated;