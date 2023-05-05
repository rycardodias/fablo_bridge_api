import BatchParser from "./BatchParser";
import ProductionParser from "./ProductionParser";
import ReceptionParser from "./ReceptionParser";
import RegistrationParser from "./RegistrationParser";
import TransportationParser from "./TransportationParser";

export default function ParserHandler(info: any): object {
    try {
        let result;
        console.log(info, "INFOOOOOO\n\n")
        switch (info.docType) {
            case 'b':
                result = BatchParser(info)
                ParserHandler(result);
                break;
            case 'p':
                let resultP: { [key: string]: any } = ProductionParser(info)

                Object.keys(resultP).forEach(key => {
                    ParserHandler(resultP[key].batch);
                })

                break;
            case 'rc':
                result = ReceptionParser(info)
                ParserHandler(result);
                break;
            case 'rg':
                result = RegistrationParser(info)
                ParserHandler(result);
                break;
            case 't':
                result = TransportationParser(info)
                ParserHandler(result);
                break;
            default:
                console.log("terminou")
                break;
        }

        return { result }


    } catch (error) {
        return { error }
    }

}