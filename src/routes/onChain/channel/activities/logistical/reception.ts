import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../../../config/fabloApi";
import RequestResponse from '../../../../../interfaces/RequestResponse'
import ErrorResponse from "../../../../../validators/ErrorResponse";
const router = express.Router();
// const isAuthenticated = require('../../validators/isAuthenticated')
const client = require('../../../../../config/clientRedis');


router.get('/', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAllReceptions",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data.message })
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

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        return res.status(error.response.status).json({ error: error.response.data.message })
    }
});

router.post('/insert', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { receptionID, productionUnitInternalID, activityDate, receivedBatchID, newBatchID,
            newBatchInternalID, isAccepted, transportScore, ses, distance } = req.body;

        const data = {
            method: "StvgdContract:CreateReception",
            args: [receptionID, productionUnitInternalID, activityDate, receivedBatchID, newBatchID,
                newBatchInternalID, isAccepted, transportScore, ses, distance, '1'] //FIXME: remover parametro hardcode do cost
        }

        const request = await fabloChannelRequest(req, 'invoke', data)

        client.del('graphMode')
        client.del('graphMapMode')

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error: error })
    }
});

module.exports = router