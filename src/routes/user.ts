import express, { Request, Response, NextFunction } from "express";
import RequestResponse from '../interfaces/RequestResponse'
const ErrorResponse = require('../classes/ErrorResponse')
const router = express.Router();
const Model = require('../models/User')

let response: RequestResponse;

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
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

router.post('/insert', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body

        const request = await Model.create({
            email: email,
            password: password,
            name: name,
        })

        if (request.length === 0) return next(ErrorResponse.noDataFound())

        response = {
            data: request,
        }

        return res.status(201).json({ data: response })
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error.errors))
    }

});

module.exports = router