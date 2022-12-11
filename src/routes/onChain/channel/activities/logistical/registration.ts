import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../../../config/fabloApi";
import RequestResponse from '../../../../../interfaces/RequestResponse'
import ErrorResponse from "../../../../../validators/ErrorResponse";
const router = express.Router();
// const isAuthenticated = require('../../validators/isAuthenticated')


router.get('/', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAllRegistrations",
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
            method: "StvgdContract:ReadRegistration",
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
        const { registrationID, activityDate, ECS, SES, batch } = req.body;

        const batchJSON = {
            docType: batch.docType,
            ID: batch.ID,
            batchType: batch.batchType,
            productionUnitID: batch.productionUnitID,
            batchInternalID: batch.batchInternalID,
            supplierID: batch.supplierID,
            quantity: Number(batch.quantity),
            unit: batch.unit,
            ecs: Number(batch.ecs),
            ses: Number(batch.ses),
            batchComposition: batch.batchComposition
        }

        const data = {
            method: "StvgdContract:CreateRegistration",
            args: [registrationID, activityDate, ECS, SES, JSON.stringify(batchJSON)]
        }

        const request = await fabloChannelRequest(req, 'invoke', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        // return next(ErrorResponse.badRequest())
        return res.status(error.response.status).json({ error: error.response.data.message })
    }
});

module.exports = router