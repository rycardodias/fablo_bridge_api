import { ProductionType } from "../types/blockchainObjectTypes";

export default function ProductionParser(info: ProductionType): object {
    try {
        if (info.docType !== "p") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rc'.");

        return info.inputBatches

    } catch (error) {
        return { error }
    }

}