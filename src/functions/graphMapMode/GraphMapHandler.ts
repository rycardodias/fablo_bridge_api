import MapInfoInterface from "../../interfaces/MapInfoInterface";
import type { NodeType, ArcType } from "../../types/TraceabilityTypes";
import type { BatchType, ProductionType, ReceptionType, RegistrationType, TransportationType } from "../../types/blockchainObjectTypes";
import coordinatesHandler from "../coordinatesHandler";

let nodes: Array<any> = []
let arcs: Array<ArcType> = []

function setNodes(node: any): void {
    nodes.push(node)
}

function batchProcedure(info: BatchType): void {
    try {
        if (info.docType !== "b") throw new Error("Unexpected document type! Expected value is 'b'.");

        if (!info.traceability) return

        GraphMapHandler(info.traceability[0])

        let newObject: MapInfoInterface & BatchType = {
            ...info,
            mapInfo: { coordinates: coordinatesHandler(info.latestOwner), input: [], output: [] }
        }

        newObject.mapInfo.input = []
        newObject.mapInfo.output = []

        newObject.traceability = []

        setNodes(newObject)
    } catch (error) {
        console.log('GraphMapHandler', error);
        throw error;
    }
}

function productionProcedure(info: ProductionType): void {
    try {
        if (info.docType !== "p") throw new Error("Unexpected document type! Expected value is 'p'.");

        Object.keys(info.inputBatches).forEach(key => GraphMapHandler(info.inputBatches[key].batch))

        let newObject: MapInfoInterface & ProductionType = {
            ...info,
            mapInfo: { coordinates: coordinatesHandler(info.productionUnitID), input: [], output: [] }
        }

        newObject.mapInfo.input = Object.keys(info.inputBatches)
        newObject.mapInfo.output = [newObject.outputBatch.ID]

        newObject.outputBatch = { ID: newObject.outputBatch.ID }

        Object.keys(newObject.inputBatches).forEach(key => {
            newObject.inputBatches[key] = newObject.inputBatches[key].quantity
        }
        )

        setNodes(newObject)
    } catch (error) {
        console.log('GraphMapHandler', error);
        throw error
    }
}

function receptionProcedure(info: ReceptionType): void {
    try {
        if (info.docType !== "rc") throw new Error("Unexpected document type! Expected value is 'rc'.");

        GraphMapHandler(info.receivedBatch)

        let newObject: MapInfoInterface & ReceptionType = {
            ...info,
            mapInfo: { coordinates: coordinatesHandler(info.productionUnitID), input: [], output: [] }
        }

        newObject.mapInfo.input = [newObject.receivedBatch.ID]
        newObject.mapInfo.output = [newObject.newBatch.ID]

        newObject.newBatch = { ID: newObject.newBatch.ID }
        newObject.receivedBatch = { ID: newObject.receivedBatch.ID }

        setNodes(newObject)

    } catch (error) {
        console.log('GraphMapHandler', error);
        throw error;
    }
}

function registrationProcedure(info: RegistrationType): void {
    try {
        if (info.docType !== "rg") throw new Error("Unexpected document type! Expected value is 'rg'.");


        let newObject: MapInfoInterface & RegistrationType = {
            ...info,
            mapInfo: { coordinates: coordinatesHandler(info.productionUnitID), input: [], output: [] }
        }

        newObject.mapInfo.input = []
        newObject.mapInfo.output = [newObject.newBatch.ID]

        newObject.newBatch = { ID: newObject.newBatch.ID }

        setNodes(newObject)

    } catch (error) {
        console.log('GraphMapHandler', error);
        throw error
    }
}

function transportationProcedure(info: TransportationType): void {
    try {
        if (info.docType !== "t") throw new Error("Unexpected document type! Expected value is 't'.");

        let key: string = Object.keys(info.inputBatch)[0].toString();

        GraphMapHandler(info.inputBatch[key].batch)

        let newObject: MapInfoInterface & TransportationType = {
            ...info,
            mapInfo: { coordinates: coordinatesHandler(info.originProductionUnitID), input: [], output: [] }
        }

        newObject.mapInfo.input = [key]
        newObject.mapInfo.output = []

        newObject.inputBatch = { ID: key }

        setNodes(newObject)

    } catch (error) {
        console.log('GraphMapHandler', error);
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

        nodes = nodes.filter((node, index) => {
            return index === nodes.findIndex((n) => n.ID === node.ID);
        });
    } catch (error) {
        console.log('GraphMapHandler', error);
        throw error;
    }
}

function calculateArcs(nodes: Array<any>): void {
    try {
        nodes.forEach(node => {
            node.mapInfo.output.forEach((element: Array<string>) => {
                const initialNode = node.mapInfo.coordinates
                const finalNode = nodes.find(filtered => filtered.ID === element).mapInfo.coordinates

                arcs.push({
                    ID: node.ID + "-" + element,
                    activityConnection: false,
                    initialNode: { ID: node.ID, ...initialNode },
                    finalNode: { ID: element, ...finalNode }
                })

                const finalNodeAtivity = nodes.filter((filtered: any) => filtered.mapInfo.input.includes(element))[0]

                if (finalNodeAtivity) {
                    arcs.push({
                        ID: element + "-" + node.ID,
                        activityConnection: true,
                        initialNode: { ID: node.ID, ...initialNode },
                        finalNode: { ID: finalNodeAtivity.ID, ...finalNodeAtivity.mapInfo.coordinates }
                    })
                }
            });

            node.mapInfo.input.forEach((element: Array<string>) => {
                const finalNode = node.mapInfo.coordinates
                const initialNode = nodes.find(filtered => filtered.ID === element).mapInfo.coordinates

                arcs.push({
                    ID: element + "-" + node.ID,
                    activityConnection: false,
                    initialNode: { ID: element, ...initialNode },
                    finalNode: { ID: node.ID, ...finalNode }
                })
            });

            if (node.docType === 't') {
                const initialNode = node.mapInfo.coordinates

                let finalNode: any = nodes.filter((filteredDocType: any) => filteredDocType.docType === 'rc')
                    .filter(filterInput => filterInput.mapInfo.input[0] === node.mapInfo.input[0])[0]

                if (finalNode) {
                    arcs.push({
                        ID: node.ID + "-" + finalNode.ID,
                        activityConnection: true,
                        initialNode: { ID: node.ID, ...initialNode },
                        finalNode: { ID: finalNode.ID, ...finalNode.mapInfo.coordinates }
                    })
                }
            }
        })
    } catch (error) {
        console.log('calculateArcs', nodes, error)
        throw error
    }
}


export default function getTraceabilityMapData(data: any): { nodes: Array<any>, arcs: Array<any> } {
    try {
        nodes = [];
        arcs = [];

        console.log(data)
        data.map((item: any) => {
            GraphMapHandler(item)
        })
        console.log(nodes)
        calculateArcs(nodes)

        return { nodes, arcs }
    } catch (error) {
        console.log('getTraceabilityMapData', error)
        return { nodes, arcs }
    }
}