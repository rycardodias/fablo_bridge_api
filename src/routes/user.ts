import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import RequestResponse from '../interfaces/RequestResponse'
import BodyValidator from "../validators/BodyValidator";
const ErrorResponse = require('../validators/ErrorResponse')
const router = express.Router();
const Model = require('../models/User')
const bcrypt = require('bcrypt');
const isAuthenticated = require('../validators/isAuthenticated')

let response: RequestResponse;


router.get('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = await Model.findAll({ exclude: ['password'] })

        if (request.length === 0) {
            return next(ErrorResponse.noDataFound())
        }

        response = {
            data: request,
        }

        return res.status(200).json(response)

    } catch (error) {
        return next(ErrorResponse.badRequest())
    }
});

router.post('/insert', [
    body("email").isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').exists(),
    BodyValidator,
], async (req: Request, res: Response, next: NextFunction) => {
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

        response = {
            data: req.t("user_created"),
        }

        return res.status(201).json(response)

    } catch (error: any) {
        return next(ErrorResponse.badRequest(error.errors))
    }
});

router.put('/update', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body

        const request = await Model.update({
            name: name,
        }, {
            where: { email: email },
            returning: true
        },
        )

        if (request[0] === 0) return next(ErrorResponse.invalidUpdate())

        response = {
            data: request[1],
        }

        return res.status(201).json(response)
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error.errors))
    }
});

router.delete('/delete', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const request = await Model.destroy({
            where: {
                email: email,
            }
        }
        )

        if (request === 0) return next(ErrorResponse.invalidDelete())

        response = {
            data: req.t("row_deleted"),
        }

        return res.status(201).json(response)
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error.errors))
    }
});

router.post('/login', [
    body("email").isEmail(),
    body('password').isLength({ min: 6 }),
], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const request = await Model.findOne({ where: { email: email } })

        if (await bcrypt.compareSync(password, request.password)) {
            req.session.user = {
                id: request.id,
            }
        }

        response = {
            data: req.t("user_authenticated"),
        }

        return res.status(200).json(response)

    } catch (error: any) {
        return next(ErrorResponse.badRequest(error.errors))
    }
});

module.exports = router