import BatchParser from "./BatchParser";
import ProductionParser from "./ProductionParser";
import ReceptionParser from "./ReceptionParser";
import RegistrationParser from "./RegistrationParser";
import TransportationParser from "./TransportationParser";

type NodeType = {
    ID: string;
}

type ArcsType = {
    ID: string;
}

export let nodes: Array<NodeType> = []
export let arcs: Array<ArcsType> = []

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
    nodes.push(info)

    if (result) {
        ParserHandler(result);
    }
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