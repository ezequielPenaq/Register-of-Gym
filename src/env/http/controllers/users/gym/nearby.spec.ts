import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authentica-user';

describe('Nearby gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to list nearby gims', async () => {
        const { token } = await createAndAuthenticateUser(app);
        
       

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScriptGym',
                description: 'Guts loves caska',
                phone: '123456789012',
                latitude:-22.7438447,                                              
                longitude:-47.3291217,
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeSriptGym',
                description: 'Guts loves caska',
                phone: '123456789012',
                latitude:-27.0610928,                                              
                longitude:-49.5229501,
            });

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude:-22.7438447,                                              
                longitude:-47.3291217,
            })
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScriptGym',
            }),
        ]);
    });
});
