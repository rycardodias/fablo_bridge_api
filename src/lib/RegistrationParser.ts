import { RegistrationType } from "../types/blockchainObjectTypes";

export default function RegistrationParser(info: RegistrationType): object {
    try {
        if (info.docType !== "rg") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rg'.");

        return info.newBatch

    } catch (error) {
        return { error }
    }

}