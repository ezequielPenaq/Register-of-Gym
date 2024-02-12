import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { InMemoryCheckInsRepository } from '@/env/repositories/in-memory/in-memory-checkIns-repository'
import { CheckInUseCase } from './check-ins'
import { string } from 'zod'
import { inMemoryGymRepository } from '@/env/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: inMemoryGymRepository
let sut: CheckInUseCase


describe('Check-in use case', ()=>{

    beforeEach(()=>{
        checkInsRepository= new InMemoryCheckInsRepository
        gymsRepository= new inMemoryGymRepository
        sut = new CheckInUseCase (checkInsRepository,gymsRepository)

        gymsRepository.items.push({
            id:'gym-01',
            title:'Gym BodySteel',
            description:'',
            phone:'',
            latitude: new Decimal(-22.7438447) ,
            longitude: new Decimal(-47.3291217) ,
        })


        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })


    it('Should be able to check in', async () => {
    
        

            const {checkIn}= await sut.execute({
             gymId: 'gym-01',
             userId: 'user-01',
             userLatitude: -22.7438447,
             userLongitude:-47.3291217,
            })
            
                expect(checkIn.id).toEqual(expect.any(String))
        
    })

    it('Should not be able to check in twice in same day', async () => {

        vi.setSystemTime(new Date(2022,0,20,8,0,0))
      
        await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -22.7438447,
         userLongitude:-47.3291217,
        })
        
        
       
        
            await expect(()=> sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -22.7438447,
                userLongitude:-47.3291217,
               })).rejects.toBeInstanceOf(Error)
    
})

it('Should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0));

    await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.7438447,
        userLongitude: -47.3291217,
    });

    vi.setSystemTime(new Date(2022, 0, 23, 8, 0, 0));

    const { checkIn } = await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.7438447,
        userLongitude: -47.3291217,
    });

    expect(checkIn.id).toEqual(expect.any(String));
   

    })

    it('Should not be able to check in on distant gym', async () => {
        
        gymsRepository.items.push({
            id:'gym-02',
            title:'Gym BodySteel',
            description:'',
            phone:'',
            latitude: new Decimal(-22.7004425) ,
            longitude: new Decimal(-47.2754596) ,
        })


            await expect(()=>sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -22.7438447,                                              
                userLongitude:-47.3291217,
               })).rejects.toBeInstanceOf(Error)


})
 });
    


