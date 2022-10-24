import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../../../config/fabloApi";
import RequestResponse from '../../../../../interfaces/RequestResponse'
const ErrorResponse = require('../../../../../validators/ErrorResponse')
const router = express.Router();
// const isAuthenticated = require('../../validators/isAuthenticated')


router.get('/', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAllReceptions",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data })
    }
});

router.get('/getById/:id', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { id } = req.params

        const data = {
            method: "StvgdContract:ReadReception",
            args: [id]
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data })
    }
});

router.post('/insert', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { receptionID, productionUnitID, activityDate, receivedBatchID, newBatchID,
            newBatchInternalID, isAccepted, ECS, SES } = req.body;

        const data = {
            method: "StvgdContract:CreateReception",
            args: [receptionID, productionUnitID, activityDate, receivedBatchID, newBatchID,
                newBatchInternalID, isAccepted, ECS, SES]
        }


        const request = await fabloChannelRequest(req, 'invoke', data)

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        console.log(error)
        // return next(ErrorResponse.badRequest())
        return res.status(error.response.status).json({ error: error.response.data })
    }
});


router.delete('/delete', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { id } = req.body;

        const data = {
            method: "StvgdContract:DeleteReception",
            args: [id]
        }

        const request = await fabloChannelRequest(req, 'invoke', data)

        return res.status(200).json({ data: request.data })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data })
    }
});

module.exports = router