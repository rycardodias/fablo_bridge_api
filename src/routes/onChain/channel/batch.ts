import express, { Request, Response, NextFunction } from "express";
import fabloRequest, { fabloChannelRequest } from "../../../config/fabloApi";
import RequestResponse from '../../../interfaces/RequestResponse'
import ErrorResponse from "../../../validators/ErrorResponse";
const router = express.Router();
// const isAuthenticated = require('../../validators/isAuthenticated')

router.get('/', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data.message })
    }
});

router.get('/getBatchById/:id', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { id } = req.params

        const data = {
            method: "StvgdContract:ReadBatch",
            args: [id]
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data.message })
    }
});

module.exports = router