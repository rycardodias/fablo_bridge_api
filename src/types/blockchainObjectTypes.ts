export type BatchType = {
    ID: any,
    batchInternalID: any,
    batchType: any,
    docType: any,
    finalScore: any,
    isInTransit: boolean,
    latestOwner: any,
    quantity: any,
    supplierID: any
    traceability: Array<any>
}

export type TransportationType = {
    ID: any,
    activityDate: any,
    destinationProductionUnitID: any,
    docType: any,
    inputBatch: {
        [key: string]: Record<string, any>
    }
    isReturn: boolean,
    issuer: any,
    originProductionUnitID: any,
    transportationType: any
}

export type RegistrationType = {
    ID: any,
    activityDate: any,
    docType: any,
    issuer: any,
    newBatch: {
        ID: any,
        batchComposition: {
            [key: string]: number
        },
        batchInternalID: any,
        batchType: any,
        docType: any,
        finalScore: any,
        isInTransit: boolean,
        latestOwner: any,
        quantity: any,
        supplierID: any,
    },
    productionUnitID: any
}

export type ReceptionType = {
    ID: any,
    activityDate: any,
    distance: any,
    docType: any,
    isAccepted: any,
    issuer: any,
    newBatch: object,
    productionUnitID: any,
    receivedBatch: object,
    ses: any,
    transportScore: any
}

export type ProductionType = {
    ID: any,
    activityStartDate: any,
    activityEndDate: any,
    docType: any,
    inputBatches: {
        [key: string]: any
    },
    issuer: any,
    outputBatch: object,
    productionScore: any,
    productionType: object,
    ses: any,
    productionUnitID: any
}