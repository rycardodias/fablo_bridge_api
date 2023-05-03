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
                company: 'cb8e79f5-34a9-4b4f-afbd-f193e95bc07a',
                port: '8800'
            },
            {
                company: 'c19569b8-a5c4-4ca6-82ba-34b8269e6b25',
                port: '8801'
            },
            {
                company: 'd640eecf-a328-477a-b03d-b548dd2f86f8',
                port: '8802'
            },
            {
                company: '1d86f02b-5273-4165-8244-f4a63a938c6d',
                port: '8803'
            },
        ]

        const request = await axios({
            headers: {
                authorization: token ? `Bearer ${token}` : undefined
            },
            method: method,
            baseURL: "http://20.224.242.57:"  // "http://127.0.0.1:" 
                + PORTS.find(item => item.company === req.session.user.companyId)!.port,
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