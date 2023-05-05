type ReceptionType = {
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

export default function ReceptionParser(info: ReceptionType): object {
    try {
        if (info.docType !== "rc") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rc'.");

        return info.receivedBatch

    } catch (error) {
        return { error }
    }

}