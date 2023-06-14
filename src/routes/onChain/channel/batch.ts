import express, { Request, Response, NextFunction } from "express";
import { fabloChannelRequest } from "../../../config/fabloApi";
import RequestResponse from '../../../interfaces/RequestResponse'
const router = express.Router();
import getTraceabilityMapData from "../../../functions/graphMapMode/GraphMapHandler";
import getTraceabilityData from "../../../functions/graphMode/graphModeHandler";
import getTraceabilityDataById from "../../../functions/getTraceabilyByID";
import getTraceabilityDataByIDHandler from "../../../functions/graphMode/graphModeHandlerID";
import { getRedisData, setRedisData } from "../../../functions/RedisOperations";
const client = require('../../../config/clientRedis');


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
        const cachedData = await getRedisData('graphMode')

        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) })
        }

        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        let info = request.data.response

        const result = getTraceabilityData(info)

        await setRedisData('graphMode', 60 * 60 * 24, JSON.stringify(result))

        return res.status(200).json({ data: result })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error })
    }
});

router.get('/graphModeID/:ID', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { ID } = req.params

        const cachedData = await getRedisData('graphModeID' + ID)
        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) })
        }

        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        let info = request.data.response

        let infoByID = getTraceabilityDataById(info, ID)


        const result = getTraceabilityDataByIDHandler([infoByID])

        await setRedisData('graphModeID' + ID, 60 * 60 * 24, JSON.stringify(result))

        return res.status(200).json({ data: result })
    } catch (error: any) {
        return res.status(400).json({ error })
    }
});

router.get('/graphMapMode', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {

        const cachedData = await getRedisData('graphMapMode')
        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) })
        }

        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        const request = await fabloChannelRequest(req, 'query', data)

        let info = request.data.response

        const result = getTraceabilityMapData(info)

        await setRedisData('graphMapMode', 60 * 60 * 24, JSON.stringify(result))

        return res.status(200).json({ data: result })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error })
    }
});

router.get('/graphMapModeID/:ID', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { ID } = req.params

        const cachedData = await getRedisData('graphMapModeID' + ID)
        if (cachedData) {
            return res.status(200).json({ data: JSON.parse(cachedData) })
        }

        const data = {
            method: "StvgdContract:GetAvailableBatches",
            args: []
        }

        let info

        const cachedMainData =await getRedisData('graphMode') || await getRedisData('graphMapMode')

        if (cachedMainData) {
            info = JSON.parse(cachedData)
        } else {
            const request = await fabloChannelRequest(req, 'query', data)

            info = request.data.response
        }


        const infoByID = getTraceabilityDataById(info, ID)

        const result = getTraceabilityMapData([infoByID])

        await setRedisData('graphMapModeID' + ID, 60 * 60 * 24, JSON.stringify(result))

        return res.status(200).json({ data: result })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error })
    }
});

module.exports = router