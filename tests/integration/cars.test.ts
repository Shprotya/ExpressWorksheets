import request from "supertest";
import { app } from "../../src/app";
import { connectDB } from "../../src/config/database";

beforeAll(async () => {
    await connectDB();
});

describe('GET /cars', () => {

    it('returns all cars', async () => {

        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);

    });

});

describe('Car lifecycle', () => {
    it('creates, fetches and deletes a car', async () => {
        const created = await request(app)
            .post('/api/v1/cars')
            .send({ make: 'Toyota', model: 'Corolla', year: 2010 });

        expect(created.status).toBe(201);
        const id = created.body._id;

        const fetched = await request(app).get(`/api/v1/cars/${id}`);
        expect(fetched.status).toBe(200);
        expect(fetched.body.make).toBe('Toyota');

        const deleted = await request(app).delete(`/api/v1/cars/${id}`);
        expect(deleted.status).toBe(200);

        const gone = await request(app).get(`/api/v1/cars/${id}`);
        expect(gone.status).toBe(404);
    });
});