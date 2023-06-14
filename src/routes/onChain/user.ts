import express, { Request, Response, NextFunction } from "express";
import fabloRequest from "../../config/fabloApi";
import RequestResponse from '../../interfaces/RequestResponse'
import ErrorResponse from "../../validators/ErrorResponse";
const router = express.Router();
const isAuthenticated = require('../../validators/isAuthenticated')

router.post('/enroll', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { id, secret } = req.body
        const request = await fabloRequest(req, 'POST', '/user/enroll', { id, secret })

        req.session.user = {
            ...req.session.user,
            onChainToken: request.data.token
        }

        return res.status(200).json({ data: req.t("user_authenticated") })
    } catch (error: any) {
        return res.status(404).json({ error: error })
    }
});

router.post('/register', async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const { id, secret } = req.body
        const request = await fabloRequest(req, 'POST', '/user/register', { id, secret })

        return res.status(200).json({ data: req.t("user_created") })
    } catch (error: any) {
        return res.status(404).json({ error: error })
    }
});

module.exports = router