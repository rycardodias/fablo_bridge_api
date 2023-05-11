import { BatchType } from "./blockchainObjectTypes";

export interface NodeType extends BatchType {
    lat: number;
    lng: number;
}

export type ArcType = {
    ID: string;
}


