
import { BatchType } from "../types/blockchainObjectTypes";

export default function BatchParser(info: BatchType): any | undefined {
    try {
        if (info.docType !== "b") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'b'.");

        if (!info.traceability) return

        return info.traceability[0]

    } catch (error) {
        return { error }
    }

}