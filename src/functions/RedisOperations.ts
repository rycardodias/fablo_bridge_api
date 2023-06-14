const client = require('../config/clientRedis');

export async function getRedisData(id: string) {
    // await client.connect()

    const result = await client.get(id)

    // await client.quit()

    return result;
}

export async function setRedisData(id: string, time: number, data: any) {
    // await client.connect()

    const result = await client.setEx(id, time, data)

    // await client.quit()

    return result;
}