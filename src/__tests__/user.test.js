const request = require('supertest');
const app = require('../app');
const { v4 } = require('uuid');

const newUser = {
    email: `${v4()}@stv.pt`, password: 'password', name: 'user'
}

describe('POST /users/insert', () => {
    it('should insert a new user', async () => {
        const response = await request(app)
            .post('/users/insert')
            .send(newUser)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data');

        const sessionCookie = response.headers['set-cookie']; 
        expect(sessionCookie).toBeDefined();
    });

    const invalidUser = {
        email: `${v4()}@stv.pt`
    }

    it('should fail to insert a new user', async () => {
        const response = await request(app)
            .post('/users/insert')
            .send(invalidUser)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error');
    });
})

describe('POST users/login', () => {
    it('should login as a valid user', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({ email: newUser.email, password: newUser.password })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('name');
        expect(response.body.data).toHaveProperty('permission');
        expect(response.body.data).toHaveProperty('companyId');
    });

    it('should fail to login with invalid credentials', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({ email: newUser.email, password: 'InvalidPassword' })

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('User not authenticated!');
    });

    it('should fail to login with missing parameters', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({ email: newUser.email })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error');
    });
})

describe("GET /users", () => {
    it('should get all users', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent.get('/users')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data');
    });

    it('should get forbidden error', async () => {
        const response = await request(app).get('/users')

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });
})

describe('PUT /users/update', () => {
    it('should update the user', async () => {
        const agent = request.agent(app);

        await agent
            .post('/users/login')
            .send({ email: 'admin@stv.pt', password: 'admin' })

        const response = await agent
            .put('/users/update')
            .send({email: newUser.email, permission: 'MEMBER'})

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data');
    });

    it('should fail to update user by missing permissions', async () => {
        const response = await request(app)
            .put('/users/update')
            .send({email: newUser.email, permission: 'MEMBER'})

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('error');
    });
})