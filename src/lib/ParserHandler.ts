import BatchParser from "./BatchParser";
import ProductionParser from "./ProductionParser";
import ReceptionParser from "./ReceptionParser";
import RegistrationParser from "./RegistrationParser";
import TransportationParser from "./TransportationParser";

export let geral = [{}]

export default function ParserHandler(info: any): object {
    try {
        let result;
        
        switch (info.docType) {
            case 'b':
                result = BatchParser(info)
                geral.push(result)
                ParserHandler(result);
                break;
            case 'p':
                let resultP: { [key: string]: any } = ProductionParser(info)

                Object.keys(resultP).forEach(key => {
                    geral.push(resultP)
                    ParserHandler(resultP[key].batch);
                })

                break;
            case 'rc':
                result = ReceptionParser(info)
                geral.push(result)
                ParserHandler(result);
                break;
            case 'rg':
                result = RegistrationParser(info)
                geral.push(result)
                ParserHandler(result);
                break;
            case 't':
                result = TransportationParser(info)
                geral.push(result)
                ParserHandler(result);
                break;
            default:
                console.log("terminou")
                break;
        }

        //@ts-ignore
       

        return { result }


    } catch (error) {
        return { error }
    }

}