import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe,expect,it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authentica-user'



describe('Create gym  (e2e)',()=>{
    beforeAll(async()=>{
        await app.ready()
    })


    afterAll(async()=>{
        await app.close()
    })

    it('should be able to create a gym ',async ()=>{

        const {token} = await createAndAuthenticateUser(app)

             const response= await request(app.server)
            .post('/gyms')
                .set('Authrozation', `Bearer ${token}`)
                    .send({
                        title:'Guts>Griffith',
                        decription: 'Guts loves caska',
                        phone:'123456789012',
                        latitude:-22.7438447,                                              
                        longitude:-47.3291217,
                    })

                    expect(response.statusCode).toEqual(201)
                    expect(response.body.user).toEqual(expect.objectContaining({
                        email: 'guts@exemple.com'
                    }))
                 

            
        })

    })


