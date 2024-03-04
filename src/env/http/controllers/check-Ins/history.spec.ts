import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe,expect,it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authentica-user'
import { prisma } from '@/env/lib/prisma'



describe('CheckIn checkIn  (e2e)',()=>{
    beforeAll(async()=>{
        await app.ready()
    })


    afterAll(async()=>{
        await app.close()
    })

    it('should be able to list the of checkIn ',async ()=>{

        const {token} = await createAndAuthenticateUser(app)

        const user= await prisma.user.findFirstOrThrow()

           const gym= await prisma.gym.create({
                data:{
                    title:'JavaScript Gym',
                    latitude:-22.7438447,                                              
                    longitude:-47.3291217
                }
            })

             await prisma.checkin.createMany({
                data:[
                    {
                    gym_id:gym.id,
                    user_id: user.id
                },
                {
                    gym_id:gym.id,
                    user_id: user.id
                }
            ],
            })
            
          

             const response= await request(app.server)
            .get('checkIns/history')
                .set('Authrozation', `Bearer ${token}`)
                    .send()

                    expect(response.statusCode).toEqual(200)
                    expect(response.body.checkIns).toEqual([
                        expect.objectContaining({
                            gym_id:gym.id,
                            user_id: user.id
                        }),
                        expect.objectContaining({
                            gym_id:gym.id,
                            user_id: user.id
                        })

                    ])
                 

            
        })

    })


