import type { NodeType, ArcType } from "../../types/TraceabilityTypes";
import type { BatchType, ReceptionType, RegistrationType, TransportationType } from "../../types/blockchainObjectTypes";

let nodes: Array<any> = []
let arcs: Array<ArcType> = []

function setNodes(node: any): void {
    nodes.push(node)
}

function batchProcedure(info: BatchType): void {
    try {
        if (info.docType !== "b") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'b'.");

        if (!info.traceability) return

        GraphMapHandler(info.traceability[0])
    } catch (error) {
        console.error(error)
    }
}

function productionProcedure(info: any): void {
    try {
        if (info.docType !== "p") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rc'.");

        Object.keys(info.inputBatches).forEach(key => GraphMapHandler(info.inputBatches[key].batch))

        Object.keys(info.inputBatches).forEach(key => info.inputBatches[key] = info.inputBatches[key].quantity)
        info.outputBatch = { [info.outputBatch.ID]: info.outputBatch.quantity }

        setNodes(info)
    } catch (error) {
        console.error(error)
    }
}

function receptionProcedure(info: ReceptionType): void {
    try {
        if (info.docType !== "rc") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rc'.");

        GraphMapHandler(info.receivedBatch)

        info.newBatch = { ID: info.newBatch.ID }
        info.receivedBatch = { ID: info.receivedBatch.ID }
        setNodes(info)

    } catch (error) {
        console.error(error)
    }
}

function registrationProcedure(info: RegistrationType): void {
    try {
        if (info.docType !== "rg") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 'rg'.");

        let newObject: any = info

        newObject.newBatch = { ID: info.newBatch.ID };

        setNodes(newObject)

    } catch (error) {
        console.error(error)
    }
}

function transportationProcedure(info: TransportationType): void {
    try {
        if (info.docType !== "t") throw new Error("O tipo de documento fornecido é inválido. O valor esperado é 't'.");

        let key: string = Object.keys(info.inputBatch)[0].toString();

        GraphMapHandler(info.inputBatch[key].batch)

        info.inputBatch[key] = info.inputBatch[key].quantity

        setNodes(info)

    } catch (error) {
        console.error(error)
    }
}

function GraphMapHandler(info: any) {
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
        // arcs = arcs.filter((node, index) => {
        //     return index === arcs.findIndex((n) => n.ID === node.ID);
        // });

    } catch (error) {
        console.error(error);
    }
}

export default function getTraceabilityMapData(data: any): object {
    data.map((item: any) => {
        GraphMapHandler(item)
    })

    return { nodes, arcs }
}