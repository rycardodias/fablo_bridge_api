import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../../config/fabloApi";
import RequestResponse from '../../../../interfaces/RequestResponse'
import ErrorResponse from "../../../../validators/ErrorResponse";
const router = express.Router();
// const isAuthenticated = require('../../validators/isAuthenticated')


router.get('/', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAllProductions",
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
            method: "StvgdContract:ReadProduction",
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
        const { productionID, productionUnitInternalID, productionType, activityStartDate, batchID,
            batchType, batchInternalID, supplierID, inputBatches, batchComposition, quantity,
            finalScore, productionScore, ses } = req.body;

        const data = {
            method: "StvgdContract:CreateProduction",
            args: [productionID, productionUnitInternalID, productionType, activityStartDate, batchID,
                batchType, batchInternalID, supplierID, JSON.stringify(inputBatches),
                JSON.stringify(batchComposition), quantity, finalScore, productionScore, ses]
        }

        const request = await fabloChannelRequest(req, 'invoke', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error: error })
    }
});

module.exports = router

