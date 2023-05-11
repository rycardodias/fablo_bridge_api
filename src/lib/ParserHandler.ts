import BatchParser from "./BatchParser";
import ProductionParser from "./ProductionParser";
import ReceptionParser from "./ReceptionParser";
import RegistrationParser from "./RegistrationParser";
import TransportationParser from "./TransportationParser";

import type { NodeType, ArcType } from "../types/TraceabilityTypes";
import type { BatchType } from "../types/blockchainObjectTypes";

export let nodes: Array<NodeType> = []
export let arcs: Array<ArcType> = []

function registrationProcedure(info: any): void {
    RegistrationParser(info)

    info.newBatch = { [info.newBatch.ID]: info.newBatch.quantity }
    arcs.push(info);
}

function receptionProcedure(info: any): void {
    const result = ReceptionParser(info)
    ParserHandler(result);

    info.receivedBatch = { [info.receivedBatch.ID]: info.receivedBatch.quantity };
    info.newBatch = { [info.newBatch.ID]: info.newBatch.quantity };
    arcs.push(info)
}

function transportationProcedure(info: any): void {
    const result = TransportationParser(info)
    ParserHandler(result);

    Object.keys(info.inputBatch).map(key => {
        info.inputBatch[key] = info.inputBatch[key].quantity
    })

    arcs.push(info)
}
function productionProcedure(info: any): void {
    let resultP: { [key: string]: any } = ProductionParser(info)

    Object.keys(resultP).forEach(key => ParserHandler(resultP[key].batch))

    Object.keys(info.inputBatches).map(key => {
        info.inputBatches[key] = info.inputBatches[key].quantity
    })
    info.outputBatch = info.outputBatch.ID

    arcs.push(info)
}
function batchProcedure(info: any): void {
    const result = BatchParser(info)

    info.traceability = undefined;



    nodes.push(addCoordinatesToBatch(info))

    if (result) {
        ParserHandler(result);
    }
}

function addCoordinatesToBatch(batch: BatchType): NodeType {
    let node: NodeType = { ...batch, lat: 0, lng: 0 };

    switch (batch.latestOwner) {
        case "InovafilMSP:PU1":
            node = { ...node, lat: 41.6946, lng: -8.83016 }
            break;
        case "ASampaioMSP:PU1":
            node = { ...node, lat: 41.6946, lng: -8 }

            break;
        case "TintexMSP:PU1":
            node = { ...node, lat: 41.1, lng: -8.83016 }

            break;
        case "TMGMSP:PU1":
            node = { ...node, lat: 41.0, lng: -8.0 }
            break;
        default:
            console.log("error: invalid owner: " + batch.latestOwner)
    }

    return node
}

export default function ParserHandler(info: any) {
    try {
        switch (info.docType) {
            case 'rg':
                registrationProcedure(info)
                break;
            case 'rc':
                receptionProcedure(info)
                break;
            case 't':
                transportationProcedure(info)
                break;
            case 'p':
                productionProcedure(info)
                break;
            case 'b':
                batchProcedure(info)
                break;
            default:
                throw new Error("Invalid doc type: " + info.docType);
        }

        nodes = nodes.filter((node, index) => {
            return index === nodes.findIndex((n) => n.ID === node.ID);
        });
        arcs = arcs.filter((node, index) => {
            return index === arcs.findIndex((n) => n.ID === node.ID);
        });

    } catch (error) {
        console.error(error);
    }
}