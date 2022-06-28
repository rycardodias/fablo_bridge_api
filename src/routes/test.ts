import express, { Request, Response, NextFunction } from "express";
import RequestResponse from '../interfaces/RequestResponse'
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    let resposta: RequestResponse = {
        status: 200,
        statusText: "",
        data: { nome: 'banana' }
    }

    return res.status(resposta.status).json(resposta.data)
});

module.exports = router