import { Request, Response, NextFunction } from "express";
const ErrorResponse = require('./ErrorResponse')

function PermissionHandler(permission: Array<string>) {
    
    // if()
    // if (req.session?.user) next()
    // else next(ErrorResponse.forbidden())
}

module.exports = PermissionHandler;