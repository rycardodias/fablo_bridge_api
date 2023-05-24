import Coordinates from "../interfaces/Coordinates";

export default function coordinatesHandler(productionUnitID: string): Coordinates {
    try {
        if (productionUnitID === "") throw new Error("Invalid productionUnitID!");

        let coordinates: Coordinates = { lat: 0, lng: 0 };

        switch (productionUnitID) {
            case "InovafilMSP:PU1":
                coordinates = { lat: 41.693948, lng: -8.846876 }
                break;
            case "ASampaioMSP:PU1":
                coordinates = { lat: 41.643077, lng: -8.437478 }

                break;
            case "TintexMSP:PU1":
                coordinates = { lat: 41.464130, lng: -8.737813 }

                break;
            case "TMGMSP:PU1":
                coordinates = { lat: 41.382027, lng: -8.338981 }
                break;
            default:
                throw new Error("Invalid productionUnitID!");
        }

        coordinates.lat += (Math.random() - 0.5) * 0.3
        coordinates.lng += (Math.random() - 0.5) * 0.3

        return coordinates;
    } catch (error) {
        throw error
    }
}