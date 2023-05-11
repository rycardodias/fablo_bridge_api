import { TransportationType } from "../types/blockchainObjectTypes";

export default function TransportationParser(info: TransportationType): object {
    try {
        if (info.docType !== "t") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 't'.");

        let key: string = Object.keys(info.inputBatch)[0].toString();

        return info.inputBatch[key].batch

    } catch (error) {
        return { error }
    }

}