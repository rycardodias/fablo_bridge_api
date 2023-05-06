import BatchParser from "./BatchParser";
import ProductionParser from "./ProductionParser";
import ReceptionParser from "./ReceptionParser";
import RegistrationParser from "./RegistrationParser";
import TransportationParser from "./TransportationParser";

type NodeTypes = {
    ID: string;
}

export let nodes: Array<NodeTypes> = []
export let arcs: Array<object> = []

export default function ParserHandler(info: any) {
    try {
        let result;

        switch (info.docType) {
            case 'rg':
                result = RegistrationParser(info)
                // ParserHandler(result);

                info.newBatch = { [info.newBatch.ID]: info.newBatch.quantity }

                arcs.push(info);

                break;
            case 'rc':
                result = ReceptionParser(info)
                ParserHandler(result);

                info.receivedBatch = { [info.receivedBatch.ID]: info.receivedBatch.quantity };
                info.newBatch = { [info.newBatch.ID]: info.newBatch.quantity };
                arcs.push(info)
                break;
            case 't':
                result = TransportationParser(info)
                ParserHandler(result);

                Object.keys(info.inputBatch).map(key => {
                    info.inputBatch[key] = info.inputBatch[key].quantity
                })

                arcs.push(info)

                break;
            case 'p':
                let resultP: { [key: string]: any } = ProductionParser(info)

                Object.keys(resultP).forEach(key => ParserHandler(resultP[key].batch))

                Object.keys(info.inputBatches).map(key => {
                    info.inputBatches[key] = info.inputBatches[key].quantity
                })
                info.outputBatch = info.outputBatch.ID

                arcs.push(info)

                break;
            case 'b':
                result = BatchParser(info)

                info.traceability = undefined;
                nodes.push(info)

                if (result) {
                    ParserHandler(result);
                }
                break;
            default:
                throw new Error("Invalid doc type: " + info.docType);
        }

        const uniqueNodes = nodes.filter((node, index) => {
            return index === nodes.findIndex((n) => n.ID === node.ID);
        });

        nodes = uniqueNodes

    } catch (error) {
        console.error(error);
    }

}