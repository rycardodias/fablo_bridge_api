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

router.get('/graphMode', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const cachedFullData = await getRedisData('GetAvailableBatches')

        if (cachedFullData) {
            const cachedSpecificData = await getRedisData('graphMode')

            if (cachedSpecificData) {
                return res.status(200).json({ data: JSON.parse(cachedSpecificData) })
            } else {
                console.log("entra aqui")
                const result = getTraceabilityData(JSON.parse(cachedFullData))

                await setRedisData('graphMode', 60 * 60 * 24 * 30, JSON.stringify(result))

                return res.status(200).json({ data: result })
            }
        } else {
            const data = {
                method: "StvgdContract:GetAvailableBatches",
                args: []
            }

            const request = await fabloChannelRequest(req, 'query', data)

            let info = request.data.response

            await setRedisData('GetAvailableBatches', 60 * 60 * 24 * 30, JSON.stringify(info))

            const result = getTraceabilityData(info)

            await setRedisData('graphMode', 60 * 60 * 24 * 30, JSON.stringify(result))

            return res.status(200).json({ data: result })

        }
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error })
    }
});

router.get('/graphModeID/:ID', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { ID } = req.params

        const cachedFullData = await getRedisData('GetAvailableBatches')

        if (cachedFullData) {
            const cachedSpecificData = await getRedisData('graphModeID' + ID)

            if (cachedSpecificData) {
                return res.status(200).json({ data: JSON.parse(cachedSpecificData) })
            } else {
                let infoByID = getTraceabilityDataById(JSON.parse(cachedFullData), ID)

                const result = getTraceabilityDataByIDHandler([infoByID])

                await setRedisData('graphModeID' + ID, 60 * 60 * 24 * 30, JSON.stringify(result))

                return res.status(200).json({ data: result })
            }
        } else {

            const data = {
                method: "StvgdContract:GetAvailableBatches",
                args: []
            }

            const request = await fabloChannelRequest(req, 'query', data)

            let info = request.data.response

            await setRedisData('GetAvailableBatches', 60 * 60 * 24 * 30, JSON.stringify(info))

            let infoByID = getTraceabilityDataById(info, ID)

            const result = getTraceabilityDataByIDHandler([infoByID])

            await setRedisData('graphModeID' + ID, 60 * 60 * 24 * 30, JSON.stringify(result))

            return res.status(200).json({ data: result })
        }

    } catch (error: any) {
        return res.status(400).json({ error })
    }
});

router.get('/graphMapMode', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const cachedFullData = await getRedisData('GetAvailableBatches')

        if (cachedFullData) {
            const cachedSpecificData = await getRedisData('graphMapMode')

            if (cachedSpecificData) {
                return res.status(200).json({ data: JSON.parse(cachedSpecificData) })
            } else {
                const result = getTraceabilityMapData(JSON.parse(cachedFullData))

                await setRedisData('graphMapMode', 60 * 60 * 24 * 30, JSON.stringify(result))

                return res.status(200).json({ data: result })
            }
        } else {
            const data = {
                method: "StvgdContract:GetAvailableBatches",
                args: []
            }

            const request = await fabloChannelRequest(req, 'query', data)

            let info = request.data.response

            await setRedisData('GetAvailableBatches', 60 * 60 * 24 * 30, JSON.stringify(info))

            const result = getTraceabilityMapData(info)

            await setRedisData('graphMapMode', 60 * 60 * 24 * 30, JSON.stringify(result))

            return res.status(200).json({ data: result })
        }
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error })
    }
});

router.get('/graphMapModeID/:ID', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { ID } = req.params

        const cachedFullData = await getRedisData('GetAvailableBatches')

        if (cachedFullData) {
            const cachedSpecificData = await getRedisData('graphMapModeID' + ID)

            if (cachedSpecificData) {
                return res.status(200).json({ data: JSON.parse(cachedSpecificData) })
            } else {
                const infoByID = getTraceabilityDataById(JSON.parse(cachedFullData), ID)

                const result = getTraceabilityMapData([infoByID])

                await setRedisData('graphMapModeID' + ID, 60 * 60 * 24 * 30, JSON.stringify(result))

                return res.status(200).json({ data: result })
            }
        } else {
            const data = {
                method: "StvgdContract:GetAvailableBatches",
                args: []
            }

            const request = await fabloChannelRequest(req, 'query', data)

            let info = request.data.response

            await setRedisData('GetAvailableBatches', 60 * 60 * 24 * 30, JSON.stringify(info))

            const infoByID = getTraceabilityDataById(info, ID)

            const result = getTraceabilityMapData([infoByID])

            await setRedisData('graphModeID' + ID, 60 * 60 * 24 * 30, JSON.stringify(result))

            return res.status(200).json({ data: result })
        }
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({ error })
    }
});

module.exports = router