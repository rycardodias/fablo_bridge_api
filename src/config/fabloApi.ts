import axios from "axios";
import { Request, Response } from "express";

export default async function fabloRequest(req: Request, method: string, url: string, data: object | undefined = undefined): Promise<any> {
    try {
        const token = req.session.user && req.session.user.onChainToken
        
        const request = await axios({
            headers: {
                authorization: token ? `Bearer ${token}` : undefined
            },
            method: method,
            baseURL: "http://95.111.233.14:8801",
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
        return await fabloRequest(req, 'POST', `/${type}/my-channel1/stvgd-chaincode`, data);
    } catch (error) {
        throw error;
    }
}