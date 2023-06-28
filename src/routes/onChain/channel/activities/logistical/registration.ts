import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../../../config/fabloApi";
import RequestResponse from '../../../../../interfaces/RequestResponse'
const router = express.Router();
const client = require('../../../../../config/clientRedis');
const isAuthenticated = require('../../../../../validators/isAuthenticated')


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

router.post('/insert', isAuthenticated(['RESPONSABLE', 'MEMBER']), async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { registrationID, ProductionUnitID, batchID, batchType, batchInternalID,
            supplierID, quantity, batchComposition } = req.body;

        function calculateFinalScore(): string {
            return '-3'
        }

        const data = {
            method: "StvgdContract:CreateRegistration",
            args: [registrationID, ProductionUnitID, batchID, batchType, batchInternalID,
                supplierID, quantity, calculateFinalScore(), JSON.stringify(batchComposition)]
        }

        const request = await fabloChannelRequest(req, 'invoke', data)

        client.del('graphMode')
        client.del('graphModeOriginal')
        client.del('graphMapMode')
        client.del('graphMapModeOriginal')


        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error: error })
    }
});

module.exports = router