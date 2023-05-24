import MapInfoInterface from "../../interfaces/MapInfoInterface";
import type { NodeType, ArcType } from "../../types/TraceabilityTypes";
import type { BatchType, ProductionType, ReceptionType, RegistrationType, TransportationType } from "../../types/blockchainObjectTypes";
import coordinatesHandler from "../coordinatesHandler";

let nodes: Array<any> = []
let arcs: Array<any> = []

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
        throw error
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
        throw error
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
        throw error;
    }
}

function calculateArcs(nodes: Array<any>): void {
    nodes.forEach(node => {
        if (node.docType === 'rg' || node.docType === 'p' || node.docType === 'rc') {

            const finalNode = nodes.find(filtered => filtered.ID === node.mapInfo.output[0])

            arcs.push({
                ID: node.ID + "-" + finalNode.ID,
                activityConnection: false,
                initialNode: node.ID,
                finalNode: finalNode.ID,
            })

            if (node.docType === "p") {
                node.mapInfo.input.forEach((element: Array<string>) => {
                    arcs.push({
                        ID: element + "-" + node.ID,
                        activityConnection: true,
                        initialNode: element,
                        finalNode: node.ID
                    })
                })
            }
        }

        if (node.docType === 't') {
            const finalNode = nodes
                .filter(item => item.docType === 'rc')
                .find(filtered => filtered.mapInfo.input[0] === node.mapInfo.input[0])

            arcs.push({
                ID: node.ID + "-" + finalNode.ID,
                activityConnection: true,
                initialNode: node.ID,
                finalNode: finalNode.ID
            })

            arcs.push({
                ID: node.mapInfo.input[0] + "-" + node.ID,
                activityConnection: true,
                initialNode: node.mapInfo.input[0],
                finalNode: node.ID
            })
        }
    })
}


export default function getTraceabilityData(data: any): { nodes: Array<any>, arcs: Array<any> } {
    nodes = [];
    arcs = [];
    data.map((item: any) => {
        GraphMapHandler(item)
    })

    calculateArcs(nodes)

    return { nodes, arcs }
}