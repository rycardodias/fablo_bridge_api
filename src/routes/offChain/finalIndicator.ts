import express, { Request, Response, NextFunction } from "express";
import RequestResponse from '../../interfaces/RequestResponse'
import ErrorResponse from "../../validators/ErrorResponse";
const router = express.Router();
const Model = require('../../models/FinalIndicator')
const isAuthenticated = require('../../validators/isAuthenticated')

router.get('/', isAuthenticated(), async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const request = await Model.findAll()

        return res.status(200).json({ data: request })
    } catch (error) {
        return next(ErrorResponse.badRequest())
    }
});

router.get('/byId/:id', isAuthenticated(), async (req: Request, res: Response<RequestResponse>, next: NextFunction) => {
    try {
        const request = await Model.findByPk(req.params.id)

        return res.status(200).json({ data: request })
    } catch (error) {
        return next(ErrorResponse.badRequest())
    }
});

router.post('/insert', isAuthenticated(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body

        const request = await Model.create({
            name: name
        })

        return res.status(201).json({ data: request })
    } catch (error: any) {
        return next(ErrorResponse.badRequest(error))
    }
});

router.put('/update', isAuthenticated(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, name, } = req.body

        const request = await Model.update({
            name: name,
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

router.delete('/delete', isAuthenticated(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
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