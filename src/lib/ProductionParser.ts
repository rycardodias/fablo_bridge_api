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

        // let key: string = Object.keys(info.inputBatches)[0].toString();

        // Object.keys(info.inputBatches).map(key => {
        //     console.log(info.inputBatches[key].batch.batchComposition = undefined)
        // })


        return info.inputBatches//[key].batch

    } catch (error) {
        return { error }
    }

}