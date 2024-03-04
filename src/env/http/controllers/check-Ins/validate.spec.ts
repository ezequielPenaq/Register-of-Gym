import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe,expect,it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authentica-user'
import { prisma } from '@/env/lib/prisma'
import { date } from 'zod'



describe('validate checkIn  (e2e)',()=>{
    beforeAll(async()=>{
        await app.ready()
    })


    afterAll(async()=>{
        await app.close()
    })

    it('should be able to validate a checkIn ',async ()=>{

        const {token} = await createAndAuthenticateUser(app)

            const user = await prisma.user.findFirstOrThrow()

           const gym= await prisma.gym.create({
                data:{
                    title:'JavaScript Gym',
                    latitude:-22.7438447,                                              
                    longitude:-47.3291217
                }
            })

           let checkIn= await prisma.checkin.create({
                data:{
                    gym_id: gym.id,
                    user_id: user.id
                },
            })


             const response= await request(app.server)
            .patch(`/checkIns/${checkIn.id}/validate`)
                .set('Authrozation', `Bearer ${token}`)
                    .send()

                    expect(response.statusCode).toEqual(204)

                        checkIn= await prisma.checkin.findUniqueOrThrow({
                            where:{
                                id: checkIn.id,
                            }
                        })

                            expect(checkIn.validated_at).toEqual(expect.any(Date))

                    })

    })


