import express, { Request, Response, NextFunction } from "express";
import fabloRequest, { fabloChannelRequest } from "../../../config/fabloApi";
import RequestResponse from '../../../interfaces/RequestResponse'
const ErrorResponse = require('../../../validators/ErrorResponse')
const router = express.Router();
// const isAuthenticated = require('../../validators/isAuthenticated')

router.get('/', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data })
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

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data })
    }
});

router.delete('/delete', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { id } = req.body;

        const data = {
            method: "StvgdContract:DeleteBatch",
            args: [id]
        }

        const request = await fabloChannelRequest(req, 'invoke', data)

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data })
    }
});

module.exports = router