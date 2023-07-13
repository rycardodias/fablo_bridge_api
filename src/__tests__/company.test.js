const request = require('supertest');
const app = require('../app');
const { v4 } = require('uuid');

const newCompany = {
    legalName: "CompanyLegalName" + v4(), shortName: 'CompanyshortName' + v4(),
    fiscalNumber: Math.floor(100000000 + Math.random() * 900000000), caeType: '123'
}

const invalidCompany = {
    shortName: 'CompanyshortName', fiscalNumber: 333444555, caeType: '123'
}

let companyId = '';

describe('POST /companies/insert', () => {
    it('should insert a new company', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .post('/companies/insert')
            .send(newCompany)

        companyId = response.body.data.id

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data');
    });

    it('should fail to insert a new company by missing permissions', async () => {
        const response = await request(app)
            .post('/companies/insert')
            .send(invalidCompany)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });

})

describe("GET /companies", () => {
    it('should get all companies', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent.get('/companies')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data');
    });

    it('should get forbidden error', async () => {
        const response = await request(app).get('/companies')

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });
})

describe('PUT /companies/update', () => {
    it('should update the company', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .put('/companies/update')
            .send({ id: companyId, legalName: "newLegalName" + v4() })


        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data');
    });

    it('should fail to update company by missing permissions', async () => {
        const response = await request(app)
            .put('/users/update')
            .send({ id: companyId, legalName: "newLegalName" })

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });

    it('should fail to update company by missing id', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .put('/companies/update')
            .send({ legalName: "newLegalName" })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error');
    });
})

describe('DELETE /companies/update', () => {
    it('should fail to delete company by missing permissions', async () => {
        const response = await request(app)
            .delete('/companies/delete')
            .send({ id: companyId })

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });

    it('should delete the company', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .delete('/companies/delete')
            .send({ id: companyId })


        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data');
    });
})