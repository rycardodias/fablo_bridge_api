import Coordinates from "./Coordinates"

export default interface MapInfoInterface {
    mapInfo: {
        coordinates: Coordinates
        input: Array<string>
        output: Array<string>
    }
}