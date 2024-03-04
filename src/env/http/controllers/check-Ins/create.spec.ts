import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe,expect,it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authentica-user'
import { prisma } from '@/env/lib/prisma'



describe('Create checkIn  (e2e)',()=>{
    beforeAll(async()=>{
        await app.ready()
    })


    afterAll(async()=>{
        await app.close()
    })

    it('should be able to create a checkIn ',async ()=>{

        const {token} = await createAndAuthenticateUser(app)

           const gym= await prisma.gym.create({
                data:{
                    title:'JavaScript Gym',
                    latitude:-22.7438447,                                              
                    longitude:-47.3291217
                }
            })

             const response= await request(app.server)
            .post(`/gyms/${gym.id}/checkIns`)
                .set('Authrozation', `Bearer ${token}`)
                    .send({
                      
                        latitude:-22.7438447,                                              
                        longitude:-47.3291217,
                    })

                    expect(response.statusCode).toEqual(201)
                    expect(response.body.user).toEqual(expect.objectContaining({
                        email: 'guts@exemple.com'
                    }))
                 

            
        })

    })


