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
            latitude: new Decimal(0) ,
            longitude: new Decimal(0) ,
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
             userLatitude: 0,
             userLongitude:0,
            })
            
                expect(checkIn.id).toEqual(expect.any(String))
        
    })

    it('Should not be able to check in twice in same day', async () => {

        vi.setSystemTime(new Date(2022,0,20,8,0,0))
      
        await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 0,
         userLongitude:0,
        })
        
        
       
        
            await expect(()=> sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: 0,
                userLongitude:0,
               })).rejects.toBeInstanceOf(Error)
    
})

it('Should not be able to check in twice but in different days', async () => {

    vi.setSystemTime(new Date(2022,0,22,8,0,0))
  
    await sut.execute({
     gymId: 'gym-01',
     userId: 'user-01',
     userLatitude: 0,
     userLongitude:0,
    })
    
    vi.setSystemTime(new Date(2022,0,23,8,0,0))


    const{ checkIn} =await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude:0,
     })

     expect(checkIn.id).toEqual(expect.any(string))
   

    })
 });
    


