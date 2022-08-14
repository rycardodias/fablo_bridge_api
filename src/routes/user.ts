import express, { Request, Response, NextFunction } from "express";
import RequestResponse from '../interfaces/RequestResponse'
const ErrorResponse = require('../classes/ErrorResponse')
const router = express.Router();
const Model = require('../models/User')

let response: RequestResponse;

router.get('/', async (req: Request, res: Response, next: NextFunction) => {

    const request = await Model.findAll({ exclude: ['password'] })

    if (request.length === 0) {
        next(ErrorResponse.noDataFound())
        return
    }

    response = {
        status: 200,
        data: {},
    }


    return res.status(response.status).json({ data: response })
});

module.exports = router