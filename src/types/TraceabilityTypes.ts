import { BatchType } from "./blockchainObjectTypes";

export interface NodeType extends BatchType {
    lat: number;
    lng: number;
}

export type ArcType = {
    ID: string;
    activityConnection: boolean;
    initialNode: {
        ID: string;
        nodeType: NodeType
    };
    finalNode: {
        ID: string;
        nodeType: NodeType
    };
}


