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
                coordinates = { lat: 41.0, lng: -8 }

                break;
            case "TintexMSP:PU1":
                coordinates = { lat: 40.0, lng: -7.5 }

                break;
            case "TMGMSP:PU1":
                coordinates = { lat: 39, lng: -9.5 }
                break;
            default:
                throw new Error("Invalid productionUnitID!");
        }

        coordinates.lat += (Math.random() - 0.5) * 0.6
        coordinates.lng += (Math.random() - 0.5) * 0.6

        return coordinates;
    } catch (error) {
        throw error
    }
}