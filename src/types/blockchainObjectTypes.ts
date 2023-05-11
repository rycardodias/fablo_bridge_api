export type BatchType = {
    ID: string,
    batchInternalID: any,
    batchType: any,
    docType: 'b',
    finalScore: any,
    isInTransit: boolean,
    latestOwner: any,
    quantity: any,
    supplierID: any
    traceability: Array<any>
}

export type TransportationType = {
    ID: string,
    activityDate: any,
    destinationProductionUnitID: string,
    docType: 't',
    inputBatch: {
        [key: string]: Record<string, any>
    }
    isReturn: boolean,
    issuer: any,
    originProductionUnitID: string,
    transportationType: any
}

export type RegistrationType = {
    ID: string,
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
        docType: "rg",
        finalScore: any,
        isInTransit: boolean,
        latestOwner: any,
        quantity: any,
        supplierID: any,
    },
    productionUnitID: string
}

export type ReceptionType = {
    ID: string,
    activityDate: any,
    distance: any,
    docType: 'rc',
    isAccepted: any,
    issuer: any,
    newBatch: {
        ID: string,
    },
    productionUnitID: string,
    receivedBatch: {
        ID: string,
    },
    ses: any,
    transportScore: any
}

export type ProductionType = {
    ID: string,
    activityStartDate: any,
    activityEndDate: any,
    docType: 'p',
    inputBatches: {
        [key: string]: any
    },
    issuer: any,
    outputBatch: {
        ID: string,
    },
    productionScore: any,
    productionType: object,
    ses: any,
    productionUnitID: string
}