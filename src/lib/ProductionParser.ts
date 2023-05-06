type ProductionType = {
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


export default function ProductionParser(info: ProductionType): object {
    try {
        if (info.docType !== "p") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rc'.");

        return info.inputBatches

    } catch (error) {
        return { error }
    }

}