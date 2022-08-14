import { Request, Response, NextFunction } from "express";

function ErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    return res.status(error.status).json({ error: req.t(error.data) })
}

module.exports = ErrorHandler;