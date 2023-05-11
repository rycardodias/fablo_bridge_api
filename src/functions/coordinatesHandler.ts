import Coordinates from "../interfaces/Coordinates";

export default function coordinatesHandler(productionUnitID: string): Coordinates {
    try {
        if (productionUnitID === "") throw new Error("Invalid productionUnitID!");

        let coordinates: Coordinates = { lat: 0, lng: 0 };

        switch (productionUnitID) {
            case "InovafilMSP:PU1":
                coordinates = { lat: 41.6946, lng: -8.83016 }
                break;
            case "ASampaioMSP:PU1":
                coordinates = { lat: 41.6946, lng: -8 }

                break;
            case "TintexMSP:PU1":
                coordinates = { lat: 41.1, lng: -8.83016 }

                break;
            case "TMGMSP:PU1":
                coordinates = { lat: 41.0, lng: -8.0 }
                break;
            default:
                throw new Error("Invalid productionUnitID!");
        }

        return coordinates;
    } catch (error) {
        throw error
    }
}