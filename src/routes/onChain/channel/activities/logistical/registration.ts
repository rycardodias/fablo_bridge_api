import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../../../config/fabloApi";
import RequestResponse from '../../../../../interfaces/RequestResponse'
const router = express.Router();


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
        const { registrationID, ProductionUnitID, batchID, batchType, batchInternalID,
            supplierID, quantity, finalScore, batchComposition } = req.body;

        const data = {
            method: "StvgdContract:CreateRegistration",
            args: [registrationID, ProductionUnitID, batchID, batchType, batchInternalID,
                supplierID, quantity, finalScore, JSON.stringify(batchComposition)]
        }

        console.log(data)

        const request = await fabloChannelRequest(req, 'invoke', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        return res.status(400).json({ error: error })
    }
});

module.exports = router