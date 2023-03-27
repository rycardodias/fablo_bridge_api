import axios from "axios";
import { Request, Response } from "express";

type PortStructure = {
    company: string,
    port: string
}

export default async function fabloRequest(req: Request, method: string, url: string, data: object | undefined = undefined): Promise<any> {
    try {
        const token = req.session.user && req.session.user.onChainToken

        const PORTS: PortStructure[] = [
            {
                company: '2e60f768-fcdc-48c8-a943-faa0993894a5',
                port: '8801'
            },
            {
                company: 'TESTE',
                port: '8802'
            },
        ]

        const request = await axios({
            headers: {
                authorization: token ? `Bearer ${token}` : undefined
            },
            method: method,
            baseURL: "http://20.224.242.57:" + PORTS.find(item => item.company === req.session.user.companyId)!.port,
            url: url,
            data: data
        })
        return request;

    } catch (error: any) {
        throw error;
    }
}

export async function fabloChannelRequest(req: Request, type: string, data: object): Promise<any> {
    try {
        return await fabloRequest(req, 'POST', `/${type}/stvgd-channel/stvgd-chaincode`, data);
    } catch (error) {
        throw error;
    }
}