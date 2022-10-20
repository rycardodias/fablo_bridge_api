import express, { Request, Response, NextFunction } from "express";
import fabloRequest, { fabloChannelRequest } from "../../../config/fabloApi";
import RequestResponse from '../../../interfaces/RequestResponse'
const ErrorResponse = require('../../../validators/ErrorResponse')
const router = express.Router();
// const isAuthenticated = require('../../validators/isAuthenticated')

router.post('/readBatch', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { batchId } = req.body

        const data = {
            method: "StvgdContract:ReadBatch",
            args: [batchId]
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        console.log(error.response)
        return res.status(error.response.status).json({ error: error.response.data })
    }
});

module.exports = router