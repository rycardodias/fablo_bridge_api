import { Request, Response, NextFunction } from "express";
import ErrorResponse from './ErrorResponse'

const isAuthenticated = (permissions: Array<string> | undefined) =>
    (req: Request, res: Response, next: NextFunction) => {
        // return next();
        if (req.session.user) {

            if (req.session.user.permission === "ADMIN") return next();

            if (permissions) {
                const validPermissions = permissions.includes(req.session.user.permission)

                if (validPermissions) return next()
                else return next(ErrorResponse.forbidden())

            } else return next()

        } else return next(ErrorResponse.forbidden())
    }

module.exports = isAuthenticated;