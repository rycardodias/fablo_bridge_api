
import type { BatchType, ProductionType, ReceptionType, RegistrationType, TransportationType } from "../types/blockchainObjectTypes";

let searchBatchID: string = "";
let batchTraceability: any = null;

function batchProcedure(info: BatchType): void {
    try {
        if (info.docType !== "b") throw new Error("Unexpected document type! Expected value is 'b'.");

        if (!info.traceability) return

        if (info.ID === searchBatchID) {
            batchTraceability = info
        } else {
            GraphMapHandler(info.traceability[0])
        }

    } catch (error) {
        console.log('batchProcedure', error);
        throw error
    }
}

function productionProcedure(info: ProductionType): void {
    try {
        if (info.docType !== "p") throw new Error("Unexpected document type! Expected value is 'p'.");

        Object.keys(info.inputBatches).forEach(key => GraphMapHandler(info.inputBatches[key].batch))

    } catch (error) {
        console.log('productionProcedure', error);
        throw error
    }
}

function receptionProcedure(info: ReceptionType): void {
    try {
        if (info.docType !== "rc") throw new Error("Unexpected document type! Expected value is 'rc'.");

        GraphMapHandler(info.receivedBatch)
 
    } catch (error) {
        console.log('receptionProcedure', error);
        throw error
    }
}

function registrationProcedure(info: RegistrationType): void {
    try {
        if (info.docType !== "rg") throw new Error("Unexpected document type! Expected value is 'rg'.");

    } catch (error) {
        console.log('registrationProcedure', error);
        throw error
    }
}

function transportationProcedure(info: TransportationType): void {
    try {
        if (info.docType !== "t") throw new Error("Unexpected document type! Expected value is 't'.");

        let key: string = Object.keys(info.inputBatch)[0].toString();

        GraphMapHandler(info.inputBatch[key].batch)
    } catch (error) {
        console.log('transportationProcedure', error);
        throw error
    }
}

function GraphMapHandler(info: any) {
    try {
        if (!info.docType) throw new Error("GraphMapHandler: docType is missing!");

        switch (info.docType) {
            case 'rg':
                registrationProcedure(info); break;
            case 'rc':
                receptionProcedure(info); break;
            case 't':
                transportationProcedure(info); break;
            case 'p':
                productionProcedure(info); break;
            case 'b':
                batchProcedure(info); break;
            default:
                throw new Error("GraphMapHandler: Invalid doctype: " + info.docType);
        }
    } catch (error) {
        console.log('GraphMapHandler', error);
        throw error;
    }
}



export default function getTraceabilityDataByID(data: any, ID: string) {
    try {
        searchBatchID = ID;
        data.map((item: any) => {
            GraphMapHandler(item)
        })

        if (batchTraceability) {
            return batchTraceability
        }
    } catch (error) {
        console.log('getTraceabilityDataByID', error)
        throw error;
    }

}