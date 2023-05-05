type BatchType = {
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


export default function BatchParser(info: BatchType): object {
    try {
        if (info.docType !== "b") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'b'.");

        if (!info.traceability) return {}

        return info.traceability[0]

    } catch (error) {
        return { error }
    }

}