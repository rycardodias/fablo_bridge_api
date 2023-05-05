type RegistrationType = {
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

export default function RegistrationParser(info: RegistrationType): object {
    try {
        if (info.docType !== "rg") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rg'.");

        return info.newBatch

    } catch (error) {
        return { error }
    }

}