import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import RequestResponse from '../interfaces/RequestResponse'
import BodyValidator from "../validators/BodyValidator";
const ErrorResponse = require('../validators/ErrorResponse')
const router = express.Router();
const Model = require('../models/User')
const bcrypt = require('bcrypt');
const isAuthenticated = require('../validators/isAuthenticated')

router.get('/', isAuthenticated(), async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const request = await Model.findAll({ exclude: ['password'] })

        if (request.length === 0) {
            return next(ErrorResponse.noDataFound())
        }

        return res.status(200).json({ data: request })

    } catch (error) {
        return next(ErrorResponse.badRequest())
    }
});

router.post('/insert', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body

        const hashPassword = await bcrypt.hashSync(password, 10);

        const request = await Model.create({
            email: email,
            password: hashPassword,
            name: name,
        })

        req.session.user = {
            id: request.id,
        }

        return res.status(201).json({ data: req.t("user_created") })

    } catch (error: any) {
        return next(ErrorResponse.badRequest(error))
    }
});

router.put('/update', isAuthenticated(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name, permission } = req.body

        const request = 0 || await Model.update({
            name: name,
            permission: permission
        }, {
            where: { email: email },
            returning: true
        })

        if (request[0] === 0) return next(ErrorResponse.invalidUpdate())

        return res.status(201).json({ data: request[1] })
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error))
    }
});

router.delete('/delete', isAuthenticated(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const request = await Model.destroy({
            where: {
                email: email,
            }
        })

        if (request === 0) return next(ErrorResponse.invalidDelete())

        return res.status(201).json({ data: req.t("row_deleted") })
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error))
    }
});

router.post('/login',
    [
        body("email").isEmail(),
        body('password').isLength({ min: 6 }),
        BodyValidator
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body

            const request = await Model.findOne({ where: { email: email } })

            if (!request || !password) {
                return next(ErrorResponse.noDataFound())
            }

            if (await bcrypt.compareSync(password, request.password)) {
                req.session.user = {
                    id: request.id,
                    permission: request.permission
                }
            }

            return res.status(200).json({ data: req.t("user_authenticated") })

        } catch (error: any) {
            return next(ErrorResponse.badRequest(error))
        }
    });

module.exports = router