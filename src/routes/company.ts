import express, { Request, Response, NextFunction } from "express";
import RequestResponse from '../interfaces/RequestResponse'
const ErrorResponse = require('../validators/ErrorResponse')
const router = express.Router();
const Model = require('../models/Company')
const isAuthenticated = require('../validators/isAuthenticated')

router.get('/', isAuthenticated(), async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const request = await Model.findAll()

        if (request.length === 0) {
            return next(ErrorResponse.noDataFound())
        }

        return res.status(200).json({ data: request })
    } catch (error) {
        return next(ErrorResponse.badRequest())
    }
});

router.get('/byId/:id', isAuthenticated(), async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const request = await Model.findByPk(req.params.id)

        if (!request) return next(ErrorResponse.noDataFound())

        return res.status(200).json({ data: request })
    } catch (error) {
        return next(ErrorResponse.badRequest())
    }
});

router.post('/insert', isAuthenticated(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { legalName, shortName, fiscalNumber, caeType } = req.body

        const request = await Model.create({
            legalName: legalName,
            shortName: shortName,
            fiscalNumber: fiscalNumber,
            caeType: caeType
        })

        return res.status(201).json({ data: request })
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error))
    }
});

router.put('/update', isAuthenticated(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, legalName, shortName, fiscalNumber, caeType } = req.body

        const request = await Model.update({
            legalName: legalName,
            shortName: shortName,
            fiscalNumber: fiscalNumber,
            caeType: caeType
        }, {
            where: { id: id },
            returning: true
        })

        if (request[0] === 0) return next(ErrorResponse.invalidUpdate())

        return res.status(201).json({ data: request[1] })
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error))
    }
});

router.delete('/delete', isAuthenticated(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body

        const request = await Model.destroy({
            where: {
                id: id,
            }
        })

        if (request === 0) return next(ErrorResponse.invalidDelete())

        return res.status(201).json({ data: req.t("row_deleted") })
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error))
    }
});


module.exports = router