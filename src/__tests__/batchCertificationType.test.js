const request = require('supertest');
const app = require('../app');
const { v4 } = require('uuid');

const newData = {
    name: "CompanyLegalName" + v4(), description: 'CompanyshortName' + v4()
}

const invalidData = {
    description: 'CompanyshortName'
}

let id = '';

describe('POST /batchCertificationTypes/insert', () => {
    it('should insert a new company', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .post('/batchCertificationTypes/insert')
            .send(newData)

        id = response.body.data.id

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data');
    });

    it('should fail to insert a new company by missing permissions', async () => {
        const response = await request(app)
            .post('/batchCertificationTypes/insert')
            .send(invalidData)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });

})

describe("GET /batchCertificationTypes", () => {
    it('should get all Batch Certification Types', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent.get('/batchCertificationTypes')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data');
    });

    it('should get forbidden error', async () => {
        const response = await request(app).get('/batchCertificationTypes')

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });
})

describe('PUT /batchCertificationTypes/update', () => {
    it('should update the Batch Certification Type', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .put('/batchCertificationTypes/update')
            .send({ id: id, description: 'CompanyshortName' + v4() })


        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data');
    });

    it('should fail to update Batch Certification Type by missing permissions', async () => {
        const response = await request(app)
            .put('/batchCertificationTypes/update')
            .send({ id: id, legalName: "newLegalName" })

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });

    it('should fail to update Batch Certification Type by missing id', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .put('/batchCertificationTypes/update')
            .send({ description: 'CompanyshortName' })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error');
    });
})

describe('DELETE /batchCertificationTypes/update', () => {
    it('should fail to delete Batch Certification Type by missing permissions', async () => {
        const response = await request(app)
            .delete('/batchCertificationTypes/delete')
            .send({ id: id })

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });

    it('should delete the Batch Certification Type', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .delete('/batchCertificationTypes/delete')
            .send({ id: id })


        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data');
    });
})