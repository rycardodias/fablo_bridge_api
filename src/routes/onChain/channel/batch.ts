import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../config/fabloApi";
import RequestResponse from '../../../interfaces/RequestResponse'
const router = express.Router();

import sampleData from '../../../../dataExample/afterTransport2.json'
import BatchParser from "../../../lib/BatchParser";
import RegistrationParser from "../../../lib/RegistrationParser";
import ReceptionParser from "../../../lib/ReceptionParser";
import TransportationParser from "../../../lib/TransportationParser";
import ParserHandler, { arcs, nodes } from "../../../lib/ParserHandler";

router.get('/', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error: error })
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
        console.log(error)
        return res.status(400).json({ error: error })
    }
});

router.get('/getBatchByInternalId/:id', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { id } = req.params

        const data = {
            method: "StvgdContract:TraceBatchByInternalID",
            args: [id]
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error: error })
    }
});

router.delete('/deleteAllBatches', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {


        const data = {
            method: "StvgdContract:DeleteAllBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        return res.status(200).json({ data: request.data.response })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error: error })
    }
});

router.get('/graphMode', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        console.log(request.data.response)
        let info = request.data.response

        await info.map((item: any) => {
            ParserHandler(item)
        })

        return res.status(200).json({ data: { nodes, arcs } })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error })
    }
});

module.exports = router