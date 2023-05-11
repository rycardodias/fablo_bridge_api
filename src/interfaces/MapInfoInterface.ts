import Coordinates from "./Coordinates"

export default interface MapInfoInterface {
    mapInfo: {
        coordinates: Coordinates
        inputBatches: Array<string>
        outputBatches: Array<string>
    }
}