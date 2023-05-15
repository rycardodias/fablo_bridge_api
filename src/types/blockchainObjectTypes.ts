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
        [key: string]: any
    }
    isReturn: boolean,
    issuer: any,
    originProductionUnitID: string,
    transportationType: any
}

export type RegistrationType = {
    ID: string,
    activityDate: any,
    docType: 'rg',
    issuer: any,
    newBatch: {
        ID: any,
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